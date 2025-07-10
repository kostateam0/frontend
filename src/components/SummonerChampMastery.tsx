import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/framer-animations';

interface MasteryProps {
  puuid: string;
  summonerName: string;
}

const SummonerChampMastery = ({ puuid }: MasteryProps) => {
  const [masteries, setMasteries] = useState<any[]>([]);
  const [championMap, setChampionMap] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  // 챔피언 ID → 이름 매핑 가져오기
  useEffect(() => {
    const fetchChampionMap = async () => {
      try {
        const res = await fetch(
          'https://ddragon.leagueoflegends.com/cdn/15.12.1/data/en_US/champion.json',
        );
        const data = await res.json();

        const map: Record<string, string> = {};
        Object.values(data.data).forEach((champ: any) => {
          map[champ.key] = champ.id; // key: '103', id: 'Ahri'
        });

        setChampionMap(map);
      } catch (err) {
        console.error('챔피언 매핑 로딩 실패:', err);
      }
    };

    fetchChampionMap();
  }, []);

  // 챔피언 숙련도 데이터 가져오기
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
  if (!masteries.length || !Object.keys(championMap).length)
    return <p>🔄 챔피언 숙련도 불러오는 중...</p>;

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
      <motion.div
        variants={fadeIn}
        className='glass-card mx-auto flex w-full max-w-2xl flex-row gap-6 rounded-lg p-4'
      >
        {top3.map((champion: any) => {
          const champName = championMap[champion.championId.toString()];
          const imageUrl = `https://ddragon.leagueoflegends.com/cdn/15.12.1/img/champion/${champName}.png`;

          return (
            <div
              key={champion.championId}
              className='flex flex-1 flex-col items-center justify-center gap-2 text-center'
            >
              <img
                src={imageUrl}
                alt={champName}
                className='mb-1 h-10 w-10 rounded-full object-cover sm:h-12 sm:w-12'
              />
              <h3 className='text-sm font-semibold break-keep sm:text-base'>
                {champName}
              </h3>
              <p className='text-xs text-gray-500 sm:text-sm'>
                레벨: {champion.championLevel}
              </p>
              <p className='text-xs text-gray-500 sm:text-sm'>
                포인트: {champion.championPoints}
              </p>
            </div>
          );
        })}
      </motion.div>
    </motion.div>
  );
};

export default SummonerChampMastery;
