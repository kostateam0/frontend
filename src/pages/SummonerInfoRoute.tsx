import { useParams } from 'react-router-dom';
import SummonerInfo from './SummonerInfo';

export default function SummonerInfoRoute() {
  const { region, name, tag } = useParams<{ region: string; name: string; tag: string }>();

  if (!region || !name || !tag) return <p className="text-center mt-6 text-red-500">잘못된 URL</p>;

  return <SummonerInfo region={region} summonerName={decodeURIComponent(name)} tag={tag} />;
}
