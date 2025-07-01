import EsportsRankings from '@/components/EsportsRankings';
import EsportsTeams from '@/components/EsportsTeams';
const EsportsPage = () => {
  return (
    <div className='p-8 text-white'>
      <EsportsTeams />
      <EsportsRankings />
    </div>
  );
};

export default EsportsPage;
