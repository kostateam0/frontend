import React from 'react';
import { useQuery } from '@tanstack/react-query';

type TeamStanding = {
  rank: number;
  name: string;
  wins: number;
  losses: number;
  setWin: number;
  setLose: number;
  winRate: string;
  setDiff: number;
};

const fetchRankings = async (): Promise<TeamStanding[]> => {
  const res = await fetch('http://localhost:4000/api/esports/LCKRankings');
  if (!res.ok) throw new Error('순위 데이터를 불러오지 못했습니다.');
  return res.json();
};

const EsportsRankings: React.FC = () => {
  const {
    data: standings,
    isLoading,
    error,
  } = useQuery<TeamStanding[]>({
    queryKey: ['esportsRankings'],
    queryFn: fetchRankings,
    staleTime: 1000 * 60 * 60 * 24, // 24시간
  });

  if (isLoading)
    return <div className='py-8 text-center text-white'>불러오는 중...</div>;
  if (error)
    return (
      <div className='py-8 text-center text-red-400'>
        순위 데이터를 불러오지 못했습니다.
      </div>
    );
  if (!standings || standings.length === 0)
    return (
      <div className='py-8 text-center text-white'>순위 데이터가 없습니다.</div>
    );

  return (
    <div className='mx-auto min-h-[400px] w-full max-w-2xl rounded-xl bg-[#10193A] p-4 shadow-lg'>
      <h1 className='mb-4 text-2xl font-bold text-[#B6C2E2]'>
        2025 LCK Spring 순위표
      </h1>
      <table className='mx-auto w-full max-w-4xl table-auto border-collapse overflow-hidden rounded-xl bg-[#10193A] text-white'>
        <thead>
          <tr className='bg-[#1A2550] text-sm text-[#B6C2E2]'>
            <th className='px-4 py-3 text-center font-semibold'>Rank</th>
            <th className='px-4 py-3 text-center font-semibold'>Team</th>
            <th className='px-4 py-3 text-center font-semibold'>W-L(%)</th>
            <th className='px-4 py-3 text-center font-semibold'>Set Score</th>
            <th className='px-4 py-3 text-center font-semibold'>Point</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr
              key={team.name}
              className='border-b border-[#23232b] text-base'
              style={{ height: '56px' }}
            >
              <td className='px-4 py-0 text-center align-middle font-bold whitespace-nowrap text-[#b6eaff]'>
                {team.rank}
              </td>
              <td className='px-4 py-0 text-center align-middle whitespace-nowrap'>
                <span className='text-lg font-bold text-white'>
                  {team.name}
                </span>
              </td>
              <td className='px-4 py-0 text-center align-middle whitespace-nowrap'>
                <span className='inline-block font-bold text-white'>
                  {team.wins}W
                </span>
                <span className='mx-1 inline-block font-bold text-[#ff6b81]'>
                  {team.losses}L
                </span>
                <span className='ml-2 inline-block font-semibold text-[#6ee7b7]'>
                  {team.winRate}
                </span>
              </td>
              <td className='px-4 py-0 text-center align-middle whitespace-nowrap'>
                <span className='font-semibold text-white'>
                  {team.setWin}W{' '}
                  <span className='text-[#ff6b81]'>{team.setLose}L</span>
                </span>
              </td>
              <td
                className={`px-4 py-0 text-center align-middle font-bold whitespace-nowrap ${
                  team.setDiff >= 0 ? 'text-[#6ee7b7]' : 'text-[#ff6b81]'
                }`}
              >
                {team.setDiff >= 0 ? `+${team.setDiff}` : team.setDiff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EsportsRankings;
