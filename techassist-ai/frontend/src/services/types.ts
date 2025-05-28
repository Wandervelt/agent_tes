export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  data?: any;
  image?: string;
}

export interface ChatRequest {
  message: string;
  mode: 'pre-visit' | 'on-site';
  sessionId: string;
  image?: string;
}

export interface ChatResponse {
  message: string;
  data?: any;
  suggestions?: string[];
}

export interface VisionAnalysis {
  equipment_type?: string;
  issues_detected?: string[];
  confidence: number;
  suggestions?: string[];
}