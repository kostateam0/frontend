import { useUserStore } from "../store/userStore";
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

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

const BetBox = ({ match }: { match: Match }) => {
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
      alert("🎉 베팅 완료!");

      const updatedStats = await fetch(`http://localhost:4000/api/bet/stats/${match.matchId}`).then((r) =>
        r.json()
      );
      setStats(updatedStats);
    } catch (err: any) {
      console.error("❌ 베팅 에러:", err);
      alert(`베팅 실패: ${err.message}`);
    }
  };

  const isTeamReady = !!match.blueTeam && !!match.redTeam;

  return (
    <Card className="w-full max-w-full bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl text-white overflow-hidden">
      <CardContent className="p-4 space-y-4 overflow-hidden">
        {/* 상단 정보 */}
        <div className="flex justify-between text-sm text-gray-400">
          <span>{match.league}</span>
          <span>
            {new Date(match.startTime).toLocaleString("ko-KR", {
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>

        <Separator className="bg-gray-700" />

        {/* 팀 정보 + 버튼 */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 overflow-hidden">
          {/* 팀 이름 영역 */}
          <div className="flex items-center gap-4 flex-1 min-w-0 overflow-hidden">
            {/* 블루팀 */}
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <img
                src={match.blueTeamImage || "/default-blue.png"}
                className="h-6 w-6 rounded-full shrink-0"
                alt="blue"
              />
              <span className="text-sm font-medium text-blue-400 truncate max-w-[100px]">
                {match.blueTeam || "팀 미정"}
              </span>
            </div>

            <span className="text-xs text-gray-500 font-semibold shrink-0">VS</span>

            {/* 레드팀 */}
            <div className="flex items-center gap-2 min-w-0 overflow-hidden">
              <img
                src={match.redTeamImage || "/default-red.png"}
                className="h-6 w-6 rounded-full shrink-0"
                alt="red"
              />
              <span className="text-sm font-medium text-red-400 truncate max-w-[100px]">
                {match.redTeam || "팀 미정"}
              </span>
            </div>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-2 sm:flex-nowrap flex-wrap w-full sm:w-auto">
            <Button
              className={`text-white text-sm px-4 whitespace-nowrap truncate ${
                !isTeamReady ? "bg-blue-800 opacity-50 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
              }`}
              onClick={() => {
                if (isTeamReady) handleBet("blue");
              }}
              disabled={!isTeamReady}
            >
              블루 승 (100P)
            </Button>

            <Button
              className={`text-white text-sm px-4 whitespace-nowrap truncate ${
                !isTeamReady ? "bg-red-800 opacity-50 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"
              }`}
              onClick={() => {
                if (isTeamReady) handleBet("red");
              }}
              disabled={!isTeamReady}
            >
              레드 승 (100P)
            </Button>
          </div>
        </div>

        {/* 승률 바: 맨 아래 고정 */}
        <div className="w-full">
          <div className="flex h-4 overflow-hidden rounded-full bg-gray-700 text-xs font-semibold text-white shadow-inner min-w-0">
            <div
              className="bg-blue-600 flex items-center justify-center min-w-0"
              style={{ width: `${bluePercent}%` }}
            >
              {bluePercent > 10 && <span className="truncate">{bluePercent}%</span>}
            </div>
            <div
              className="bg-red-600 flex items-center justify-center min-w-0"
              style={{ width: `${redPercent}%` }}
            >
              {redPercent > 10 && <span className="truncate">{redPercent}%</span>}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BetBox;
