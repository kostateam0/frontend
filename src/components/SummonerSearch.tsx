import { useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, staggerItem } from '@/lib/framer-animations';

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

type Props = {
  onSearch: (query: {
    region: string;
    summonerName: string;
    tag: string;
  }) => void;
};

const SummonerSearch = ({ onSearch }: Props) => {
  const [summonerInput, setSummonerInput] = useState('');
  const [region, setRegion] = useState('kr');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = summonerInput.trim();
    const [summonerName, tag] = trimmed.split('#').map((s) => s.trim());

    if (!summonerName || !tag) {
      setError('❗ 소환사이름#태그 형식으로 입력하세요.');
      return;
    }

    setError('');
    console.log('🎯 검색 실행:', { region, summonerName, tag });
    onSearch({ region, summonerName, tag });
  };

  return (
    <motion.div
      className="mx-auto w-full max-w-2xl text-center"
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
    >
      <motion.span
        className="text-lol-blue bg-lol-blue/10 mb-4 inline-block rounded-full px-3 py-1 text-xs font-medium"
        variants={staggerItem}
      >
        LEAGUE OF LEGENDS STATS
      </motion.span>

      <motion.h1
        className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl"
        variants={staggerItem}
      >
        Elevate your League experience
      </motion.h1>

      <motion.p
        className="text-muted-foreground mx-auto mb-10 max-w-xl text-lg"
        variants={staggerItem}
      >
        Search for any summoner to get detailed insights, match history, and champion performance stats.
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="glass-card relative mx-auto max-w-xl overflow-hidden rounded-xl p-1"
        variants={fadeIn}
      >
        <div className="flex flex-col sm:flex-row">
          <select
            value={region}
            onChange={(e) => setRegion(e.target.value)}
            className="py-4 px-4 bg-transparent border-0 border-t sm:border-t-0 sm:border-l border-border text-sm focus:outline-none focus:ring-0"
          >
            {regions.map((region) => (
              <option key={region.value} value={region.value}>
                {region.label}
              </option>
            ))}
          </select>

          <div className="relative flex-1">
            <input
              type="text"
              placeholder="소환사이름#태그"
              value={summonerInput}
              onChange={(e) => setSummonerInput(e.target.value)}
              className="w-full py-4 pl-4 pr-12 bg-transparent border-0 text-base focus:outline-none focus:ring-0"
            />
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          </div>

          <button
            type="submit"
            className="bg-lol-blue hover:bg-lol-blue/90 px-6 py-4 font-medium text-white transition-colors focus:outline-none sm:px-8"
          >
            Search
          </button>
        </div>

        {/* 오류 메시지 표시 */}
        {error && (
          <p className="text-red-500 mt-3 text-sm text-left px-4">{error}</p>
        )}
      </motion.form>
    </motion.div>
  );
};

export default SummonerSearch;
