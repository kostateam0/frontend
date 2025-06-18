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

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4 p-4'>
      {participants.map((p: Participant) => (
        <MatchParticipantCard
          key={p.puuid}
          summonerName={p.summonerName}
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
        />
      ))}
    </div>
  );
};

export default MatchDetail;
