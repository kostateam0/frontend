import { useEffect, useState } from 'react';
import MatchSummaryCard from './MatchSummaryCard';
import MatchDetail from './MatchDetail';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/framer-animations';

interface MatchListProps {
  puuid: string;
  summonerName: string;
}

const MatchListPage = ({ puuid, summonerName }: MatchListProps) => {
  const [matches, setMatches] = useState<any[]>([]);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puuid) return;

    const loadMatches = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/match/full/${puuid}?count=20`,
        );

        const data = await res.json();

        if (!res.ok || !data.matches) {
          throw new Error('매치 정보 로딩 실패');
        }

        const validMatches = data.matches
          .filter((match: any) => match !== null)
          .map((match: any) => ({ ...match, puuid, summonerName }));

        setMatches(validMatches);
      } catch (err) {
        console.error('전체 매치 로딩 실패:', err);
        setError('매치 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    loadMatches();
  }, [puuid]);

  if (error) return <p className='text-red-500'>{error}</p>;
  if (!matches.length) return <p>🔄 최근 매치를 불러오는 중...</p>;

  return (
    <div className='mt-12'>
      <motion.div
        variants={staggerContainer}
        initial='hidden'
        whileInView='visible'
        viewport={{ once: true, margin: '-100px' }}
        className='mb-8 text-center'
      ></motion.div>

      <div className='space-y-1'>
        {matches.map((match, idx) => {
          const participant = match.info?.participants?.find(
            (p: any) =>
              p.summonerName?.toLowerCase() ===
                match.summonerName?.toLowerCase() || p.puuid === match.puuid,
          );

          if (!match.info || !match.info.participants) {
            return (
              <motion.div
                key={match.metadata?.matchId ?? idx}
                variants={fadeIn}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='glass-card rounded-xl p-4 text-center text-gray-500'
              >
                🔄 매치 정보를 불러오는 중...
              </motion.div>
            );
          }

          if (!participant) {
            return (
              <motion.div
                key={match.metadata?.matchId ?? idx}
                variants={fadeIn}
                initial='hidden'
                whileInView='visible'
                viewport={{ once: true }}
                className='glass-card rounded-xl bg-red-100 p-4 text-center text-red-600'
              >
                ❌ 유저 정보를 찾을 수 없습니다.
              </motion.div>
            );
          }

          return (
            <motion.div
              key={match.metadata?.matchId ?? idx}
              variants={fadeIn}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true }}
              className='glass-card rounded-xl p-4'
            >
              <MatchSummaryCard
                match={match}
                onClick={() =>
                  setExpandedIndex(idx === expandedIndex ? null : idx)
                }
              />
              {expandedIndex === idx && (
                <MatchDetail
                  data={{ user: { puuid: participant.puuid }, match }}
                />
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default MatchListPage;
