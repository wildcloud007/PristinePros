import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, Role } from '../types';
import { sendMessageToGemini } from '../services/geminiService';
import { Send, Bot, User, Loader2, Globe } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const ChatInterface: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: Role.MODEL,
      text: "Hello! I'm PristineBot. How can I help you with your cleaning needs today? I can give you a quote for a Deep Clean, Move-Out, or Sanitation service.",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      role: Role.USER,
      text: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const tempId = (Date.now() + 1).toString();
      
      // Add placeholder for streaming message
      setMessages(prev => [...prev, {
        id: tempId,
        role: Role.MODEL,
        text: '',
        timestamp: new Date(),
        isStreaming: true
      }]);

      const { text, sources } = await sendMessageToGemini(inputText, (currentText) => {
        setMessages(prev => prev.map(msg => 
          msg.id === tempId ? { ...msg, text: currentText } : msg
        ));
      });

      // Finalize message
      setMessages(prev => prev.map(msg => 
        msg.id === tempId ? { 
          ...msg, 
          text, 
          isStreaming: false,
          groundingSources: sources
        } : msg
      ));

    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        role: Role.MODEL,
        text: "I'm having trouble connecting right now. Please try again.",
        timestamp: new Date()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="flex flex-col h-[600px] w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200">
      {/* Header */}
      <div className="bg-brand-600 p-4 flex items-center gap-3 shadow-md z-10">
        <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-brand-600">
          <Bot size={24} />
        </div>
        <div>
          <h2 className="text-white font-bold text-lg leading-tight">Pristine Agent</h2>
          <p className="text-brand-100 text-xs">AI-Powered • Online</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex w-full ${msg.role === Role.USER ? 'justify-end' : 'justify-start'}`}
          >
            <div className={`flex max-w-[85%] gap-2 ${msg.role === Role.USER ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                msg.role === Role.USER ? 'bg-slate-300 text-slate-600' : 'bg-brand-100 text-brand-600'
              }`}>
                {msg.role === Role.USER ? <User size={16} /> : <Bot size={16} />}
              </div>
              
              <div className={`flex flex-col ${msg.role === Role.USER ? 'items-end' : 'items-start'}`}>
                <div
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.role === Role.USER
                      ? 'bg-brand-600 text-white rounded-tr-none'
                      : 'bg-white text-slate-700 rounded-tl-none border border-slate-100'
                  }`}
                >
                  <ReactMarkdown 
                    className="markdown-content"
                    components={{
                      ul: ({node, ...props}) => <ul className="list-disc pl-4 my-2" {...props} />,
                      ol: ({node, ...props}) => <ol className="list-decimal pl-4 my-2" {...props} />,
                      p: ({node, ...props}) => <p className="mb-1 last:mb-0" {...props} />,
                      strong: ({node, ...props}) => <span className="font-bold" {...props} />
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
                
                {msg.groundingSources && msg.groundingSources.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {msg.groundingSources.map((source, idx) => (
                      <a 
                        key={idx} 
                        href={source.url} 
                        target="_blank" 
                        rel="noreferrer"
                        className="flex items-center gap-1 text-xs bg-white border border-slate-200 px-2 py-1 rounded-md text-slate-500 hover:text-brand-600 hover:border-brand-200 transition-colors"
                      >
                        <Globe size={10} />
                        <span className="truncate max-w-[100px]">{source.title}</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
        {isLoading && !messages.some(m => m.isStreaming) && (
          <div className="flex justify-start w-full">
            <div className="flex items-center gap-2 bg-white px-4 py-2 rounded-2xl rounded-tl-none border border-slate-100 shadow-sm ml-10">
              <Loader2 size={16} className="animate-spin text-brand-500" />
              <span className="text-xs text-slate-400">PristineBot is thinking...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t border-slate-200">
        <div className="flex items-center gap-2 relative">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 bg-slate-50 border border-slate-300 rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-all pr-12"
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className={`absolute right-2 p-2 rounded-full transition-colors ${
              !inputText.trim() || isLoading 
                ? 'bg-slate-200 text-slate-400' 
                : 'bg-brand-600 text-white hover:bg-brand-700'
            }`}
          >
            <Send size={18} />
          </button>
        </div>
        <p className="text-[10px] text-center text-slate-400 mt-2">
          AI can make mistakes. Please verify booking details.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;