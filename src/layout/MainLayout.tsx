import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import MobileNav from "../components/MobileNav";
import RightSidebar from "../components/RightSidebar"; // ✅ 추가

export default function MainLayout() {
  return (
    <div className="flex h-screen flex-col overflow-hidden bg-[#0A0A0A]">
      {/* 상단 모바일 헤더 */}
      <div className="flex lg:hidden items-center justify-between border-b p-4 bg-[#151515] border-[#2A2A2A]">
        <h1 className="flex items-center gap-2 text-lg font-bold text-[#E0E0E0]">
          <span className="text-[#8B6914]">🏆</span> Dark Troll
        </h1>
      </div>

      {/* 본문 */}
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main
          id="scrollable-main"
          className="flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:pb-4"
        >
          <div className="mx-auto max-w-4xl">
            <Outlet />
          </div>
        </main>

        <RightSidebar /> {/* ✅ 컴포넌트 삽입 */}
      </div>

      <MobileNav />
    </div>
  );
}
