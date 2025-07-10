// hooks/useUpcomingMatches.ts
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
  result?: string | null;
}

export const useUpcomingMatches = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/esports/upcoming");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("경기 정보를 불러오지 못했습니다.", err);
      } finally {
        setLoading(false);
      }
    };

    fetchMatches();
  }, []);

  return { matches, loading };
};
