import { motion } from 'framer-motion';
import { fadeIn } from '@/lib/framer-animations';

const MatchSummaryCard = ({ match, onClick }: { match: any; onClick: () => void }) => {
  if (!match?.info || !match?.info?.participants) {
    return (
      <div className="p-4 bg-red-100 rounded-md">
        <p className="text-red-600 font-semibold">유저 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const me = match.info.participants.find(
    (p: any) =>
      p.summonerName?.toLowerCase() === match.summonerName?.toLowerCase() ||
      p.puuid === match.puuid
  );

  if (!me) {
    return (
      <div className="p-4 bg-red-100 rounded-md">
        <p className="text-red-600 font-semibold">유저 정보를 찾을 수 없습니다.</p>
      </div>
    );
  }

  const cs = me.totalMinionsKilled + me.neutralMinionsKilled;
  const gameMinutes = Math.round(match.info.gameDuration / 60);
  const resultColor = me.win ? 'bg-blue-100' : 'bg-red-100';
  const riotId = me.riotIdGameName && me.riotIdTagline
    ? `${me.riotIdGameName}#${me.riotIdTagline}`
    : match.summonerName || '알 수 없음';

  return (
    <motion.div
      variants={fadeIn}
      onClick={onClick}
      className={`cursor-pointer flex items-center justify-between ${resultColor} rounded-md p-4 transition hover:shadow-lg`}
    >
      <div className="flex items-center gap-4">
        <img
          src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/champion/${me.championName}.png`}
          alt={me.championName}
          className="w-12 h-12 rounded-md"
        />
        <div>
          <p className="font-semibold">{riotId}</p>
          <p className="text-sm text-gray-600">{me.championName}</p>
          <p className="text-sm text-gray-600">
            {me.kills} / {me.deaths} / {me.assists}
          </p>
        </div>
      </div>
      <div className="text-right text-sm text-gray-700">
        <p>{cs} CS</p>
        <p>{gameMinutes}분 경기</p>
      </div>
    </motion.div>
  );
};

export default MatchSummaryCard;
