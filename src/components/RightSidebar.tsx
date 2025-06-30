import { useUpcomingMatches } from '@/hooks/useUpcomingMatches';
import BettingCard from '@/components/BettingCard';
import { format } from 'date-fns';

import { ChatAccordion } from '@/components/chat/ChatAccordion';
import { ScrollArea } from './ui/scroll-area';

const RightSidebar = () => {
  const { matches, loading } = useUpcomingMatches();

  if (loading) return <div>로딩 중...</div>;
  if (matches.length === 0) return <div>경기 없음</div>;

  /* 👉 만약 API가 정렬을 보장하지 않으면 직접 정렬 */
  const sorted = [...matches].sort(
    (a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime(),
  );

  const firstMatchDate = format(new Date(sorted[0].startTime), 'yyyy-MM-dd');

  const todayMatches = sorted.filter(
    (m) => format(new Date(m.startTime), 'yyyy-MM-dd') === firstMatchDate,
  );

  return (
    <aside
      className='hidden w-80 border-l p-4 xl:block'
      style={{ backgroundColor: '#111111', borderColor: '#2A2A2A' }}
    >
      <div className='mb-4 text-lg font-bold text-[#8B6914]'>
        eSports 경기 정보
      </div>

      {/* 경기 카드들을 스크롤 영역에 감싸서 넘치면 스크롤 */}
      <ScrollArea className='h-1/3 pr-1'>
        <div className='space-y-4'>
          {todayMatches.map((match) => (
            <BettingCard key={match.matchId} match={match} />
          ))}
        </div>
      </ScrollArea>

      {/* 필요하면 아래쪽에 채팅 아코디언 등 추가 UI 배치 */}
      {/* <div className="mt-6"> */}
      <ChatAccordion />
      {/* </div> */}
    </aside>
  );
};

export default RightSidebar;
