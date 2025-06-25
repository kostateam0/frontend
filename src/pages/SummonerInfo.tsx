import { useEffect, useState } from 'react';
import SummonerProfile from '../components/SummonerProfile';
import MatchList from '../components/MatchListPage';
import SummonerChampMastery from '../components/SummonerChampMastery';
import SummonerRankTier from '@/components/SummonerRankTier';

// props로 region, summonerName, tag 받음
interface Props {
  region: string;
  summonerName: string;
  tag: string;
}

interface Summoner {
  name: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: number;
  puuid?: string;
}

interface ApiResponse {
  user: Summoner;
  summonerName: string;
  tag: string;
}

const SummonerInfo = ({ region, summonerName, tag }: Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL('http://localhost:4000/api/summoner');
        url.searchParams.append('summonerName', summonerName);
        url.searchParams.append('tag', tag);
        url.searchParams.append('region', region);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error('API 호출 실패');

        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err) {
        setError('소환사 정보를 불러올 수 없습니다.');
        console.error(err);
      }
    };

    if (summonerName && tag && region) {
      fetchData();
    }
  }, [summonerName, tag, region]);

  if (error) return <p className='mt-6 text-center text-red-500'>{error}</p>;
  if (!data)
    return <p className='mt-6 text-center text-gray-500'>불러오는 중...</p>;

  return (
    <div className='mx-auto max-w-4xl px-4 pt-12 pb-20'>
      {/* Summoner Profile */}
      <SummonerProfile
        summoner={data.user}
        summonerName={data.summonerName}
        tag={data.tag}
      />
      {/* Summoner Champion Mastery & Match List 나란히 배치 */}
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='w-full lg:w-1/3'>
          <SummonerRankTier puuid={data.user.puuid!} />
          <SummonerChampMastery
            puuid={data.user.puuid!}
            summonerName={data.summonerName}
          />
        </div>
        <div className='w-full lg:w-2/3'>
          <MatchList
            puuid={data.user.puuid!}
            summonerName={data.summonerName}
          />
        </div>
      </div>
    </div>
  );
};

export default SummonerInfo;
