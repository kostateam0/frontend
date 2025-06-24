import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/framer-animations';

interface MasteryProps {
  puuid: string;
  summonerName: string;
}

const SummonerChampMastery = ({ puuid, summonerName }: MasteryProps) => {
  const [masteries, setMasteries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puuid) return;

    const fetchMasteries = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/summoner/${puuid}/masteries`,
        );
        if (!res.ok) throw new Error('마스터리 정보 로딩 실패');

        const data = await res.json();
        setMasteries(data);
      } catch (err) {
        console.error('마스터리 로딩 실패:', err);
        setError('챔피언 마스터리 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };

    fetchMasteries();
  }, [puuid]);

  if (error) return <p className='text-red-500'>{error}</p>;
  if (!masteries.length) return <p>🔄 챔피언 숙련도를 불러오는 중...</p>;
  // 숙련도 레벨 기준으로 내림차순 정렬 후 상위 3개만 추출
  const top3 = [...masteries]
    .sort(
      (a, b) =>
        b.championLevel - a.championLevel ||
        b.championPoints - a.championPoints,
    )
    .slice(0, 3);

  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true, margin: '-100px' }}
      className='mt-12'
    >
      <motion.h2 variants={staggerItem} className='mb-6 text-3xl font-bold'>
        {summonerName}의 챔피언 숙련도 TOP 3
      </motion.h2>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'>
        {top3.map((champion: any) => (
          <motion.div
            key={champion.championId}
            variants={fadeIn}
            className='glass-card flex flex-col items-center rounded-lg p-4'
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${champion.championName}.png`}
              alt={champion.championName}
              className='mb-2 h-24 w-24'
            />
            <h3 className='text-lg font-semibold'>{champion.championName}</h3>
            <p className='text-sm text-gray-500'>
              숙련도 레벨: {champion.championLevel}
            </p>
            <p className='text-sm text-gray-500'>
              숙련도 포인트: {champion.championPoints}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};
export default SummonerChampMastery;
