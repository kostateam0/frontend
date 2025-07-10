import { useEffect, useState } from 'react';
import SummonerProfile from '../components/SummonerProfile';
import MatchList from '../components/MatchListPage';
import SummonerChampMastery from '../components/SummonerChampMastery';
import SummonerRankTier from '@/components/SummonerRankTier';

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
  puuid: string; // 필수로 처리
}

interface ApiResponse {
  user: Summoner;
  summonerName: string;
  tag: string;
}

const SummonerInfo = ({ region, summonerName, tag }: Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL('http://localhost:4000/api/summoner');
        url.searchParams.append('summonerName', summonerName);
        url.searchParams.append('tag', tag);
        url.searchParams.append('region', region);

        console.log('📡 API 요청 URL:', url.toString());

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error(`API 호출 실패: ${res.status}`);

        const json: ApiResponse = await res.json();
        if (!json.user || !json.user.puuid) {
          throw new Error('유효한 소환사 정보를 찾을 수 없습니다.');
        }

        setData(json);
      } catch (err: any) {
        console.error('❌ 소환사 정보 에러:', err);
        setError(err.message ?? '소환사 정보를 불러올 수 없습니다.');
      }
    };

    if (summonerName && tag && region) {
      fetchData();
    }
  }, [region, summonerName, tag]);

  if (error) {
    return <p className='mt-6 text-center text-red-500'>{error}</p>;
  }

  if (!data) {
    return <p className='mt-6 text-center text-gray-500'>불러오는 중...</p>;
  }

  const { user, summonerName: name, tag: riotTag } = data;

  return (
    <div className='mx-auto max-w-5xl px-4'>
      <SummonerProfile
        summoner={user}
        summonerName={name}
        tag={riotTag}
        puuid={user.puuid}
      />
      <div className='flex flex-col gap-8 lg:flex-row'>
        <div className='w-full'>
          <SummonerChampMastery puuid={user.puuid} summonerName={name} />
          <MatchList puuid={user.puuid} summonerName={name} />
        </div>
      </div>
    </div>
  );
};

export default SummonerInfo;
