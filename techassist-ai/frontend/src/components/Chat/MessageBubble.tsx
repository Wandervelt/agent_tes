import React from 'react';
import { Message } from '../../services/types';
import DataCard from './DataCard';

interface MessageBubbleProps {
  message: Message;
}

const MessageBubble: React.FC<MessageBubbleProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[70%] ${isUser ? 'order-2' : 'order-1'}`}>
        <div
          className={`rounded-lg px-4 py-2 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-900'
          }`}
        >
          {message.image && (
            <img 
              src={message.image} 
              alt="Uploaded" 
              className="mb-2 rounded max-h-48 object-contain"
            />
          )}
          <p className="whitespace-pre-wrap">{message.content}</p>
        </div>
        {message.data && !isUser && (
          <div className="mt-2">
            <DataCard data={message.data} />
          </div>
        )}
        <p className={`text-xs text-gray-500 mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
          {message.timestamp.toLocaleTimeString()}
        </p>
      </div>
    </div>
  );
};

export default MessageBubble;