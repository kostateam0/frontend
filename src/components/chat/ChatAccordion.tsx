import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChatCard from './ChatCard';
import { useEffect, useState } from 'react';
import { socket } from '@/utils/socket';

interface Message {
  id: string;
  content: string;
  sender: 'all' | 'user' | 'bot' | string;
  timestamp: string | Date;
}

const userName = Math.random().toString(36).substring(2, 15);

export function ChatAccordion() {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    socket.emit('joinChat', 'all_chat');

    const handleIncomingMessage = (message: Message) => {
      setMessages((prev) => [...prev, message]);
    };

    socket.on('messageReceived', handleIncomingMessage);

    return () => {
      socket.off('messageReceived', handleIncomingMessage);
    };
  }, []);

  const handleSendMessage = (inputValue: string) => {
    if (inputValue.trim() === '') return;

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: userName,
      timestamp: new Date(),
    };

    socket.emit('sendMessage', newMessage);
    setMessages((prev) => [...prev, newMessage]);

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

  return (
    <Accordion
      type='single'
      collapsible
      className='h-4/7 pb-8'
      defaultValue='item-1'
    >
      <AccordionItem value='item-1' className='h-full'>
        {/* <div className='mb-4 text-lg font-bold text-[#8B6914]'>Live Chat</div> */}
        <AccordionTrigger>Live Chat</AccordionTrigger>
        <AccordionContent className='h-full'>
          <ChatCard
            messages={messages}
            onSendMessage={handleSendMessage}
            userName={userName}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
