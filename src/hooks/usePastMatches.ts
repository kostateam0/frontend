// src/hooks/usePastMatches.ts
import { useEffect, useState } from "react";

export interface Match {
  matchId: number;
  name: string;
  league: string;
  blueTeam: string;
  redTeam: string;
  blueTeamImage?: string;
  redTeamImage?: string;
  winner?: string;
  startTime: string;
  endTime?: string;
  result?: string | null;
}

export const usePastMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://192.168.0.42:4000/api/esports/past");
        const data: Match[] = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("과거 경기 정보를 불러오지 못했습니다.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading };
};
