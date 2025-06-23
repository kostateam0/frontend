import React from 'react';
import MatchParticipantCard from './MatchParticipantCard';
import type { Participant } from '@/types/Participant';

interface MatchDetailProps {
  data: {
    user: { puuid: string };
    match: {
      info: {
        participants: Participant[];
      };
    };
  };
}

const MatchDetail = ({ data }: MatchDetailProps) => {
  const { puuid } = data.user;
  const participants = data.match.info.participants;

  const me = participants.find((p) => p.puuid === puuid);
  if (!me) return <div>내 정보를 찾을 수 없습니다.</div>;

  const redTeam = participants.filter((p) => p.teamId === 200);
  const blueTeam = participants.filter((p) => p.teamId === 100);

  const isMeBlue = me.teamId === 100;

  const myTeam = isMeBlue ? blueTeam : redTeam;
  const enemyTeam = isMeBlue ? redTeam : blueTeam;

  const createTeamMap = (team: Participant[]) => {
    const map: Record<string, Participant> = {};
    for (const p of team) {
      if (p.teamPosition) {
        map[p.teamPosition] = p;
      }
    }
    return map;
  };

  const myMap = createTeamMap(myTeam);
  const enemyMap = createTeamMap(enemyTeam);

  const getOpponent = (teamPosition: string): string | undefined => {
    const opponent = enemyMap[teamPosition];
    if (!opponent) return undefined;
    return opponent.riotIdGameName && opponent.riotIdTagline
      ? `${opponent.riotIdGameName}#${opponent.riotIdTagline}`
      : opponent.summonerName;
  };

  return (
    <div className="min-h-screen p-6 bg-white font-sans">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* 왼쪽: 내 팀 */}
        <div className="flex flex-col gap-4">
          <p className={`text-center text-xl font-bold rounded-full py-2 ${
            isMeBlue ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'
          }`}>
            {isMeBlue ? '블루팀' : '레드팀'}
          </p>
          {myTeam.map((p) => {
            const riotId = p.riotIdGameName && p.riotIdTagline
              ? `${p.riotIdGameName}#${p.riotIdTagline}`
              : p.summonerName;

            return (
              <div className="shadow-lg rounded-lg bg-gray-50 p-2">
                <MatchParticipantCard
                  key={p.puuid}
                  summonerName={p.summonerName}
                  riotId={riotId}
                  championName={p.championName}
                  kills={p.kills}
                  deaths={p.deaths}
                  assists={p.assists}
                  totalDamageDealtToChampions={p.totalDamageDealtToChampions}
                  teamPosition={p.teamPosition}
                  win={p.win}
                  itemIds={[p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6]}
                  summonerLevel={p.summonerLevel}
                  cs={p.totalMinionsKilled + p.neutralMinionsKilled}
                  timePlayed={p.timePlayed}
                  spell1Id={p.summoner1Id}
                  spell2Id={p.summoner2Id}
                  isMe={p.puuid === puuid}
                  teamId={p.teamId}
                  opponentName={getOpponent(p.teamPosition)}
                />
              </div>
            );
          })}
        </div>

        {/* 오른쪽: 상대 팀 */}
        <div className="flex flex-col gap-4">
          <p className={`text-center text-xl font-bold rounded-full py-2 ${
            isMeBlue ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
          }`}>
            {isMeBlue ? '레드팀' : '블루팀'}
          </p>
          {enemyTeam.map((p) => {
            const riotId = p.riotIdGameName && p.riotIdTagline
              ? `${p.riotIdGameName}#${p.riotIdTagline}`
              : p.summonerName;

            return (
              <div className="shadow-lg rounded-lg bg-gray-50 p-2">
                <MatchParticipantCard
                  key={p.puuid}
                  summonerName={p.summonerName}
                  riotId={riotId}
                  championName={p.championName}
                  kills={p.kills}
                  deaths={p.deaths}
                  assists={p.assists}
                  totalDamageDealtToChampions={p.totalDamageDealtToChampions}
                  teamPosition={p.teamPosition}
                  win={p.win}
                  itemIds={[p.item0, p.item1, p.item2, p.item3, p.item4, p.item5, p.item6]}
                  summonerLevel={p.summonerLevel}
                  cs={p.totalMinionsKilled + p.neutralMinionsKilled}
                  timePlayed={p.timePlayed}
                  spell1Id={p.summoner1Id}
                  spell2Id={p.summoner2Id}
                  isMe={p.puuid === puuid}
                  teamId={p.teamId}
                  opponentName={getOpponent(p.teamPosition)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MatchDetail;
