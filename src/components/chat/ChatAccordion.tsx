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
      className='w-full'
      defaultValue='item-1'
    >
      <AccordionItem value='item-1'>
        <AccordionTrigger>Live Chat</AccordionTrigger>
        <AccordionContent className='flex flex-col gap-4 text-balance'>
          <ChatCard />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
