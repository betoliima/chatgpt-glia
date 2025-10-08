// Tipos compartilhados entre front-end e back-end
export type Role = 'user' | 'assistant';

export interface ChatMessage {
  id: string;
  role: Role;
  content: string;
  timestamp?: Date;
}

export interface ChatRequest {
  message?: string;
  messages?: ChatMessage[];
}

export interface ChatResponse {
  reply: string;
  messageId?: string;
  timestamp?: Date;
}

export interface ApiError {
  error: string;
  code?: string;
  details?: any;
}
