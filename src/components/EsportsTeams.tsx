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
      <div className='flex h-80 items-center justify-center text-lg text-[#B6C2E2]'>
        불러오는 중...
      </div>
    );

  return (
    <div className='mx-auto w-full max-w-2xl'>
      {selectedTeam && (
        <div className='rounded-xl bg-[#10193A] p-8 shadow-lg'>
          {/* 메인 정보 + 드롭다운 한 줄 배치 */}
          <div className='mb-8 flex flex-col gap-4 md:flex-row md:items-center md:gap-8'>
            {/* 팀 이미지/이름 */}
            <div className='flex min-w-0 flex-1 items-center gap-4'>
              {selectedTeam.image_url && (
                <img
                  src={selectedTeam.image_url}
                  alt={selectedTeam.name}
                  className='h-24 w-24 rounded-lg border border-[#23232b] bg-white object-contain'
                />
              )}
              <div className='min-w-0'>
                <h2 className='truncate text-3xl font-extrabold text-white'>
                  {selectedTeam.name}
                </h2>
                <div className='text-xl font-semibold text-[#6ee7b7]'>
                  {selectedTeam.acronym}
                </div>
              </div>
            </div>
            {/* 드롭다운 */}
            <div className='flex flex-col gap-2 md:flex-row md:items-center md:gap-2'>
              <select
                id='league-select'
                className='rounded border border-[#23232b] bg-[#18181c] px-3 py-2 text-[#B6C2E2] focus:outline-none'
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
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <select
                id='team-select'
                className='min-w-[100px] rounded border border-[#23232b] bg-[#18181c] px-3 py-2 text-[#B6C2E2] focus:outline-none'
                value={selectedTeamId ?? ''}
                onChange={(e) => setSelectedTeamId(e.target.value)}
              >
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.acronym || team.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* 로스터 */}
          <h3 className='mb-4 border-b border-[#23232b] pb-2 text-2xl font-bold text-[#B6C2E2]'>
            ROSTER
          </h3>
          <ul className='flex flex-col gap-4'>
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
                .map((player) => (
                  <li
                    key={player.id}
                    className='flex items-center gap-5 rounded bg-[#18181c] px-5 py-4 transition hover:bg-[#23232b]'
                  >
                    {/* 선수 이미지가 없으면 빈 원형 출력 */}
                    {player.image_url ? (
                      <img
                        src={player.image_url}
                        alt={player.name}
                        className='h-14 w-14 rounded-full border border-[#23232b] bg-[#10193A] object-cover'
                      />
                    ) : (
                      <div className='h-14 w-14 rounded-full border border-[#23232b] bg-[#10193A]' />
                    )}
                    <span className='w-36 text-lg font-bold text-white'>
                      {player.name}
                    </span>
                    <span className='w-16 text-base font-semibold text-[#6ee7b7]'>
                      {ROLE_KR[player.role.toLowerCase()] || player.role}
                    </span>
                    <span className='text-base font-medium text-[#B6C2E2]'>
                      {player.first_name} {player.last_name}
                    </span>
                  </li>
                ))
            ) : (
              <li className='text-[#b6c2e2]'>로스터 정보가 없습니다.</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default EsportsTeams;
