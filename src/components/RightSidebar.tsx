
import { useUpcomingMatches } from "@/hooks/useUpcomingMatches";
import BettingCard from "@/components/BettingCard";
import { format } from "date-fns";

import { ChatAccordion } from '@/components/chat/ChatAccordion';
import { ScrollArea } from './ui/scroll-area';


const RightSidebar = () => {
  const { matches, loading } = useUpcomingMatches();

  if (loading) return <div>로딩 중...</div>;
  if (matches.length === 0) return <div>경기 없음</div>;

  // ✅ 가장 가까운 날짜 계산
  const firstMatchDate = format(new Date(matches[0].startTime), "yyyy-MM-dd");

  // ✅ 그 날짜에 해당하는 경기만 필터링
  const todayMatches = matches.filter(
    (m) => format(new Date(m.startTime), "yyyy-MM-dd") === firstMatchDate
  );

  return (

    <aside className="hidden w-80 border-l p-4 xl:block" style={{ backgroundColor: "#111111", borderColor: "#2A2A2A" }}>
      <div className="mb-4 text-lg font-bold text-[#8B6914]">eSports 경기 정보</div>
      <div className="space-y-4">
        {todayMatches.map((match) => (
          <BettingCard key={match.matchId} match={match} />
        ))}
      </div>
    <aside
      className='hidden w-80 border-l p-4 xl:block'
      style={{ backgroundColor: '#111111', borderColor: '#2A2A2A' }}
    >
     /*
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
  */

    </aside>
  );
};

export default RightSidebar;
