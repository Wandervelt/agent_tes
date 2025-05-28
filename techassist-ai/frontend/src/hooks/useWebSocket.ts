import { useEffect, useState, useCallback, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { ChatRequest, ChatResponse } from '../services/types';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [lastMessage, setLastMessage] = useState<ChatResponse | null>(null);
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const wsUrl = 'http://localhost:8000';
    
    socketRef.current = io(wsUrl, {
      transports: ['polling', 'websocket'],
      autoConnect: true
    });

    socketRef.current.on('connect', () => {
      console.log('WebSocket connected');
      setIsConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('WebSocket disconnected');
      setIsConnected(false);
    });

    socketRef.current.on('chat_response', (data: ChatResponse) => {
      setLastMessage(data);
    });

    socketRef.current.on('error', (error: any) => {
      console.error('WebSocket error:', error);
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  const sendMessage = useCallback((request: ChatRequest) => {
    if (socketRef.current && isConnected) {
      console.log('Sending WebSocket message:', request);
      socketRef.current.emit('chat_message', request);
    } else {
      console.log('WebSocket not connected. Connected:', isConnected);
    }
  }, [isConnected]);

  return {
    isConnected,
    sendMessage,
    lastMessage
  };
};