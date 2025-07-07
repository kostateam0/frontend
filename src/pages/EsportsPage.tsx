// import EsportsRankings from '@/components/EsportsRankings';
// import EsportsTeams from '@/components/EsportsTeams';
// const EsportsPage = () => {
//   return (
//     <div className='text-white'>
//       <EsportsTeams />
//       <EsportsRankings />
//     </div>
//   );
// };

// export default EsportsPage;
import { useState } from 'react';
import EsportsRankings from '@/components/EsportsRankings';
import EsportsTeams from '@/components/EsportsTeams';
import EsportsResults from '@/components/EsportsResults';

const EsportsPage = () => {
  const [tab, setTab] = useState<'roster' | 'ranking' | 'results'>('roster');

  return (
    <div className='text-white'>
      {/* NavBar */}
      <nav className='mb-6 flex gap-2 border-b border-[#23232b]'>
        <button
          className={`px-6 py-3 font-semibold transition ${
            tab === 'roster'
              ? 'border-b-2 border-[#c44920] text-[#c44920]'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setTab('roster')}
        >
          로스터
        </button>
        <button
          className={`px-6 py-3 font-semibold transition ${
            tab === 'ranking'
              ? 'border-b-2 border-[#c44920] text-[#c44920]'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setTab('ranking')}
        >
          순위
        </button>
        <button
          className={`px-6 py-3 font-semibold transition ${
            tab === 'results'
              ? 'border-b-2 border-[#c44920] text-[#c44920]'
              : 'text-gray-400 hover:text-white'
          }`}
          onClick={() => setTab('results')}
        >
          경기결과
        </button>
      </nav>

      {/* Content */}
      {tab === 'roster' && <EsportsTeams />}
      {tab === 'ranking' && <EsportsRankings />}
      {tab === 'results' && <EsportsResults />}
    </div>
  );
};

export default EsportsPage;
