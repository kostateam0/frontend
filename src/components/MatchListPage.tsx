import { useEffect, useState } from "react";
import MatchSummaryCard from "./MatchSummaryCard";
import MatchDetail from "./MatchDetail";
import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/framer-animations";

interface MatchListProps {
  puuid: string;
  summonerName: string;
}

const MatchListPage = ({ puuid, summonerName }: MatchListProps) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (puuid) {
      fetch(`http://localhost:3000/api/summoner/${puuid}/matches?count=20`)
        .then(res => res.json())
        .then(async ({ matchIds }) => {
          const fetchedMatches = await Promise.all(
            matchIds.map((id: string) =>
              fetch(`http://localhost:3000/api/match/${id}`).then(res => res.json())
            )
          );
          setMatches(
            fetchedMatches.map(match => ({
              ...match,
              puuid,
              summonerName,
            }))
          );
        })
        .catch(err => {
          console.error("매치 정보 실패:", err);
          setError("매치 정보를 불러올 수 없습니다.");
        });
    }
  }, [puuid]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!matches.length) return <p>최근 매치를 불러오는 중...</p>;

  return (
    <div className="mt-12">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="mb-8 text-center"
      >
        <motion.h2 variants={staggerItem} className="text-3xl font-bold">
          Recent Matches
        </motion.h2>
      </motion.div>

      <div className="space-y-6">
        {matches.map((match, idx) => {
          const participant = match.info?.participants?.find(
            (p: any) =>
              p.summonerName?.toLowerCase() === match.summonerName?.toLowerCase() ||
              p.puuid === match.puuid
          );

          return (
            <motion.div
              key={match.metadata?.matchId ?? idx}
              variants={fadeIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="glass-card rounded-xl p-4"
            >
              <MatchSummaryCard
                match={match}
                onClick={() => setExpandedIndex(idx === expandedIndex ? null : idx)}
              />
              {expandedIndex === idx && (
                <MatchDetail data={{ user: { puuid: participant?.puuid ?? match.puuid }, match }} />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchListPage;
