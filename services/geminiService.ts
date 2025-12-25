import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from "../constants";

let chatSession: Chat | null = null;
let genAI: GoogleGenAI | null = null;

const getAIInstance = () => {
  if (!genAI) {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      console.error("API Key not found");
      throw new Error("API Key is required");
    }
    genAI = new GoogleGenAI({ apiKey });
  }
  return genAI;
};

export const initializeChat = () => {
  const ai = getAIInstance();
  chatSession = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      tools: [{ googleSearch: {} }], 
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (
  message: string, 
  onChunk: (text: string) => void
): Promise<{ text: string; sources: Array<{ title: string; url: string }> }> => {
  if (!chatSession) {
    initializeChat();
  }

  if (!chatSession) {
    throw new Error("Failed to initialize chat session");
  }

  try {
    const result = await chatSession.sendMessageStream({ message });
    
    let fullText = "";
    let sources: Array<{ title: string; url: string }> = [];

    for await (const chunk of result) {
      const text = chunk.text;
      if (text) {
        fullText += text;
        onChunk(fullText);
      }
      
      // Check for grounding metadata in chunks
      const groundingChunks = chunk.candidates?.[0]?.groundingMetadata?.groundingChunks;
      if (groundingChunks) {
        groundingChunks.forEach((gChunk: any) => {
          if (gChunk.web?.uri && gChunk.web?.title) {
            sources.push({
              title: gChunk.web.title,
              url: gChunk.web.uri
            });
          }
        });
      }
    }

    return { text: fullText, sources };
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    throw error;
  }
};