import { motion } from "framer-motion";
import { fadeIn, staggerContainer, staggerItem } from "@/lib/framer-animations";

import { Separator } from "@/components/ui/separator";

interface User {
  name: string;
  profileIconId: number;
  summonerLevel: number;
  revisionDate: number;
}

interface SummonerProfileProps {
  summoner: User;
  summonerName: string;
  tag: string;
}

const SummonerProfile = ({
  summoner,
  summonerName,
  tag,
}: SummonerProfileProps) => {
  if (!summoner) return <div>소환사 정보가 없습니다.</div>;
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
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/profileicon/${summoner.profileIconId}.png`}
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
                {summonerName}#{tag}
              </motion.span>

              <motion.h1
                variants={staggerItem}
                className='mb-2 text-3xl font-bold sm:text-4xl'
              >
                {summonerName}#{tag}
              </motion.h1>

              <Separator className="my-4" />

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
    </motion.div>
  );
};

export default SummonerProfile;
