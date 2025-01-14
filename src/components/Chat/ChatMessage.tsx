import React from 'react';
import { Message } from '../../types';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const renderFlights = () => {
    if (!message.flights) return null;
    
    return (
      <div className="mt-2 space-y-2">
        {message.flights.map((flight, index) => (
          <div key={index} className="bg-white p-2 rounded shadow-sm">
            <div className="flex justify-between">
              <span>{flight.from} → {flight.to}</span>
              <span className="font-bold">{flight.price} ₽</span>
            </div>
            <div className="text-sm text-gray-600">
              {flight.date} • {flight.duration}
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] p-3 rounded-lg ${
          message.type === 'user'
            ? 'bg-blue-500 text-white rounded-br-none'
            : 'bg-gray-100 text-gray-900 rounded-bl-none'
        } ${message.isError ? 'bg-red-100 text-red-600' : ''}`}
      >
        {message.content}
        {renderFlights()}
      </div>
    </div>
  );
};

export default ChatMessage;