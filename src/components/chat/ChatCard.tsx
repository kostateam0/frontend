import { Send, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ScrollArea } from "../ui/scroll-area";
import { formatDate } from "@/utils/formatDate";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useRef, useState } from "react";

interface Message {
  id: string;
  content: string;
  sender: 'all' | 'user' | 'bot' | string;
  timestamp: string | Date;
}

interface ChatCardProps {
  messages: Message[];
  onSendMessage: (inputValue: string) => void;
  userName: string;
}

export default function ChatCard({ messages, onSendMessage, userName }: ChatCardProps) {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const handleSendMessage = () => {
    onSendMessage(inputValue);
    setInputValue('');
  };

  return (
    <section className='bg-background mx-auto flex h-full max-w-80 flex-col justify-between rounded-lg border'>
      <ScrollArea className='flex-1 overflow-y-auto px-4 py-2 dark:bg-[#1a1a1a]'>
        <div className='space-y-4'>
          {messages.map((message) => (
            <div
              ref={bottomRef}
              key={message.id}
              className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} `}
            >
              {message.sender === 'bot' ||
                (message.sender === 'all' && (
                  <Avatar className='mt-1 h-8 w-8'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>
                      <User className='h-4 w-4' />
                    </AvatarFallback>
                  </Avatar>
                ))}
              <div
                className={`max-w-[70%] rounded-lg px-4 py-2 ${
                  message.sender === userName
                    ? 'bg-primary text-primary-foreground ml-auto'
                    : 'bg-muted-foreground dark:bg-[#4a6741]'
                }`}
              >
                <p className='text-sm'>{message.content}</p>
                <p className='mt-1 text-xs opacity-70'>
                  {formatDate(message.timestamp)}
                </p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <div className='bg-card border-t p-4 dark:bg-[#1a1a1a]'>
        <div className='flex gap-2'>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='메시지를 입력하세요...'
            className='flex-1 placeholder:text-white dark:bg-[#4a6741] dark:text-white'
          />
          <Button
            className='dark:bg-[#4a6741] dark:text-white'
            onClick={handleSendMessage}
            size='icon'
            disabled={inputValue.trim() === ''}
          >
            <Send className='h-4 w-4' />
          </Button>
        </div>
      </div>
    </section>
  );
}
