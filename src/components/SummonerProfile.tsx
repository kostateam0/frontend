import { motion } from 'framer-motion';
import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
} from '@/lib/framer-animations';
import { Summoner, ChampionMastery } from '@/types/lol';
import { Separator } from '@/components/ui/separator';

interface SummonerProfileProps {
  summoner: Summoner;
  championMasteries?: ChampionMastery[];
}

const SummonerProfile = ({
  summoner,
  championMasteries = [],
}: SummonerProfileProps) => {
  return (
    <motion.div
      variants={staggerContainer}
      initial='hidden'
      animate='visible'
      className='w-full'
    >
      <div className='glass-card overflow-hidden rounded-xl'>
        <div className='p-6 sm:p-8'>
          <div className='flex flex-col items-center gap-6 sm:flex-row sm:items-start'>
            <motion.div variants={fadeIn} className='relative'>
              <div className='h-24 w-24 overflow-hidden rounded-xl border-2 border-white/20 sm:h-32 sm:w-32'>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/profileicon/${summoner.profileIconId}.png`}
                  alt={`${summoner.name}'s profile`}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='bg-lol-blue/90 absolute -right-2 -bottom-2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-white/20 text-xs font-medium text-white'>
                {summoner.summonerLevel}
              </div>
            </motion.div>

            <div className='flex-1 text-center sm:text-left'>
              <motion.span
                variants={staggerItem}
                className='text-lol-blue bg-lol-blue/10 mb-2 inline-block rounded-full px-3 py-1 text-xs font-medium'
              >
                SUMMONER PROFILE
              </motion.span>

              <motion.h1
                variants={staggerItem}
                className='mb-2 text-3xl font-bold sm:text-4xl'
              >
                {summoner.name}
              </motion.h1>

              <motion.div
                variants={staggerItem}
                className='text-muted-foreground mb-4 text-sm'
              >
                Level {summoner.summonerLevel} • Last updated{' '}
                {new Date(summoner.revisionDate).toLocaleDateString()}
              </motion.div>

              <Separator className='my-4' />

              <motion.div
                variants={staggerItem}
                className='flex flex-wrap justify-center gap-4 sm:justify-start'
              >
                <div className='text-center'>
                  <p className='text-xl font-medium'>--</p>
                  <p className='text-muted-foreground text-xs'>Win Rate</p>
                </div>

                <div className='text-center'>
                  <p className='text-xl font-medium'>--</p>
                  <p className='text-muted-foreground text-xs'>Rank</p>
                </div>

                <div className='text-center'>
                  <p className='text-xl font-medium'>--</p>
                  <p className='text-muted-foreground text-xs'>LP</p>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {championMasteries && championMasteries.length > 0 && (
        <motion.div variants={slideUp} className='mt-8'>
          <h2 className='mb-6 text-2xl font-bold'>Champion Masteries</h2>

          <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5'>
            {championMasteries.slice(0, 5).map((mastery) => (
              <div
                key={mastery.championId}
                className='glass-card overflow-hidden rounded-xl p-4 text-center'
              >
                <div className='relative mx-auto mb-3 h-16 w-16'>
                  <img
                    src={`https://ddragon.leagueoflegends.com/cdn/13.7.1/img/champion/${mastery.championId}.png`}
                    alt={`Champion ${mastery.championId}`}
                    className='h-full w-full rounded-full object-cover'
                  />
                  <div className='bg-lol-gold absolute -right-1 -bottom-1 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white/20 text-xs font-medium text-white'>
                    {mastery.championLevel}
                  </div>
                </div>
                <p className='truncate text-sm font-medium'>
                  Champion {mastery.championId}
                </p>
                <p className='text-muted-foreground text-xs'>
                  {mastery.championPoints.toLocaleString()} pts
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default SummonerProfile;
