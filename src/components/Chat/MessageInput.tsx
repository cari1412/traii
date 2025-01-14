import React, { useState } from 'react';
import { Input } from '../../ui/input';
import { Button } from '../../ui/button';
import { Send } from 'lucide-react';

interface MessageInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const MessageInput: React.FC<MessageInputProps> = ({ onSend, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSend(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        placeholder="Напишите ваш запрос..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={isLoading}
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={isLoading}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
};

export default MessageInput;