import { useState } from "react";
import { useUpcomingMatches } from "@/hooks/useUpcomingMatches";
import { usePastMatches } from "@/hooks/usePastMatches";
import BetBox from "@/components/BetBox";

const BetPage = () => {
  const [view, setView] = useState<"upcoming" | "past">("upcoming");

  const { matches: upcomingMatches, loading: loadingUpcoming } = useUpcomingMatches();
  const { matches: pastMatches, loading: loadingPast } = usePastMatches();

  const now = Date.now();

  // 필터: 베팅 가능한 경기
  const filteredUpcoming = upcomingMatches
    .filter(
      (m) =>
        m.blueTeam && m.redTeam && new Date(m.startTime).getTime() > now
    )
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  // 로딩 상태 처리
  if ((view === "upcoming" && loadingUpcoming) || (view === "past" && loadingPast)) {
    return <div className="p-4 text-white">로딩 중...</div>;
  }

  const displayedMatches = view === "upcoming" ? filteredUpcoming : pastMatches;

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <h1 className="mb-6 text-2xl font-bold text-[#8B6914]">
        {view === "upcoming" ? "🔥 베팅 가능한 경기" : "📜 지난 경기"}
      </h1>

      <div className="mb-6 flex gap-4">
        <button
          onClick={() => setView("upcoming")}
          className={`px-4 py-2 rounded ${
            view === "upcoming" ? "bg-yellow-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          베팅 가능
        </button>
        <button
          onClick={() => setView("past")}
          className={`px-4 py-2 rounded ${
            view === "past" ? "bg-yellow-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          지난 경기
        </button>
      </div>

      {displayedMatches.length === 0 ? (
        <div className="text-white">경기 정보가 없습니다.</div>
      ) : (
        <div className="flex flex-col gap-6">
          {displayedMatches.map((match) => (
            <BetBox key={match.matchId} match={match} />
          ))}
        </div>
      )}
    </div>
  );
};

export default BetPage;
