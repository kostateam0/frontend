
interface Props {
  summonerName: string;
  riotId: string;
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealtToChampions: number;
  teamPosition: string;
  win: boolean;
  itemIds: number[];
  summonerLevel: number;
  cs: number;
  timePlayed: number;
  spell1Id: number;
  spell2Id: number;
  isMe: boolean;
  opponentName?: string;
  teamId: number; // ✅ 반드시 있어야 함
}


const getSpellImage = (id: number) => {
  const spellMap: Record<number, string> = {
    4: "SummonerFlash",
    14: "SummonerDot",
    7: "SummonerHeal",
    11: "SummonerSmite",
    3: "SummonerExhaust",
    21: "SummonerBarrier",
    6: "SummonerHaste",
    12: "SummonerTeleport",
    1: "SummonerBoost",
  };
  const name = spellMap[id];
  return name ? `https://ddragon.leagueoflegends.com/cdn/15.11.1/img/spell/${name}.png` : '';
};

const MatchParticipantCard = ({
  summonerName,
  riotId,
  championName,
  kills,
  deaths,
  assists,
  totalDamageDealtToChampions,
  // teamPosition,
  win,
  itemIds,
  summonerLevel,
  cs,
  timePlayed,
  spell1Id,
  spell2Id,
  isMe,
  // opponentName,
}: Props) => {
  const csPerMin = (cs / (timePlayed / 60)).toFixed(1);
  const kda = deaths === 0 ? 'Perfect' : ((kills + assists) / deaths).toFixed(2);
  const colorClass = win ? 'bg-blue-50 border-l-4 border-blue-300' : 'bg-red-50 border-l-4 border-red-300';

  return (
    <div className={`w-full rounded-md p-3 text-xs sm:text-sm flex flex-col gap-2 ${colorClass} ${isMe ? 'ring-2 ring-yellow-400' : ''}`}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <img
            src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${championName}.png`}
            className="w-10 h-10 rounded"
            alt={championName}
          />
          <div className="flex flex-col min-w-0">
            <div className="font-semibold truncate">{summonerName}</div>
            <div className="text-[11px] text-gray-400 truncate">{riotId}</div> {/* ✅ Riot ID 출력 추가 */}
            <div className="text-gray-500 text-xs">
              {kills}/{deaths}/{assists} | KDA {kda}
            </div>
            <div className="text-gray-400 text-[11px]">
              CS {cs} ({csPerMin}/분), 레벨 {summonerLevel}
            </div>
            <div className="text-gray-400 text-[11px]">
              딜량 {totalDamageDealtToChampions.toLocaleString()} 
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {spell1Id && <img src={getSpellImage(spell1Id)} className="w-5 h-5" alt="spell1" />}
          {spell2Id && <img src={getSpellImage(spell2Id)} className="w-5 h-5" alt="spell2" />}
        </div>
      </div>

      <div className="flex flex-wrap gap-1 mt-1">
        {itemIds.map((id, i) =>
          id ? (
            <img
              key={i}
              src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/item/${id}.png`}
              className="w-6 h-6"
              alt={`item-${id}`}
            />
          ) : (
            <div key={i} className="w-6 h-6 bg-gray-200 rounded" />
          )
        )}
      </div>
    </div>
  );
};

export default MatchParticipantCard;
