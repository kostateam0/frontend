import type React from 'react';

import { useEffect, useRef, useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Send, Bot, User, ChartAreaIcon } from 'lucide-react';
import { socket } from '@/utils/socket';
import { formatDate } from '@/utils/formatDate';
interface Message {
  id: string;
  content: string;
  sender: 'all' | 'user' | 'bot' | string;
  timestamp: string | Date;
}

const userName = Math.random().toString(36).substring(2, 15);

export default function ChatCard() {
  const bottomRef = useRef<HTMLDivElement | null>(null);
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const joinChat = () => {
      socket.emit('joinChat', 'all_chat');
    };
    joinChat();
  }, []);

  useEffect(() => {
    const handleIncomingMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('messageReceived', handleIncomingMessage);

    return () => {
      socket.off('messageReceived', handleIncomingMessage);
    };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: userName,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', newMessage);
    setMessages((prev) => [...prev, newMessage]);
    setInputValue('');

    if (inputValue === '!경기정보') {
      setTimeout(() => {
        const botResponse: Message = {
          id: (Date.now() + 1).toString(),
          content: 'T1 vs Gen.G\nT1: 3 - 0 Gen.G',
          sender: 'bot',
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  return (
    <section className='bg-background mx-auto flex h-full max-w-80 flex-col justify-between rounded-lg border'>
      {/* Scrollable Messages */}
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
                  {}
                </p>
              </div>
              {/* {message.sender === 'user' && (
                  <Avatar className='mt-1 h-8 w-8'>
                    <AvatarImage src='/placeholder.svg?height=32&width=32' />
                    <AvatarFallback>
                      <User className='h-4 w-4' />
                    </AvatarFallback>
                  </Avatar>
                )} */}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Input */}
      <div className='bg-card border-t p-4 dark:bg-[#1a1a1a]'>
        <div className='flex gap-2'>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder='!경기정보'
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
