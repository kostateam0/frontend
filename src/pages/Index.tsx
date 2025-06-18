import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/framer-animations';
import AnimatedBackground from '@/components/AnimatedBackground';
import SummonerSearch from '@/components/SummonerSearch';
import Navbar from '@/components/Navbar';
import ChampionCard from '@/components/ChampionCard';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

// Sample champion data for the homepage
const featuredChampions = [
  {
    id: 'Ahri',
    name: 'Ahri',
    title: 'the Nine-Tailed Fox',
    tags: ['Mage', 'Assassin'],
  },
  {
    id: 'Yasuo',
    name: 'Yasuo',
    title: 'the Unforgiven',
    tags: ['Fighter', 'Assassin'],
  },
  {
    id: 'Jinx',
    name: 'Jinx',
    title: 'the Loose Cannon',
    tags: ['Marksman'],
  },
  {
    id: 'Thresh',
    name: 'Thresh',
    title: 'the Chain Warden',
    tags: ['Support', 'Fighter'],
  },
];

const features = [
  {
    title: 'Summoner Stats',
    description:
      'Get detailed statistics for any summoner, including win rates, most played champions, and ranked information.',
    icon: '👤',
  },
  {
    title: 'Match History',
    description:
      'View recent matches with comprehensive data on performance, builds, and team compositions.',
    icon: '🎮',
  },
  {
    title: 'Champion Analysis',
    description:
      'Explore champion-specific statistics, optimal builds, and performance metrics.',
    icon: '📊',
  },
];

const Index = () => {
  return (
    <>
      <AnimatedBackground />
      <Navbar />

      <main className='mx-auto max-w-7xl px-4 pt-32 pb-20'>
        <section className='mb-24 flex min-h-[60vh] items-center justify-center'>
          <SummonerSearch />
        </section>

        <section className='mb-24'>
          <motion.div
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='mb-12 text-center'
          >
            <motion.span
              variants={staggerItem}
              className='text-lol-blue bg-lol-blue/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium'
            >
              FEATURED CHAMPIONS
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className='mb-6 text-3xl font-bold sm:text-4xl'
            >
              Popular Champions
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className='text-muted-foreground mx-auto max-w-xl text-lg'
            >
              Explore detailed statistics and information about your favorite
              League of Legends champions.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='mb-8 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6'
          >
            {featuredChampions.map((champion) => (
              <ChampionCard key={champion.id} {...champion} />
            ))}
          </motion.div>

          <motion.div
            variants={fadeIn}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true }}
            className='text-center'
          >
            <Link
              to='/champions'
              className='text-lol-blue inline-flex items-center gap-2 text-sm font-medium hover:underline'
            >
              View all champions <ArrowRight size={16} />
            </Link>
          </motion.div>
        </section>

        <section>
          <motion.div
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='mb-12 text-center'
          >
            <motion.span
              variants={staggerItem}
              className='text-lol-blue bg-lol-blue/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium'
            >
              FEATURES
            </motion.span>

            <motion.h2
              variants={staggerItem}
              className='mb-6 text-3xl font-bold sm:text-4xl'
            >
              Why Use LoL API Guru
            </motion.h2>

            <motion.p
              variants={staggerItem}
              className='text-muted-foreground mx-auto max-w-xl text-lg'
            >
              Our platform provides comprehensive tools for League of Legends
              players to improve their gameplay and track their progress.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial='hidden'
            whileInView='visible'
            viewport={{ once: true, margin: '-100px' }}
            className='grid gap-6 md:grid-cols-3'
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                variants={staggerItem}
                className='glass-card hover-scale rounded-xl p-6'
              >
                <div className='bg-lol-blue/10 text-lol-blue mb-4 flex h-12 w-12 items-center justify-center rounded-full'>
                  <span className='text-2xl'>{feature.icon}</span>
                </div>
                <h3 className='mb-2 text-xl font-bold'>{feature.title}</h3>
                <p className='text-muted-foreground'>{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </section>
      </main>

      <footer className='glass-card border-t border-white/10 py-8'>
        <div className='mx-auto max-w-7xl px-4 text-center'>
          <p className='text-muted-foreground text-sm'>
            LoL API Guru is not endorsed by Riot Games and does not reflect the
            views or opinions of Riot Games or anyone officially involved in
            producing or managing League of Legends.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Index;
