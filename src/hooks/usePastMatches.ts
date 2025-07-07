// src/hooks/usePastMatches.ts
import { useEffect, useState } from "react";

export const usePastMatches = () => {
  const [matches, setMatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPastMatches = async () => {
      try {
        const res = await fetch("http://localhost:4000/api/matches/past");
        const data = await res.json();
        setMatches(data);
      } catch (err) {
        console.error("과거 경기 로딩 실패", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPastMatches();
  }, []);

  return { matches, loading };
};
