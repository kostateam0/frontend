import { ChatAccordion } from '@/components/chat/ChatAccordion';
import { ScrollArea } from './ui/scroll-area';

const RightSidebar = () => {
  return (
    <aside
      className='hidden w-80 border-l p-4 xl:block'
      style={{ backgroundColor: '#111111', borderColor: '#2A2A2A' }}
    >
      <div className='mb-4 text-lg font-bold text-[#8B6914]'>
        eSports 경기 정보
      </div>
      <ScrollArea className='h-1/3'>
        <div className='space-y-4'>
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className='rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4'
            >
              <div className='text-sm text-gray-400'>6월 20일 | LCK</div>
              <div className='mt-1 font-semibold text-[#E0E0E0]'>
                T1 vs Gen.G
              </div>
              <div className='mt-1 text-sm text-gray-400'>오후 7시 시작</div>
            </div>
          ))}
        </div>
      </ScrollArea>

      <ChatAccordion />
    </aside>
  );
};

export default RightSidebar;
