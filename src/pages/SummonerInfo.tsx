import { useEffect, useState } from "react";
import SummonerProfile from "../components/SummonerProfile";
import MatchList from "../components/MatchListPage";

// props로 region, summonerName, tag 받음
interface Props {
  region: string;
  summonerName: string;
  tag: string;
}

interface Summoner {
  name: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: number;
  puuid?: string;
}

interface ApiResponse {
  user: Summoner;
  summonerName: string;
  tag: string;
}

const SummonerInfo = ({ region, summonerName, tag }: Props) => {
  const [data, setData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = new URL("http://localhost:3000/api/summoner");
        url.searchParams.append("summonerName", summonerName);
        url.searchParams.append("tag", tag);
        url.searchParams.append("region", region);

        const res = await fetch(url.toString());
        if (!res.ok) throw new Error("API 호출 실패");

        const json: ApiResponse = await res.json();
        setData(json);
      } catch (err) {
        setError("소환사 정보를 불러올 수 없습니다.");
        console.error(err);
      }
    };

    if (summonerName && tag && region) {
      fetchData();
    }
  }, [summonerName, tag, region]);

  if (error) return <p className="text-red-500 text-center mt-6">{error}</p>;
  if (!data) return <p className="text-gray-500 text-center mt-6">불러오는 중...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-12 pb-20">
      {/* Summoner Profile */}
      <SummonerProfile
        summoner={data.user}
        summonerName={data.summonerName}
        tag={data.tag}
      />

      {/* Match List */}
      <MatchList
        puuid={data.user.puuid!}
        summonerName={data.summonerName}
      />
    </div>
  );
};

export default SummonerInfo;
