import type React from 'react';
import { useEffect, useState } from 'react';

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

const LEAGUE_OPTIONS = [
  { label: 'LCK', value: 'LCK', season: '2025 Spring' },
  { label: 'LPL', value: 'LPL', season: '2025 Spring' },
  { label: 'MSI', value: 'MSI', season: '2025' },
];

const ROLE_KR: Record<string, string> = {
  top: '탑',
  jun: '정글',
  jungle: '정글',
  mid: '미드',
  adc: '원딜',
  bot: '원딜',
  sup: '서폿',
  support: '서폿',
};

const EsportsTeams: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [selectedTeamId, setSelectedTeamId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [league, setLeague] = useState<string>('LCK');
  const [season, setSeason] = useState<string>('2025 Spring');

  useEffect(() => {
    const fetchTeams = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:4000/api/esports/roster?league=${encodeURIComponent(league)}&season=${encodeURIComponent(season)}`,
        );
        if (!res.ok) throw new Error('로스터 데이터를 불러오지 못했습니다.');
        const data = await res.json();
        setTeams(data);
        if (data.length > 0) {
          setSelectedTeamId(data[0].id?.toString() ?? null);
        } else {
          setSelectedTeamId(null);
        }
      } catch (error: any) {
        setTeams([]);
        setSelectedTeamId(null);
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchTeams();
  }, [league, season]);

  const selectedTeam = teams.find((t) => t.id?.toString() === selectedTeamId);

  if (loading)
    return (
      <div className='flex h-80 items-center justify-center'>
        <div className='h-12 w-12 animate-spin rounded-full border-b-2 border-emerald-400'></div>
        <span className='ml-4 text-lg text-slate-300'>불러오는 중...</span>
      </div>
    );

  return (
    <div className='relative mx-auto min-h-[400px] w-full max-w-2xl overflow-hidden rounded-xl bg-[#10193A] p-4 shadow-lg'>
      {/* 바깥쪽 배경 그라데이션 오버레이 */}
      <div className='pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-br from-emerald-600/10 via-amber-600/5 to-green-600/10'></div>
      {selectedTeam && (
        <div className='relative z-10 p-6 sm:p-8'>
          {/* 메인 정보 + 드롭다운 */}
          <div className='mb-8 flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-8'>
            {/* 팀 이미지/이름 */}
            <div className='flex min-w-0 flex-1 items-center gap-6'>
              {selectedTeam.image_url && (
                <div className='relative flex-shrink-0'>
                  <div className='absolute inset-0 rounded-2xl bg-gradient-to-r from-emerald-500 to-amber-500 opacity-75 blur'></div>
                  <img
                    src={selectedTeam.image_url || '/placeholder.svg'}
                    alt={selectedTeam.name}
                    className='relative h-32 w-32 rounded-2xl bg-slate-800/50 object-contain backdrop-blur-sm'
                  />
                </div>
              )}
              <div className='min-w-0 flex-1'>
                <h2 className='bg-gradient-to-r from-white via-slate-200 to-slate-300 bg-clip-text text-2xl font-bold break-words text-transparent sm:text-3xl'>
                  {selectedTeam.name}
                </h2>
                <div className='bg-gradient-to-r from-emerald-400 to-amber-400 bg-clip-text text-lg font-semibold text-transparent sm:text-xl'>
                  {selectedTeam.acronym}
                </div>
              </div>
            </div>

            {/* 드롭다운 */}
            <div className='flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-3 lg:flex-shrink-0'>
              <select
                id='league-select'
                className='rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-slate-200 backdrop-blur-sm transition-all duration-200 focus:border-emerald-400/50 focus:ring-emerald-400/50 focus:outline-none'
                value={league}
                onChange={(e) => {
                  const selected = LEAGUE_OPTIONS.find(
                    (opt) => opt.value === e.target.value,
                  );
                  setLeague(selected?.value || 'LCK');
                  setSeason(selected?.season || '2025 Spring');
                }}
              >
                {LEAGUE_OPTIONS.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    className='bg-slate-800'
                  >
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                id='team-select'
                className='min-w-[120px] rounded-xl border border-slate-600/50 bg-slate-800/50 px-4 py-3 text-slate-200 backdrop-blur-sm transition-all duration-200 focus:border-emerald-400/50 focus:ring-emerald-400/50 focus:outline-none'
                value={selectedTeamId ?? ''}
                onChange={(e) => setSelectedTeamId(e.target.value)}
              >
                {teams.map((team) => (
                  <option
                    key={team.id}
                    value={team.id}
                    className='bg-slate-800'
                  >
                    {team.acronym || team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 로스터 */}
          <div className='relative'>
            <h3 className='mb-6 flex items-center gap-3 text-2xl font-bold text-slate-200'>
              <div className='h-8 w-1 rounded-full bg-gradient-to-b from-emerald-500 to-amber-500'></div>
              ROSTER
            </h3>

            {selectedTeam.image_url && (
              <div
                className='pointer-events-none absolute top-4 right-8 h-80 w-80 opacity-8'
                style={{
                  backgroundImage: `url(${selectedTeam.image_url})`,
                  backgroundSize: 'contain',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  filter: 'grayscale(100%)',
                }}
              ></div>
            )}

            <ul className='relative z-10 flex flex-col gap-3'>
              {selectedTeam.players && selectedTeam.players.length > 0 ? (
                [...selectedTeam.players]
                  .sort((a, b) => {
                    const order = [
                      'top',
                      'jun',
                      'jungle',
                      'mid',
                      'adc',
                      'bot',
                      'sup',
                      'support',
                    ];
                    const aIdx = order.indexOf(a.role.toLowerCase());
                    const bIdx = order.indexOf(b.role.toLowerCase());
                    if (aIdx === -1 && bIdx === -1) return 0;
                    if (aIdx === -1) return 1;
                    if (bIdx === -1) return -1;
                    return aIdx - bIdx;
                  })
                  .map((player, index) => (
                    <li
                      key={player.id}
                      className='group flex items-center gap-5 rounded-2xl border-slate-700/30 bg-slate-800/30 px-6 py-5 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-slate-600/50 hover:bg-slate-700/40 hover:shadow-emerald-500/10'
                      style={{
                        animationDelay: `${index * 100}ms`,
                      }}
                    >
                      {/* 선수 이미지 */}
                      <div className='relative flex-shrink-0'>
                        {player.image_url ? (
                          <>
                            <div className='absolute inset-0 rounded-full bg-gradient-to-r from-emerald-400/20 to-amber-500/20 blur transition-all duration-300 group-hover:blur-md'></div>
                            <img
                              src={player.image_url || '/placeholder.svg'}
                              alt={player.name}
                              className='relative h-20 w-20 rounded-full border-slate-600/50 bg-slate-800/50 object-cover transition-all duration-300 group-hover:border-emerald-400/50'
                            />
                          </>
                        ) : (
                          <div className='flex h-20 w-20 items-center justify-center rounded-full border-slate-600/50 bg-gradient-to-br from-slate-700/50 to-slate-800/50'>
                            <div className='h-10 w-10 rounded-full bg-slate-600/30'></div>
                          </div>
                        )}
                      </div>

                      <div className='flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-6'>
                        <div className='flex min-w-0 flex-col gap-2 sm:flex-row sm:items-center sm:gap-6'>
                          <div className='flex w-full min-w-0 flex-row items-center justify-between gap-4'>
                            <span className='truncate text-lg font-bold text-white transition-colors duration-300 group-hover:text-emerald-300'>
                              {player.name}
                            </span>
                            <span className='w-16 flex-shrink-0 border border-emerald-500/30 bg-gradient-to-r from-emerald-500/20 to-amber-500/20 px-3 py-1 text-center text-sm font-semibold text-emerald-300'>
                              {ROLE_KR[player.role.toLowerCase()] ||
                                player.role}
                            </span>
                          </div>
                        </div>
                        <span className='text-sm font-medium text-slate-400 transition-colors duration-300 group-hover:text-slate-300 sm:text-base'>
                          {player.first_name} {player.last_name}
                        </span>
                      </div>
                    </li>
                  ))
              ) : (
                <li className='rounded-2xl border border-slate-700/30 bg-slate-800/20 py-8 text-center text-slate-400'>
                  로스터 정보가 없습니다.
                </li>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default EsportsTeams;
