const getSpellImage = (id: number) => {
  const spellMap: Record<number, string> = {
    4: "SummonerFlash",
    14: "SummonerDot",
    7: "SummonerHeal",
    11: "SummonerSmite",
    // 필요한 스펠 추가 가능
  };
  const name = spellMap[id];
  return name ? `https://ddragon.leagueoflegends.com/cdn/15.11.1/img/spell/${name}.png` : '';
};

const MatchParticipantCard = ({
  summonerName = 'Unknown',
  championName = 'Aatrox',
  kills = 0,
  deaths = 0,
  assists = 0,
  totalDamageDealtToChampions = 0,
  teamPosition = '',
  win = false,
  itemIds = [],
  summonerLevel = 0,
  cs = 0,
  timePlayed = 1,
  spell1Id,
  spell2Id,
  isMe = false,
}: any) => {
  const csPerMin = (cs / (timePlayed / 60)).toFixed(1);

  return (
    <div className={`rounded-lg p-4 ${win ? 'border-l-4 border-green-400' : 'border-l-4 border-red-400'} ${isMe ? 'bg-yellow-50' : ''}`}>
      <div className="flex items-center gap-4">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${championName}.png`}
          className="w-12 h-12"
          alt={championName}
        />
        <div>
          <p className="font-bold">{summonerName}</p>
          <p className="text-sm text-gray-500">{kills}/{deaths}/{assists} | 딜: {totalDamageDealtToChampions}</p>
          <p className="text-xs text-gray-400">CS {cs} ({csPerMin}/분)</p>
        </div>
        <div className="flex flex-col gap-1">
          {spell1Id && <img src={getSpellImage(spell1Id)} className="w-6 h-6" alt="spell1" />}
          {spell2Id && <img src={getSpellImage(spell2Id)} className="w-6 h-6" alt="spell2" />}
        </div>
      </div>

      <div className="flex gap-1 mt-2">
        {itemIds && itemIds.length > 0 ? (
          itemIds.map((id: number, i: number) =>
            id ? (
              <img
                key={i}
                src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${id}.png`}
                className="w-6 h-6"
                alt={`item-${id}`}
              />
            ) : (
              <div key={i} className="w-6 h-6 bg-gray-300 rounded" />
            )
          )
        ) : (
          <div className="text-sm text-gray-400">아이템 없음</div>
        )}
      </div>
    </div>
  );
};

export default MatchParticipantCard;
