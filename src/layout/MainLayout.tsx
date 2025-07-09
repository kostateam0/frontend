import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import MobileNav from '../components/MobileNav';
import RightSidebar from '../components/RightSidebar'; // ✅ 추가
import { Toaster } from '@/components/ui/sonner';

export default function MainLayout() {
  return (
    <div className="flex h-screen w-full flex-col overflow-hidden" style={{ backgroundColor: '#0A0A0A' }}>
      {/* 상단 모바일 헤더 */}
      <div className="flex items-center justify-between border-b border-[#2A2A2A] bg-[#151515] p-4 lg:hidden">
        <h1 className="flex items-center gap-2 text-lg font-bold text-[#E0E0E0]">
          <span className="text-[#8B6914]">🏆</span> Dark Troll
        </h1>
      </div>

      {/* 전체 본문 wrapper */}
      <div className="flex flex-1 w-full justify-center overflow-hidden">
        <div className="flex w-full max-w-7xl">
          {/* 좌측 사이드바 */}
          <div className="hidden lg:block w-[250px]">
            <Sidebar />
          </div>

          {/* 중앙 피드 */}
          <main
            id="scrollable-main"
            className="flex-1 max-w-3xl overflow-y-auto px-4 pt-4 pb-24 lg:pb-4 scrollbar"
            style={{
              backgroundColor: '#0A0A0A',
              minHeight: '100%',
            }}
          >
            <Outlet />
          </main>

          {/* 우측 사이드바 */}
          <div className="hidden lg:block w-[280px]">
            <RightSidebar />
          </div>
        </div>
      </div>

      <Toaster position="bottom-center" />
      <MobileNav />
    </div>
  );
}

