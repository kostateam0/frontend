import { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer } from '@/lib/framer-animations';

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

const RECENT_KEY = 'recentSearches';
const FAV_KEY = 'favorites';

const SummonerSearch = ({ onSearch }: Props) => {
  const [summonerInput, setSummonerInput] = useState('');
  const [region, setRegion] = useState('kr');
  const [error, setError] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [recent, setRecent] = useState<string[]>([]);

  // localStorage에서 불러오기
  useEffect(() => {
    const fav = localStorage.getItem(FAV_KEY);
    setFavorites(fav ? JSON.parse(fav) : []);
    const rec = localStorage.getItem(RECENT_KEY);
    setRecent(rec ? JSON.parse(rec) : []);
  }, []);

  // 즐겨찾기 추가/삭제
  const toggleFavorite = (name: string) => {
    let updated: string[];
    if (favorites.includes(name)) {
      updated = favorites.filter((f) => f !== name);
    } else {
      updated = [...favorites, name];
    }
    setFavorites(updated);
    localStorage.setItem(FAV_KEY, JSON.stringify(updated));
  };

  // 최근검색 추가 (최대 10개)
  const addRecent = (name: string) => {
    let updated = [name, ...recent.filter((r) => r !== name)];
    if (updated.length > 10) updated = updated.slice(0, 10);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  // 최근검색 삭제
  const removeRecent = (name: string) => {
    const updated = recent.filter((r) => r !== name);
    setRecent(updated);
    localStorage.setItem(RECENT_KEY, JSON.stringify(updated));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = summonerInput.trim();
    const [summonerName, tag] = trimmed.split('#').map((s) => s.trim());

    if (!summonerName || !tag) {
      setError('❗ 소환사이름#태그 형식으로 입력하세요.');
      return;
    }

    setError('');
    addRecent(trimmed);
    onSearch({ region, summonerName, tag });
  };

  // 즐겨찾기/최근검색 클릭 시 검색 실행
  const handleQuickSearch = (item: string) => {
    setSummonerInput(item);
    const [summonerName, tag] = item.split('#').map((s) => s.trim());
    if (summonerName && tag) {
      onSearch({ region, summonerName, tag });
      addRecent(item);
    }
  };

  return (
    <div className='flex h-screen items-start justify-center bg-[#18181c]'>
      <motion.div
        className='mx-auto flex w-full max-w-2xl flex-col text-center'
        variants={staggerContainer}
        initial='hidden'
        animate='visible'
      >
        {/* troll.png 로고 이미지 */}
        <img
          src='assets/troll.png'
          alt='Troll Logo'
          className='mx-auto mb-4 h-72 w-72 shadow-lg'
          style={{ marginTop: 0 }} // 불필요한 마진 없음
        />

        {/* 검색 폼 */}
        <motion.form
          onSubmit={handleSubmit}
          className='glass-card relative mx-auto w-full max-w-xl overflow-hidden rounded-xl p-0'
          variants={fadeIn}
        >
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

            <div className='relative flex-1'>
              <input
                type='text'
                placeholder='소환사이름#태그'
                value={summonerInput}
                onChange={(e) => setSummonerInput(e.target.value)}
                className='w-full border-0 bg-transparent py-4 pr-12 pl-4 text-base focus:ring-0 focus:outline-none'
              />
              <Search className='text-muted-foreground absolute top-1/2 right-4 -translate-y-1/2 transform' />
            </div>

            <button
              type='submit'
              className='bg-lol-blue hover:bg-lol-blue/90 px-6 py-4 font-medium text-white transition-colors focus:outline-none sm:px-8'
            >
              Search
            </button>
          </div>
          {error && (
            <p className='mt-2 px-4 text-left text-sm text-red-500'>{error}</p>
          )}
        </motion.form>

        {/* 즐겨찾기/최근검색 컴포넌트 */}
        <div className='mx-auto mt-6 w-full max-w-xl text-left'>
          <div className='mb-1 text-base font-semibold text-gray-300'>
            ⭐️ 즐겨찾기
          </div>
          <div className='mb-2 flex flex-wrap gap-2'>
            {favorites.length === 0 && (
              <span className='text-sm text-gray-500'>
                즐겨찾기한 소환사가 없습니다.
              </span>
            )}
            {favorites.map((item) => (
              <button
                key={item}
                className='flex items-center gap-1 rounded-full bg-[#292936] px-3 py-1 text-sm text-[#6ee7b7] transition hover:bg-[#363646]'
                onClick={() => handleQuickSearch(item)}
                type='button'
              >
                {item}
                <span
                  className='ml-1 cursor-pointer'
                  title='즐겨찾기 해제'
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                >
                  ⭐️
                </span>
              </button>
            ))}
          </div>
          <div className='mb-1 text-base font-semibold text-gray-300'>
            🕑 최근 검색
          </div>
          <div className='flex flex-wrap gap-2'>
            {recent.length === 0 && (
              <span className='text-sm text-gray-500'>
                최근 검색 기록이 없습니다.
              </span>
            )}
            {recent.map((item) => (
              <button
                key={item}
                className='flex items-center gap-1 rounded-full bg-[#18181c] px-3 py-1 text-sm text-gray-200 transition hover:bg-[#292936]'
                onClick={() => handleQuickSearch(item)}
                type='button'
              >
                {item}
                <span
                  className='ml-1 cursor-pointer'
                  title={
                    favorites.includes(item) ? '즐겨찾기 해제' : '즐겨찾기 추가'
                  }
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(item);
                  }}
                >
                  {favorites.includes(item) ? '⭐️' : '☆'}
                </span>
                <span
                  className='ml-1 cursor-pointer text-red-400 hover:text-red-600'
                  title='최근 검색에서 삭제'
                  onClick={(e) => {
                    e.stopPropagation();
                    removeRecent(item);
                  }}
                >
                  ✕
                </span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SummonerSearch;
