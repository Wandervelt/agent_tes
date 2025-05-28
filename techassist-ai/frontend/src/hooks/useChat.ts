import { useState, useCallback, useEffect } from 'react';
import { Message, ChatRequest } from '../services/types';
import { sendChatMessage } from '../services/api';
import { useWebSocket } from './useWebSocket';

export const useChat = (mode: 'pre-visit' | 'on-site') => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId] = useState(() => 
    `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  );

  const { sendMessage: wsSendMessage, lastMessage, isConnected } = useWebSocket();

  useEffect(() => {
    if (lastMessage) {
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: lastMessage.message,
        timestamp: new Date(),
        data: lastMessage.data
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    }
  }, [lastMessage]);

  const sendMessage = useCallback(async (content: string, image?: string) => {
    const userMessage: Message = {
      id: `msg-${Date.now()}-user`,
      role: 'user',
      content,
      timestamp: new Date(),
      image
    };
    
    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    const request: ChatRequest = {
      message: content,
      mode,
      sessionId,
      image
    };

    try {
      // Just use REST API - simpler and works
      const response = await sendChatMessage(request);
      const assistantMessage: Message = {
        id: `msg-${Date.now()}-assistant`,
        role: 'assistant',
        content: response.message,
        timestamp: new Date(),
        data: response.data
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error sending message:', error);
      setIsLoading(false);
      const errorMessage: Message = {
        id: `msg-${Date.now()}-error`,
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    }
  }, [mode, sessionId]);

  return {
    messages,
    sendMessage,
    isLoading,
    sessionId
  };
};