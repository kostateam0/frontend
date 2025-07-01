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

  if (loading) return <div className='text-white'>Loading...</div>;

  // 팀을 2~3줄로 자동 분할 (최대 6개씩 한 줄, 13개면 5/4/4)
  const maxPerRow =
    teams.length > 12 ? 6 : teams.length > 8 ? 5 : Math.ceil(teams.length / 2);
  const rows: Team[][] = [];
  for (let i = 0; i < teams.length; i += maxPerRow) {
    rows.push(teams.slice(i, i + maxPerRow));
  }

  return (
    <div className='mx-auto mb-4 min-h-[600px] w-full max-w-4xl rounded-xl bg-[#23232b] p-4 shadow-lg'>
      <div className='mb-6 flex items-center gap-3'>
        <label htmlFor='series-select' className='font-semibold text-gray-200'>
          리그 선택:
        </label>
        <select
          id='series-select'
          className='rounded border border-[#444] bg-[#292936] px-2 py-1 text-gray-200 focus:outline-none'
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
      <div className='mx-auto w-full max-w-4xl rounded-xl border border-[#292936] bg-[#23232b] p-4 shadow-inner'>
        {/* 네비게이션(2~3줄 반응형) + 로스터 통합 */}
        <div className='flex flex-col gap-4'>
          {/* 팀 네비게이션 여러 줄 */}
          <div className='flex w-full flex-col items-center justify-center gap-1'>
            {rows.map((row, rowIdx) => (
              <div
                key={rowIdx}
                className='flex w-full flex-row flex-nowrap items-center justify-center'
              >
                {row.map((team, idx) => (
                  <div
                    key={team.id}
                    className={`flex cursor-pointer items-center gap-2 rounded-lg px-4 py-2 whitespace-nowrap transition select-none ${
                      selectedTeamId === team.id
                        ? 'bg-[#292936] font-bold text-[#6ee7b7]'
                        : 'text-gray-400 hover:bg-[#232340] hover:text-[#b6eaff]'
                    }`}
                    style={{
                      minWidth: 90,
                      maxWidth: 140,
                      borderRight:
                        idx !== row.length - 1 ? '1px solid #363646' : 'none',
                    }}
                    onClick={() => setSelectedTeamId(team.id)}
                  >
                    {team.image_url && (
                      <img
                        src={team.image_url}
                        alt={team.name}
                        className='h-6 w-6 rounded border border-[#363646] bg-[#18181c] object-contain'
                      />
                    )}
                    <span className='text-base'>
                      {team.acronym || team.name}
                    </span>
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
                    className='h-16 w-16 rounded-lg border border-[#363646] bg-[#18181c] object-contain'
                  />
                )}
                <h2 className='text-2xl font-bold text-white'>
                  {selectedTeam.name}
                </h2>
              </div>
              <h3 className='mb-2 text-lg font-semibold text-[#6ee7b7]'>
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
                        className='flex items-center gap-3 rounded-xl border border-[#292936] bg-[#292936] p-3 shadow'
                      >
                        {player.image_url && (
                          <img
                            src={player.image_url}
                            alt={player.name}
                            className='h-10 w-10 rounded-full border border-[#363646] bg-[#18181c] object-cover'
                          />
                        )}
                        <div>
                          <div className='font-bold text-white'>
                            {player.name}
                          </div>
                          <div className='text-sm text-gray-400 capitalize'>
                            {player.role}
                          </div>
                        </div>
                      </li>
                    ))
                ) : (
                  <li className='text-gray-400'>로스터 정보가 없습니다.</li>
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
