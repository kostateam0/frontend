import { useUserStore } from "../store/userStore";
import { useEffect, useState } from "react";

export interface Match {
  matchId: number;
  name: string;
  league: string;
  blueTeam: string;
  redTeam: string;
  blueTeamImage?: string;
  redTeamImage?: string;
  startTime: string;
}

const BettingCard = ({ match }: { match: Match }) => {
  const { isLoggedIn } = useUserStore();
  const [amount] = useState(100);
  const [stats, setStats] = useState<{ blue: number; red: number }>({ blue: 0, red: 0 });

  useEffect(() => {
    fetch(`http://localhost:4000/api/bet/stats/${match.matchId}`)
      .then((res) => res.json())
      .then(setStats)
      .catch((err) => console.error("베팅 통계 오류:", err));
  }, [match.matchId]);

  const total = stats.blue + stats.red;
  const bluePercent = total ? Math.round((stats.blue / total) * 100) : 0;
  const redPercent = total ? Math.round((stats.red / total) * 100) : 0;

  const handleBet = async (team: "blue" | "red") => {
    if (!isLoggedIn) {
      alert("⚠️ 로그인 후에 베팅할 수 있습니다.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/bet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ matchId: match.matchId, team, amount }),
      });

      if (!res.ok) throw new Error(await res.text());
      const result = await res.json();
      alert("🎉 베팅 완료!");
      console.log("✅", result.message);

      // 갱신
      const updatedStats = await fetch(`http://localhost:4000/api/bet/stats/${match.matchId}`).then((r) => r.json());
      setStats(updatedStats);
    } catch (err: any) {
      console.error("❌ 베팅 에러:", err);
      alert(`베팅 실패: ${err.message}`);
    }
  };

  return (
    <div className="rounded-xl border border-[#333] bg-[#1A1A1A] p-5 shadow-lg transition hover:shadow-xl">
      <div className="text-sm text-gray-400">{match.league}</div>
      <div className="mt-1 text-lg font-bold text-white">{match.name}</div>
      <div className="text-sm text-gray-400">
        {new Date(match.startTime).toLocaleString("ko-KR", {
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>

      <div className="mt-4 flex items-center justify-between gap-4">
        <div className="flex flex-col items-center gap-1">
          <img src={match.blueTeamImage || "/default-blue.png"} className="h-10 w-10 rounded-full" alt="blue" />
          <span className="text-xs text-blue-400">{match.blueTeam}</span>
        </div>
        <div className="text-sm text-gray-500">VS</div>
        <div className="flex flex-col items-center gap-1">
          <img src={match.redTeamImage || "/default-red.png"} className="h-10 w-10 rounded-full" alt="red" />
          <span className="text-xs text-red-400">{match.redTeam}</span>
        </div>
      </div>

      {/* ✅ 베팅 통계 바 */}
      <div className="mt-4">
        <div className="text-xs text-gray-400 mb-1">베팅 분포</div>
        <div className="flex h-4 overflow-hidden rounded bg-gray-700 text-xs font-semibold text-white">
          <div
            className="bg-blue-600 flex items-center justify-center"
            style={{ width: `${bluePercent}%` }}
          >
            {bluePercent > 10 && <span>{bluePercent}%</span>}
          </div>
          <div
            className="bg-red-600 flex items-center justify-center"
            style={{ width: `${redPercent}%` }}
          >
            {redPercent > 10 && <span>{redPercent}%</span>}
          </div>
        </div>
      </div>

      {/* ✅ 베팅 버튼 */}
      <div className="mt-4 flex gap-2">
        <button
          className="flex-1 rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-2 text-sm font-medium text-white transition"
          onClick={() => handleBet("blue")}
        >
          {match.blueTeam} 승 (100P)
        </button>
        <button
          className="flex-1 rounded-md bg-red-600 hover:bg-red-700 px-3 py-2 text-sm font-medium text-white transition"
          onClick={() => handleBet("red")}
        >
          {match.redTeam} 승 (100P)
        </button>
      </div>
    </div>
  );
};

export default BettingCard;
