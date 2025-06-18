import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  fadeIn,
  slideUp,
  staggerContainer,
  staggerItem,
} from '@/lib/framer-animations';

const regions = [
  { value: 'na1', label: 'North America' },
  { value: 'euw1', label: 'EU West' },
  { value: 'eun1', label: 'EU Nordic & East' },
  { value: 'kr', label: 'Korea' },
  { value: 'jp1', label: 'Japan' },
  { value: 'br1', label: 'Brazil' },
  { value: 'la1', label: 'LAN' },
  { value: 'la2', label: 'LAS' },
  { value: 'oc1', label: 'Oceania' },
  { value: 'tr1', label: 'Turkey' },
  { value: 'ru', label: 'Russia' },
];

const SummonerSearch = () => {
  const [summonerName, setSummonerName] = useState('');
  const [region, setRegion] = useState('na1');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (summonerName.trim()) {
      navigate(`/summoner/${region}/${summonerName}`);
    }
  };

  return (
    <motion.div
      className='mx-auto w-full max-w-2xl text-center'
      variants={staggerContainer}
      initial='hidden'
      animate='visible'
    >
      <motion.span
        className='text-lol-blue bg-lol-blue/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium'
        variants={staggerItem}
      >
        LEAGUE OF LEGENDS STATS
      </motion.span>

      <motion.h1
        className='mb-6 text-4xl font-bold sm:text-5xl md:text-6xl'
        variants={staggerItem}
      >
        Elevate your League experience
      </motion.h1>

      <motion.p
        className='text-muted-foreground mx-auto mb-10 max-w-xl text-lg'
        variants={staggerItem}
      >
        Search for any summoner to get detailed insights, match history, and
        champion performance stats with our beautiful, minimalist interface.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className='glass-card relative mx-auto max-w-xl overflow-hidden rounded-xl p-1'
        variants={fadeIn}
      >
        <div className='flex flex-col sm:flex-row'>
          <div className='relative flex-1'>
            <input
              type='text'
              placeholder='Enter summoner name...'
              value={summonerName}
              onChange={(e) => setSummonerName(e.target.value)}
              className='w-full border-0 bg-transparent py-4 pr-12 pl-4 text-base focus:ring-0 focus:outline-none'
            />
            <Search className='text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 transform' />
          </div>

          <div className='flex flex-col sm:flex-row'>
            <select
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              className='border-border border-0 border-t bg-transparent px-4 py-4 text-sm focus:ring-0 focus:outline-none sm:border-t-0 sm:border-l'
            >
              {regions.map((region) => (
                <option key={region.value} value={region.value}>
                  {region.label}
                </option>
              ))}
            </select>

            <button
              type='submit'
              className='bg-lol-blue hover:bg-lol-blue/90 px-6 py-4 font-medium text-white transition-colors focus:outline-none sm:px-8'
            >
              Search
            </button>
          </div>
        </div>
      </motion.form>

      <motion.div
        className='text-muted-foreground mt-6 text-sm'
        variants={slideUp}
      >
        Try searching for{' '}
        <button
          onClick={() => {
            setSummonerName('Faker');
            setRegion('kr');
          }}
          className='text-lol-blue hover:underline focus:outline-none'
        >
          Faker
        </button>
        ,{' '}
        <button
          onClick={() => {
            setSummonerName('Bjergsen');
            setRegion('na1');
          }}
          className='text-lol-blue hover:underline focus:outline-none'
        >
          Bjergsen
        </button>
        , or{' '}
        <button
          onClick={() => {
            setSummonerName('Rekkles');
            setRegion('euw1');
          }}
          className='text-lol-blue hover:underline focus:outline-none'
        >
          Rekkles
        </button>
      </motion.div>
    </motion.div>
  );
};

export default SummonerSearch;
