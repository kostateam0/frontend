import { motion } from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/framer-animations";
import { Separator } from "@/components/ui/separator";
// import { Match, Participant } from "@/types/lol";
import type { Match, Participant } from "@/types/lol";
import { ArrowRight } from "lucide-react";

interface MatchHistoryProps {
  matches: Match[];
  summonerName: string;
}

const MatchHistoryItem = ({
  match,
  summonerName,
}: {
  match: Match;
  summonerName: string;
}) => {
  // Find the participant that matches the summoner name
  const participant = match.info.participants.find(
    (p) => p.summonerName.toLowerCase() === summonerName.toLowerCase()
  ) as Participant;

  if (!participant) return null;

  const isWin = participant.win;
  const gameDate = new Date(match.info.gameCreation);
  const gameDuration = Math.floor(match.info.gameDuration / 60);
  const kda = `${participant.kills}/${participant.deaths}/${participant.assists}`;
  const kdaRatio = (
    (participant.kills + participant.assists) /
    (participant.deaths || 1)
  ).toFixed(2);

  return (
    <motion.div
      variants={staggerItem}
      className={`glass-card rounded-xl overflow-hidden transition-all border-l-4 ${
        isWin ? "border-l-green-400" : "border-l-red-400"
      }`}
    >
      <div className="p-4 sm:p-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`}
                alt={participant.championName}
                className="w-12 h-12 rounded-full object-cover border-2 border-white/20"
              />
              <div
                className={`absolute -bottom-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-medium ${
                  isWin ? "bg-green-400 text-white" : "bg-red-400 text-white"
                }`}
              >
                {isWin ? "W" : "L"}
              </div>
            </div>

            <div>
              <h3 className="font-medium">{participant.championName}</h3>
              <p className="text-sm text-muted-foreground">
                {match.info.gameMode}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-sm font-medium">{kda}</p>
              <p className="text-xs text-muted-foreground">{kdaRatio} KDA</p>
            </div>

            <Separator
              orientation="vertical"
              className="h-10 hidden sm:block"
            />

            <div className="text-center">
              <p className="text-sm font-medium">
                {participant.totalDamageDealtToChampions.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Damage</p>
            </div>

            <Separator
              orientation="vertical"
              className="h-10 hidden sm:block"
            />

            <div className="text-center">
              <p className="text-sm font-medium">
                {participant.goldEarned.toLocaleString()}
              </p>
              <p className="text-xs text-muted-foreground">Gold</p>
            </div>

            <Separator
              orientation="vertical"
              className="h-10 hidden sm:block"
            />

            <div className="text-center">
              <p className="text-sm font-medium">
                {gameDate.toLocaleDateString()}
              </p>
              <p className="text-xs text-muted-foreground">
                {gameDuration} min
              </p>
            </div>
          </div>

          <button className="hidden sm:flex items-center gap-1 text-sm text-lol-blue hover:underline">
            Details <ArrowRight size={14} />
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-1">
          {[
            participant.item0,
            participant.item1,
            participant.item2,
            participant.item3,
            participant.item4,
            participant.item5,
            participant.item6,
          ]
            .filter(Boolean)
            .map((itemId) => (
              <div
                key={itemId}
                className="w-8 h-8 bg-black/30 rounded overflow-hidden"
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${itemId}.png`}
                  alt={`Item ${itemId}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
        </div>
      </div>
    </motion.div>
  );
};

const MatchHistory = ({ matches = [], summonerName }: MatchHistoryProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="space-y-4"
    >
      <h2 className="text-2xl font-bold mb-6">Match History</h2>

      {matches.length === 0 ? (
        <div className="glass-card rounded-xl p-8 text-center">
          <p className="text-muted-foreground">
            No matches found for this summoner.
          </p>
        </div>
      ) : (
        matches.map((match) => (
          <MatchHistoryItem
            key={match.metadata.matchId}
            match={match}
            summonerName={summonerName}
          />
        ))
      )}
    </motion.div>
  );
};

export default MatchHistory;
