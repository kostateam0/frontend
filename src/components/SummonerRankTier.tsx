import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/framer-animations';

interface RankTierProps {
  puuid: string;
}

interface RankInfo {
  queueType: string;
  tier: string;
  rank: string;
  leaguePoints: number;
  wins: number;
  losses: number;
}

const queueTypeMap: Record<string, string> = {
  RANKED_SOLO_5x5: '솔로랭크',
  RANKED_FLEX_SR: '자유랭크',
};

const SummonerRankTier = ({ puuid }: RankTierProps) => {
  const [ranks, setRanks] = useState<RankInfo[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!puuid) return;
    const fetchRank = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/summoner/${puuid}/summonerRank`,
        );
        if (!res.ok) throw new Error('랭크 정보 로딩 실패');
        const data = await res.json();
        setRanks(data);
      } catch (err) {
        console.error('랭크 정보 로딩 실패:', err);
        setError('랭크 정보를 불러오는 중 오류가 발생했습니다.');
      }
    };
    fetchRank();
  }, [puuid]);

  if (error) return <p className='text-red-500'>{error}</p>;
  if (!ranks.length) return <p>🔄 랭크 정보를 불러오는 중...</p>;

  // 솔로랭크 → 자유랭크 순서로 정렬
  const rankOrder = ['RANKED_SOLO_5x5', 'RANKED_FLEX_SR'];
  const sortedRanks = [...ranks].sort(
    (a, b) => rankOrder.indexOf(a.queueType) - rankOrder.indexOf(b.queueType)
  );

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
      ></motion.h2>
      <motion.div
        variants={fadeIn}
        className='glass-card mx-auto flex w-full max-w-2xl flex-row gap-6 rounded-lg p-6'
      >
        {sortedRanks.map((rank) => (
          <div
            key={rank.queueType}
            className='flex flex-1 flex-col items-center justify-center text-center'
          >
            <img
              src={`https://opgg-static.akamaized.net/images/medals/${rank.tier.toLowerCase()}.png`}
              alt={rank.tier}
              className='mb-2 h-14 w-14 object-contain sm:h-16 sm:w-16'
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  'https://opgg-static.akamaized.net/images/medals/default.png';
              }}
            />
            <h3 className='text-base font-semibold break-keep sm:text-lg'>
              {queueTypeMap[rank.queueType] || rank.queueType}
            </h3>
            <p className='text-xs text-gray-500 sm:text-sm'>
              {rank.tier} {rank.rank} ({rank.leaguePoints}LP)
            </p>
            <p className='text-xs text-gray-500 sm:text-sm'>
              {rank.wins}승 {rank.losses}패
            </p>
            <p className='text-xs text-gray-500 sm:text-sm'>
              승률:{' '}
              {rank.wins + rank.losses > 0
                ? ((rank.wins / (rank.wins + rank.losses)) * 100).toFixed(1)
                : 0}
              %
            </p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SummonerRankTier;
