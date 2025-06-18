import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/framer-animations';
import Navbar from '@/components/Navbar';
import AnimatedBackground from '@/components/AnimatedBackground';
import MatchSummaryCard from '@/components/MatchSummaryCard';
import MatchDetail from '@/components/MatchDetail';

const MatchListPage = () => {
  const { region, riotId } = useParams<{ region: string; riotId: string }>();
  const [matches, setMatches] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [gameName, tagLine] = riotId?.split('-') ?? ['', ''];

  useEffect(() => {
    if (gameName && tagLine) {
      const fetchMatches = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/summoner?gameName=${encodeURIComponent(gameName)}&tagLine=${encodeURIComponent(tagLine)}`);
          const data = await res.json();
          console.log('받은 데이터:', data);

          if (data?.match && data?.user) {
            setMatches([
              {
                ...data.match,
                summonerName: data.gameName, // 👈 summonerName 명시적으로 넣어줌
                puuid: data.user.puuid,      // 👈 puuid도 넣어줌
              }
            ]);
          } else {
            setMatches([]);
          }
        } catch (err) {
          console.error('매치 데이터 불러오기 실패:', err);
          setError('데이터를 불러오는 데 실패했습니다.');
        }
      };

      fetchMatches();
    }
  }, [gameName, tagLine]);

  return (
    <>
      <AnimatedBackground />
      <Navbar matches={matches} summonerName={gameName} />
      <main className="mx-auto max-w-4xl px-4 pt-32 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-12 text-center"
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
      </main>
    </>
  );
};

export default MatchListPage;
