'use client';

import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Search, Trophy } from 'lucide-react';
import { useEffect, useState } from 'react';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';

const fetchLeaderBoard = async () => {
  const response = await fetch(
    'http://localhost:4000/api/lol/leaderboard/load',
  );
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export default function LeaderBoardPage() {
  interface LeaderboardEntry {
    summonerId: string;
    summonerName: string;
    profileIconId: number;
    leaguePoints: number;
    wins: number;
    losses: number;
    summonerLevel: number;
    // Add other fields as needed based on your API response
  }
  
    const [leaderboardDate, setLeaderboardDate] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLeaderBoard();
        console.log(data.data);
        setLeaderboardDate(data.data);
      } catch (error) {
        console.error('Error fetching leaderboard data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className='container mx-auto px-4 py-8'>
      {/* 페이지 소개 */}
      <div className='mb-8'>
        <div className='mb-4 flex items-center space-x-3'>
          <Trophy className='h-8 w-8 text-yellow-500' />
          <h1 className='text-3xl font-bold'>리더보드</h1>
        </div>
        <p className='text-slate-600'>
          최고의 플레이어들과 경쟁하고 순위를 확인하세요
        </p>
      </div>

      {/* Filters */}
      <div className='mb-6 flex flex-col gap-4 sm:flex-row'>
        <Select defaultValue='kr'>
          <SelectTrigger className='w-full sm:w-48'>
            <SelectValue placeholder='서버 선택' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value='kr'>KR</SelectItem>
            <SelectItem value='na'>NA</SelectItem>
            <SelectItem value='euw'>EUW</SelectItem>
            <SelectItem value='eune'>EUNE</SelectItem>
          </SelectContent>
        </Select>
        <Select defaultValue='challenger'>
          <SelectTrigger className='w-full sm:w-48'>
            <SelectValue placeholder='티어 선택' />
          </SelectTrigger>
          <SelectContent className='bg-white'>
            <SelectItem value='challenger'>챌린저</SelectItem>
            <SelectItem value='grandmaster'>그랜드마스터</SelectItem>
            <SelectItem value='master'>마스터</SelectItem>
          </SelectContent>
        </Select>
        <div className='relative flex-1'>
          <Search className='absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform text-slate-400' />
          <Input placeholder='플레이어 검색' className='pl-10' />
        </div>
      </div>

      {/* 리더보드 헤더 */}
      <div className='mb-4 grid grid-cols-12 gap-4 border-b px-4 py-2 text-sm font-semibold text-slate-600'>
        <div className='col-span-1 text-center'>순위</div>
        <div className='col-span-4'>플레이어</div>
        <div className='col-span-1 text-center'>티어</div>
        <div className='col-span-1 text-center'>LP</div>
        <div className='col-span-2 text-center'>승률</div>
        <div className='col-span-1 text-center'>레벨</div>
        <div className='col-span-2 text-center'>승/패</div>
      </div>

      {/* 리더보드 테이블 */}
      <div className='space-y-2'>
        {!leaderboardDate && (
          <div className='flex items-center justify-center py-8'>
            <span className='text-slate-500'>데이터가 없습니다.</span>
          </div>
        )}
        {leaderboardDate &&
          leaderboardDate.map((entry, index) => (
            <div
              key={entry.summonerId}
              className='grid grid-cols-12 items-center gap-4 rounded-lg bg-white p-4 shadow-sm transition-shadow hover:shadow-md'
            >
              {/* 순위 */}
              <div className='col-span-1 text-center'>
                <span className='text-lg font-bold text-slate-700'>
                  {index + 1}
                </span>
              </div>

              {/* 플레이어 정보 */}
              <div className='col-span-4'>
                <div className='flex items-center space-x-3'>
                  <div className='relative'>
                    <div className='flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-gradient-to-br from-[#0bc8b9] to-[#0aa89a] shadow-md'>
                      <img
                        src={`https://ddragon.leagueoflegends.com/cdn/15.12.1/img/profileicon/${entry.profileIconId}.png`}
                        alt={`${entry.summonerName} profile icon`}
                        className='h-10 w-10 rounded-full'
                      />
                    </div>
                  </div>
                  <h2 className='text-lg font-bold text-slate-900'>
                    {entry.summonerName}
                  </h2>
                </div>
              </div>

              {/* 티어 */}
              <div className='col-span-1 flex justify-center'>
                <Badge
                  variant='secondary'
                  className='border-purple-200 bg-purple-100 text-purple-800'
                >
                  challenger
                </Badge>
              </div>

              {/* LP */}
              <div className='col-span-1 text-center'>
                {/* <div className='flex items-center gap-1'> */}
                <span className='text-lg font-bold text-slate-900'>
                  {entry.leaguePoints}
                </span>
                {/* <span className='text-xs text-slate-500'>LP</span> */}
                {/* </div> */}
              </div>

              {/* 승률 */}
              <div className='col-span-2 flex items-center justify-center space-x-2'>
                <div className='h-3 w-20 overflow-hidden rounded-full bg-slate-200'>
                  <div
                    className='h-full rounded-full bg-gradient-to-r from-[#8ff4ef] to-[#0aa89a]'
                    style={{
                      width: `${(entry.wins / (entry.wins + entry.losses)) * 100}%`,
                    }}
                  />
                </div>
                <span className='text-sm font-semibold text-slate-700'>
                  {Math.round((entry.wins / (entry.wins + entry.losses)) * 100)}
                  %
                </span>
              </div>

              {/* 레벨 */}
              <div className='col-span-1 text-center'>
                <span className='text-sm font-semibold text-slate-700'>
                  {entry.summonerLevel}
                </span>
              </div>

              {/* 승/패 */}
              <div className='col-span-2 flex justify-center space-x-2'>
                <span className='text-sm font-semibold text-[#5183e3]'>
                  {entry.wins}승
                </span>
                <span className='text-sm font-semibold text-[#e34955]'>
                  {entry.losses}패
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
