import { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '../../ui/card';
import { ScrollArea } from '../../ui/scroll-area';
import ChatMessage from './ChatMessage';
import MessageInput from './MessageInput';
import { Message } from '../../types';
import { sendMessage } from '../../services/api';

const ChatContainer = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Привет! Я помогу вам найти авиабилеты. Просто напишите запрос в свободной форме, например: "Найди билеты из Москвы в Париж на 20 мая"',
      timestamp: new Date(),
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      const response = await sendMessage(content);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: response.message,
        timestamp: new Date(),
        flights: response.flights,
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'bot',
        content: 'Извините, произошла ошибка. Попробуйте повторить запрос.',
        timestamp: new Date(),
        isError: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full h-[600px] flex flex-col">
      <ScrollArea className="flex-1 p-4" ref={scrollRef}>
        <div className="space-y-4">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-gray-100 p-3 rounded-lg rounded-bl-none">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <CardContent className="border-t p-4">
        <MessageInput onSend={handleSendMessage} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
};

export default ChatContainer;