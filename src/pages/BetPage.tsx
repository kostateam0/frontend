import { useUpcomingMatches } from '@/hooks/useUpcomingMatches';
import BetBox from '@/components/BetBox';

const BetPage = () => {
  const { matches, loading } = useUpcomingMatches();

  if (loading) return <div className="p-4 text-white">로딩 중...</div>;

  // 팀이 정해진 경기만 필터링
  const filteredMatches = matches.filter(
    (match) => match.blueTeam && match.redTeam
  );

  if (filteredMatches.length === 0) {
    return <div className="p-4 text-white">예정된 경기가 없습니다.</div>;
  }

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <h1 className="mb-6 text-2xl font-bold text-[#8B6914]">🔥 베팅 가능한 경기</h1>

      <div className="flex flex-col gap-6">
        {filteredMatches.map((match) => (
          <BetBox key={match.matchId} match={match} />
        ))}
      </div>
    </div>
  );
};

export default BetPage;
