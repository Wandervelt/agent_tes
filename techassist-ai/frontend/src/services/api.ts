import axios from 'axios';
import { ChatRequest, ChatResponse, VisionAnalysis } from './types';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendChatMessage = async (request: ChatRequest): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>('/api/chat', request);
  return response.data;
};

export const analyzeImage = async (image: string): Promise<VisionAnalysis> => {
  const response = await api.post<VisionAnalysis>('/api/vision/analyze', { image });
  return response.data;
};