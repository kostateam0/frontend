// components/SummonerResult.tsx
type Props = {
    summonerName: string;
    tag: string;
    region: string;
  };
  
  const SummonerResult = ({ summonerName, tag, region }: Props) => {
    return (
      <div className="text-center mt-10">
        <h2 className="text-2xl font-bold">{summonerName}#{tag}</h2>
        <p className="text-sm text-gray-600 mt-2">Region: {region}</p>
        <p className="mt-4 text-gray-500">🔄 전적 데이터를 불러오는 중입니다...</p>
      </div>
    );
  };
  
  export default SummonerResult;
  