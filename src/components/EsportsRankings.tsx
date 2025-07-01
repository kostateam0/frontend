import React, { useEffect, useState } from 'react';

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

const EsportsRankings: React.FC = () => {
  const [standings, setStandings] = useState<TeamStanding[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStandings = async () => {
      try {
        const res = await fetch(
          'http://localhost:4000/api/esports/LCKRankings',
        );
        const data = await res.json();
        setStandings(data);
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStandings();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className='p-4 bg-[#23232b] min-h-[400px] rounded-xl shadow-lg w-full max-w-4xl mx-auto'>
      <h1 className='mb-4 text-2xl font-bold'>2025 LCK Spring 순위표</h1>
      <table className='w-full table-auto border-collapse overflow-hidden rounded-xl bg-[#23232b] text-white max-w-4xl mx-auto'>
        <thead>
          <tr className='bg-[#292936] text-sm text-gray-300'>
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
              className='border-b border-[#2e2e3a] text-base'
              style={{ height: '56px' }} // 행 높이 고정
            >
              <td className='px-4 py-0 text-center align-middle font-bold whitespace-nowrap text-[#b6eaff]'>
                {team.rank}
              </td>
              <td className='px-4 py-0 text-center align-middle whitespace-nowrap'>
                {/* 팀 로고가 있다면 <img src={team.logo} ... /> 추가 가능 */}
                <span className='text-lg font-bold'>{team.name}</span>
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
                <span className='font-semibold'>
                  {team.setWin}W {team.setLose}L
                </span>
              </td>
              <td
                className={`px-4 py-0 text-center align-middle font-bold whitespace-nowrap ${
                  team.setDiff >= 0 ? 'text-[#6ee7b7]' : 'text-[#ff6b81]'
                }`}
              >
                {team.setDiff}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EsportsRankings;
