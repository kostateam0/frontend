import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import ChatCard from './ChatCard';

export function ChatAccordion() {
  return (
    <Accordion
      type='single'
      collapsible
      className='h-3/5'
      defaultValue='item-1'
    >
      <AccordionItem value='item-1' className='h-full'>
        <AccordionTrigger>Live Chat</AccordionTrigger>
        <AccordionContent className='h-full'>
          <ChatCard />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
