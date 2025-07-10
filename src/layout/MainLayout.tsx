import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import RightSidebar from '../components/RightSidebar'; // ✅ 추가
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout() {
  return (
    <div
      className='flex h-screen max-w-full flex-col items-center justify-center overflow-hidden'
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* 상단 모바일 헤더 */}
      <div className='flex items-center justify-between border-b border-[#2A2A2A] bg-[#151515] p-4 lg:hidden'>
        <h1 className='flex items-center gap-2 text-lg font-bold text-[#E0E0E0]'>
          <span className='text-[#8B6914]'>🏆</span> Dark Troll
        </h1>
      </div>

      {/* 본문 */}
      <div className='flex max-w-7xl flex-1 overflow-hidden'>
        <Sidebar />
        <main
          id='scrollable-main'
          className='scrollbar w-full min-w-3xl flex-1 px-4 pt-4 pb-24 lg:pb-4'
          style={{ backgroundColor: '#0A0A0A' }}
        >
          <Outlet />
          {/* <div className='mx-auto max-w-4xl'>
            
          </div> */}
        </main>
        <Toaster position='bottom-center' />
        <RightSidebar /> {/* ✅ 컴포넌트 삽입 */}
      </div>

      <MobileNav />
    </div>
  );
}
