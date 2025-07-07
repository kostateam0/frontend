import React from 'react';
import { useQuery } from '@tanstack/react-query';

// API 데이터 타입에 맞게 타입 정의
type Opponent = {
  type: string;
  opponent: {
    id: number;
    name: string;
    acronym: string;
    image_url: string;
  };
};

type Result = {
  team_id: number;
  score: number;
};

type League = {
  name: string;
};

type MatchResult = {
  id: number;
  name: string;
  league: League;
  opponents: Opponent[];
  results: Result[];
  begin_at: string;
  status: string;
};

const fetchGameResults = async (): Promise<MatchResult[]> => {
  const res = await fetch('http://localhost:4000/api/esports/gameResults');
  if (!res.ok) throw new Error('경기 결과를 불러오지 못했습니다.');
  return res.json();
};

const EsportsResults: React.FC = () => {
  const { data, isLoading, error } = useQuery<MatchResult[]>({
    queryKey: ['esportsResults'],
    queryFn: fetchGameResults,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  if (isLoading)
    return <div className='py-8 text-center text-white'>불러오는 중...</div>;
  if (error)
    return (
      <div className='py-8 text-center text-red-400'>
        경기 결과를 불러오지 못했습니다.
      </div>
    );
  if (!data || data.length === 0)
    return (
      <div className='py-8 text-center text-white'>경기 결과가 없습니다.</div>
    );

  return (
    <div className='mx-auto flex w-full max-w-2xl flex-col gap-4'>
      {data.map((match) => {
        // opponents, results가 정상적으로 2개씩 있는지 확인
        if (
          !match.opponents ||
          match.opponents.length !== 2 ||
          !match.results ||
          match.results.length !== 2
        ) {
          console.warn('잘못된 match 데이터:', match);
          return null;
        }
        const left = match.opponents[0].opponent;
        const right = match.opponents[1].opponent;
        // results 배열에서 team_id로 점수 매칭
        const leftScore =
          match.results.find((r) => r.team_id === left.id)?.score ?? 0;
        const rightScore =
          match.results.find((r) => r.team_id === right.id)?.score ?? 0;
        return (
          <div
            key={match.id}
            className='flex flex-col rounded-2xl border border-[#1A2550] bg-[#10193A] px-6 py-4 shadow-lg'
          >
            <div className='mb-2 text-sm font-bold text-[#B6C2E2]'>
              {match.name} | {match.league?.name}
            </div>
            <div className='flex items-center justify-between'>
              {/* Left Team */}
              <div className='flex min-w-[80px] items-center gap-2'>
                <img
                  src={left.image_url}
                  alt={left.acronym}
                  className='h-10 w-10 object-contain'
                  loading='lazy'
                />
                <span className='text-lg font-semibold text-white'>
                  {left.acronym}
                </span>
              </div>
              {/* Score */}
              <div className='flex items-center gap-2'>
                <span className='text-2xl font-bold text-white'>
                  {leftScore}
                </span>
                <span className='mx-1 text-2xl font-bold text-[#B6C2E2]'>
                  VS
                </span>
                <span className='text-2xl font-bold text-white'>
                  {rightScore}
                </span>
              </div>
              {/* Right Team */}
              <div className='flex min-w-[80px] items-center justify-end gap-2'>
                <span className='text-lg font-semibold text-white'>
                  {right.acronym}
                </span>
                <img
                  src={right.image_url}
                  alt={right.acronym}
                  className='h-10 w-10 object-contain'
                  loading='lazy'
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default EsportsResults;
