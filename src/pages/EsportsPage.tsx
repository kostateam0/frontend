import EsportsRankings from '@/components/EsportsRankings';
import EsportsTeams from '@/components/EsportsTeams';
const EsportsPage = () => {
  return (
    <div className='text-white'>
      <EsportsTeams />
      <EsportsRankings />
    </div>
  );
};

export default EsportsPage;
