// src/hooks/useRunningMatches.ts
import { useEffect, useState } from "react";

export interface Match {
  matchId: number;
  name: string;
  league: string;
  blueTeam: string;
  redTeam: string;
  blueTeamImage?: string;
  redTeamImage?: string;
  winner?: string | null;
  startTime: string;
  endTime?: string | null;
  status?: string;
}

export const useRunningMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRunningMatches = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/esports/running");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("진행 중인 경기 정보를 불러오지 못했습니다.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchRunningMatches();
  }, []);

  return { matches, loading };
};
