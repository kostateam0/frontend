import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/framer-animations';

import { Separator } from '@/components/ui/separator';
import SummonerRankTier from '@/components/SummonerRankTier';

interface User {
  name: string;
  profileIconId: number;
  summonerLevel: number;
  revisionDate: number;
  puuid?: string;
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
          <div className='flex flex-col gap-8 sm:flex-row sm:items-center sm:gap-10'>
            {/* 왼쪽: 프로필 이미지 */}
            <motion.div
              variants={fadeIn}
              className='relative mx-auto flex-shrink-0 sm:mx-0'
            >
              <div className='h-32 w-32 overflow-hidden rounded-2xl border-2 border-white/20 bg-slate-900/40 sm:h-40 sm:w-40'>
                <img
                  src={`https://ddragon.leagueoflegends.com/cdn/15.11.1/img/profileicon/${summoner.profileIconId}.png`}
                  alt={`${summoner.name}'s profile`}
                  className='h-full w-full object-cover'
                />
              </div>
              <div className='bg-lol-blue/90 absolute -right-4 -bottom-4 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/20 text-base font-bold text-white shadow-lg'>
                {summoner.summonerLevel}
              </div>
            </motion.div>

            {/* 오른쪽: 닉네임/태그/랭크 */}
            <div className='flex flex-1 flex-col justify-start'>
              <div className='flex flex-col items-center sm:items-start'>
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
              </div>
              <Separator className='my-4' />
              {summoner.puuid && (
                <div className='flex w-full flex-row justify-center gap-8 sm:justify-start'>
                  <SummonerRankTier puuid={summoner.puuid} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SummonerProfile;
