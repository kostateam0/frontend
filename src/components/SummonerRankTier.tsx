import { useEffect, useState } from 'react';

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
    (a, b) => rankOrder.indexOf(a.queueType) - rankOrder.indexOf(b.queueType),
  );

  return (
    <div className='flex w-full flex-row justify-center gap-4 sm:justify-start'>
      {sortedRanks.map((rank) => (
        <div
          key={rank.queueType}
          className='flex w-32 flex-col items-center justify-center rounded-xl border border-slate-700 bg-slate-900/70 p-3 text-center shadow-sm'
        >
          <img
            src={`https://opgg-static.akamaized.net/images/medals/${rank.tier.toLowerCase()}.png`}
            alt={rank.tier}
            className='mb-1 h-10 w-10 object-contain'
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://opgg-static.akamaized.net/images/medals/default.png';
            }}
          />
          <h3 className='mb-1 text-xs font-semibold break-keep text-slate-200'>
            {queueTypeMap[rank.queueType] || rank.queueType}
          </h3>
          <p className='text-xs text-gray-400'>
            {rank.tier} {rank.rank} ({rank.leaguePoints}LP)
          </p>
          <p className='text-xs text-gray-400'>
            {rank.wins}승 {rank.losses}패
          </p>
          <p className='text-xs text-gray-400'>
            승률:{' '}
            {rank.wins + rank.losses > 0
              ? ((rank.wins / (rank.wins + rank.losses)) * 100).toFixed(1)
              : 0}
            %
          </p>
        </div>
      ))}
    </div>
  );
};

export default SummonerRankTier;
