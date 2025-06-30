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
    const handleBet = async (team: "blue" | "red") => {
      try {
        const res = await fetch("http://localhost:4000/api/bet", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include", // 로그인 세션 유지용 (필요 없으면 생략 가능)
          body: JSON.stringify({
            matchId: match.matchId,
            team,
          }),
        });
    
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(errorText || "베팅 요청 실패");
        }
    
        const result = await res.json();
        console.log("✅ 베팅 완료:", result.message);
        alert("베팅이 성공적으로 완료되었습니다!");
      } catch (err) {
        console.error("❌ 베팅 에러:", err);
        alert("베팅 요청에 실패했습니다.");
      }
    };
    
  
    return (
      <div className="rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4">
        <div className="text-sm text-gray-400">{match.league}</div>
        <div className="mt-1 font-semibold text-[#E0E0E0]">{match.name}</div>
        <div className="mt-1 text-sm text-gray-400">
          {new Date(match.startTime).toLocaleString("ko-KR", {
            hour: "2-digit",
            minute: "2-digit",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
  
        <div className="mt-3 flex items-center justify-between gap-2">
          <div className="flex flex-col items-center">
            <img
              src={match.blueTeamImage || "/default-blue.png"}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xs text-gray-300">{match.blueTeam}</span>
          </div>
          <span className="text-sm text-gray-400">vs</span>
          <div className="flex flex-col items-center">
            <img
              src={match.redTeamImage || "/default-red.png"}
              className="h-8 w-8 rounded-full"
            />
            <span className="text-xs text-gray-300">{match.redTeam}</span>
          </div>
        </div>
  
        {/* ✅ 베팅 버튼 영역 */}
        <div className="mt-4 flex gap-2">
          <button
            className="flex-1 rounded-md bg-blue-600 hover:bg-blue-700 px-3 py-1 text-sm font-medium text-white"
            onClick={() => handleBet("blue")}
          >
            {match.blueTeam} 승
          </button>
          <button
            className="flex-1 rounded-md bg-red-600 hover:bg-red-700 px-3 py-1 text-sm font-medium text-white"
            onClick={() => handleBet("red")}
          >
            {match.redTeam} 승
          </button>
        </div>
      </div>
    );
  };
  
  export default BettingCard;
  