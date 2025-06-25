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
      className='mt-12 w-full'
    >
      <motion.h2
        variants={staggerItem}
        className='text-1xl mb-8 text-center font-bold'
      >
        {summonerName}의 챔피언 숙련도 TOP 3
      </motion.h2>

      <motion.div
        variants={fadeIn}
        className='glass-card mx-auto flex w-full max-w-2xl flex-row gap-6 rounded-lg p-6'
        // flex-row로 항상 가로 정렬, 모바일에서도 3개가 한 줄에 나란히
      >
        {top3.map((champion: any) => (
          <div
            key={champion.championId}
            className='flex flex-1 flex-col items-center justify-center text-center'
          >
            <img
              src={`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${champion.championName}.png`}
              alt={champion.championName}
              className='mb-2 h-12 w-12 object-contain sm:h-14 sm:w-14'
            />
            <h3 className='text-base font-semibold break-keep sm:text-lg'>
              {champion.championName}
            </h3>
            <p className='text-xs text-gray-500 sm:text-sm'>
              레벨: {champion.championLevel}
            </p>
            <p className='text-xs text-gray-500 sm:text-sm'>
              포인트: {champion.championPoints}
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};
export default SummonerChampMastery;
