import React, { useState, useRef, useEffect } from 'react';
import MessageBubble from './MessageBubble';
import ImageUpload from '../ImageUpload/ImageUpload';
import { useChat } from '../../hooks/useChat';

interface ChatProps {
  mode: 'pre-visit' | 'on-site';
}

const Chat: React.FC<ChatProps> = ({ mode }) => {
  const [input, setInput] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { messages, sendMessage, isLoading } = useChat(mode);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() || image) {
      sendMessage(input, image || undefined);
      setInput('');
      setImage(null);
    }
  };

  const handleImageUpload = (base64Image: string) => {
    setImage(base64Image);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg h-[600px] flex flex-col">
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-gray-500 mt-8">
            <p className="text-lg mb-2">
              {mode === 'pre-visit' 
                ? "Hi! I'm here to help you prepare for your service visit." 
                : "I'm ready to assist you on-site. Describe the issue or upload a photo."}
            </p>
            <p className="text-sm">
              Ask me about equipment specs, common issues, or troubleshooting steps.
            </p>
          </div>
        )}
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-2">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t">
        {image && (
          <div className="mb-2 relative">
            <img 
              src={image} 
              alt="Upload preview" 
              className="h-20 w-20 object-cover rounded"
            />
            <button
              type="button"
              onClick={() => setImage(null)}
              className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm"
            >
              ×
            </button>
          </div>
        )}
        <div className="flex gap-2">
          {mode === 'on-site' && (
            <ImageUpload onImageUpload={handleImageUpload} />
          )}
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || (!input.trim() && !image)}
            className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
};

export default Chat;