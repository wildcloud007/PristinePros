export interface ServicePackage {
  id: string;
  name: string;
  pricePerSqFt: number;
  description: string;
  features: string[];
  icon: string;
}

export enum Role {
  USER = 'user',
  MODEL = 'model'
}

export interface ChatMessage {
  id: string;
  role: Role;
  text: string;
  timestamp: Date;
  isStreaming?: boolean;
  groundingSources?: Array<{
    title: string;
    url: string;
  }>;
}

export interface BookingState {
  serviceId?: string;
  sqFt?: number;
  date?: string;
  name?: string;
  email?: string;
}