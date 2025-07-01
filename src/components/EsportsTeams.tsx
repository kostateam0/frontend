import React, { useEffect, useState } from 'react';

interface Team {
  id: number;
  name: string;
  acronym: string;
  image_url: string;
  players: Player[];
}

interface Player {
  id: number;
  first_name: string;
  last_name: string;
  role: string;
  image_url: string;
  name: string;
}

const SERIES_OPTIONS = [
  { label: 'LCK', value: 9164 },
  { label: 'LPL', value: 9152 },
  { label: 'MSI', value: 9418 },
];

const EsportsTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [seriesId, setSeriesId] = useState<number>(9164); // default LCK

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:4000/api/esports/teams?seriesId=${seriesId}`,
        );
        const data = await res.json();
        setTeams(data);
        if (data.length > 0) {
          setSelectedTeamId(data[0].id);
        } else {
          setSelectedTeamId(null);
        }
      } catch (error: any) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [seriesId]);

  const selectedTeam = teams.find((t) => t.id === selectedTeamId);

  if (loading) return <div>Loading...</div>;

  // 팀을 두 줄로 나누기
  const half = Math.ceil(teams.length / 2);
  const firstRow = teams.slice(0, half);
  const secondRow = teams.slice(half);

  return (
    <div className='p-4'>
      <div className='mb-4 flex items-center gap-3'>
        <label htmlFor='series-select' className='font-semibold text-gray-700'>
          리그 선택:
        </label>
        <select
          id='series-select'
          className='rounded border px-2 py-1 text-gray-700'
          value={seriesId}
          onChange={(e) => setSeriesId(Number(e.target.value))}
        >
          {SERIES_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </div>
      <div className='rounded-xl border border-gray-200 bg-white/90 p-4 shadow'>
        {/* 네비게이션(두 줄) + 로스터 통합 */}
        <div className='flex flex-col gap-4'>
          {/* 팀 네비게이션 두 줄 */}
          <div className='flex w-full flex-col items-center justify-center gap-1'>
            {[firstRow, secondRow].map((row, rowIdx) => (
              <div
                key={rowIdx}
                className='flex w-full flex-row flex-nowrap items-center justify-center'
              >
                {row.map((team, idx) => (
                  <div
                    key={team.id}
                    className={`flex cursor-pointer items-center gap-2 px-3 py-1 whitespace-nowrap transition select-none ${selectedTeamId === team.id ? 'font-bold text-blue-700' : 'text-gray-500 hover:text-blue-500'} `}
                    style={{
                      minWidth: 80,
                      maxWidth: 120,
                      borderRight:
                        idx !== row.length - 1 ? '1px solid #e5e7eb' : 'none',
                    }}
                    onClick={() => setSelectedTeamId(team.id)}
                  >
                    {team.image_url && (
                      <img
                        src={team.image_url}
                        alt={team.name}
                        className='h-5 w-5 rounded object-contain'
                      />
                    )}
                    {team.acronym || team.name}
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* 선택된 팀 정보 및 로스터 */}
          {selectedTeam && (
            <div className='pt-6'>
              <div className='mb-4 flex items-center gap-4'>
                {selectedTeam.image_url && (
                  <img
                    src={selectedTeam.image_url}
                    alt={selectedTeam.name}
                    className='h-16 w-16 rounded-lg border border-gray-200 bg-white object-contain'
                  />
                )}
                <h2 className='text-xl font-bold text-gray-800'>
                  {selectedTeam.name}
                </h2>
              </div>
              <h3 className='mb-2 text-lg font-semibold text-blue-600'>
                ROSTER
              </h3>
              <ul className='grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3'>
                {selectedTeam.players && selectedTeam.players.length > 0 ? (
                  [...selectedTeam.players]
                    .sort((a, b) => {
                      const order = ['top', 'jun', 'mid', 'adc', 'sup'];
                      const aIdx = order.indexOf(a.role.toLowerCase());
                      const bIdx = order.indexOf(b.role.toLowerCase());
                      if (aIdx === -1 && bIdx === -1) return 0;
                      if (aIdx === -1) return 1;
                      if (bIdx === -1) return -1;
                      return aIdx - bIdx;
                    })
                    .map((player) => (
                      <li
                        key={player.id}
                        className='flex items-center gap-3 rounded-xl border bg-white p-3 shadow'
                      >
                        {player.image_url && (
                          <img
                            src={player.image_url}
                            alt={player.name}
                            className='h-10 w-10 rounded-full border border-gray-200 bg-gray-50 object-cover'
                          />
                        )}
                        <div>
                          <div className='font-bold text-gray-800'>
                            {player.name}
                          </div>
                          <div className='text-sm text-gray-500 capitalize'>
                            {player.role}
                          </div>
                        </div>
                      </li>
                    ))
                ) : (
                  <li>로스터 정보가 없습니다.</li>
                )}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EsportsTeams;
