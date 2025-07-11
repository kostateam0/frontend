import { useState } from "react";
import { useUpcomingMatches } from "@/hooks/useUpcomingMatches";
import { usePastMatches } from "@/hooks/usePastMatches";
import { useRunningMatches } from "@/hooks/useRunningMatches";
import BetBox from "@/components/BetBox";

type View = "upcoming" | "past" | "ongoing";

const BetPage = () => {
  const [view, setView] = useState<View>("upcoming");
  

  const { matches: upcomingMatches, loading: loadingUpcoming } = useUpcomingMatches();
  const { matches: pastMatches, loading: loadingPast } = usePastMatches();
  const { matches: runningMatches, loading: loadingRunning } = useRunningMatches(); 


  const now = Date.now();

  const filteredUpcoming = upcomingMatches
    .filter((m) => m.blueTeam && m.redTeam && new Date(m.startTime).getTime() > now)
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  const filteredOngoing = upcomingMatches
    .filter(
      (m) =>
        m.blueTeam &&
        m.redTeam &&
        new Date(m.startTime).getTime() <= now &&
        !m.result // 결과가 아직 없는 경우
    )
    .sort((a, b) => new Date(a.startTime).getTime() - new Date(b.startTime).getTime());

  let displayedMatches = [];
  let isLoading = false;

  if (view === "upcoming") {
    displayedMatches = filteredUpcoming;
    isLoading = loadingUpcoming;
  } else if (view === "past") {
    displayedMatches = pastMatches;
    isLoading = loadingPast;
  } else {
    displayedMatches = runningMatches;
    isLoading = loadingRunning;
  }

  return (
    <div className="min-h-screen bg-[#111111] p-6">
      <h1 className="mb-6 text-2xl font-bold text-[#8B6914]">
        {view === "upcoming"
          ? "🔥 베팅 가능한 경기"
          : view === "past"
          ? "📜 지난 경기"
          : "⚔️ 진행 중인 경기"}
      </h1>

      {/* 탭 메뉴 */}
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
        <button
          onClick={() => setView("ongoing")}
          className={`px-4 py-2 rounded ${
            view === "ongoing" ? "bg-yellow-600 text-white" : "bg-gray-700 text-gray-300"
          }`}
        >
          진행 중
        </button>
      </div>

      {isLoading ? (
        <div className="text-white">로딩 중...</div>
      ) : displayedMatches.length === 0 ? (
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
