import { motion } from 'framer-motion';
import { staggerContainer, staggerItem } from '@/lib/framer-animations';
import { Separator } from '@/components/ui/separator';
// import { Match, Participant } from "@/types/lol";
import type { Match, Participant } from '@/types/lol';
import { ArrowRight } from 'lucide-react';

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
    (p) => p.summonerName.toLowerCase() === summonerName.toLowerCase(),
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
      className={`glass-card overflow-hidden rounded-xl border-l-4 transition-all ${
        isWin ? 'border-l-green-400' : 'border-l-red-400'
      }`}
    >
      <div className='p-4 sm:p-5'>
        <div className='flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center'>
          <div className='flex items-center gap-4'>
            <div className='relative'>
              <img
                src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${participant.championName}.png`}
                alt={participant.championName}
                className='h-12 w-12 rounded-full border-2 border-white/20 object-cover'
              />
              <div
                className={`absolute -right-1 -bottom-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium ${
                  isWin ? 'bg-green-400 text-white' : 'bg-red-400 text-white'
                }`}
              >
                {isWin ? 'W' : 'L'}
              </div>
            </div>

            <div>
              <h3 className='font-medium'>{participant.championName}</h3>
              <p className='text-muted-foreground text-sm'>
                {match.info.gameMode}
              </p>
            </div>
          </div>

          <div className='flex items-center gap-6'>
            <div className='text-center'>
              <p className='text-sm font-medium'>{kda}</p>
              <p className='text-muted-foreground text-xs'>{kdaRatio} KDA</p>
            </div>

            <Separator
              orientation='vertical'
              className='hidden h-10 sm:block'
            />

            <div className='text-center'>
              <p className='text-sm font-medium'>
                {participant.totalDamageDealtToChampions.toLocaleString()}
              </p>
              <p className='text-muted-foreground text-xs'>Damage</p>
            </div>

            <Separator
              orientation='vertical'
              className='hidden h-10 sm:block'
            />

            <div className='text-center'>
              <p className='text-sm font-medium'>
                {participant.goldEarned.toLocaleString()}
              </p>
              <p className='text-muted-foreground text-xs'>Gold</p>
            </div>

            <Separator
              orientation='vertical'
              className='hidden h-10 sm:block'
            />

            <div className='text-center'>
              <p className='text-sm font-medium'>
                {gameDate.toLocaleDateString()}
              </p>
              <p className='text-muted-foreground text-xs'>
                {gameDuration} min
              </p>
            </div>
          </div>

          <button className='text-lol-blue hidden items-center gap-1 text-sm hover:underline sm:flex'>
            Details <ArrowRight size={14} />
          </button>
        </div>

        <div className='mt-4 flex flex-wrap gap-1'>
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
                className='h-8 w-8 overflow-hidden rounded bg-black/30'
              >
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/item/${itemId}.png`}
                  alt={`Item ${itemId}`}
                  className='h-full w-full object-cover'
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
      initial='hidden'
      animate='visible'
      className='space-y-4'
    >
      <h2 className='mb-6 text-2xl font-bold'>Match History</h2>

      {matches.length === 0 ? (
        <div className='glass-card rounded-xl p-8 text-center'>
          <p className='text-muted-foreground'>
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
