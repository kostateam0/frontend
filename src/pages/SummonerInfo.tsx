import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SummonerProfile from "../components/SummonerProfile";
import MatchList from "../components/MatchListPage"; // ✅ 새로 추가

// API 응답 데이터 타입 정의
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

const SummonerInfo = () => {
  const [params] = useSearchParams();
  const summonerName = params.get("summonerName") || "";
  const tag = params.get("tag") || "";
  const region = params.get("region") || "";

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

  if (error) return <p>{error}</p>;
  if (!data) return <p>불러오는 중...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 pt-24 pb-20">
      {/* Summoner Profile */}
      <SummonerProfile
        summoner={data.user}
        summonerName={data.summonerName}
        tag={data.tag}
      />

      {/* Match List 컴포넌트 포함 */}
      <MatchList
        puuid={data.user.puuid!}
        summonerName={data.summonerName}
      />
    </div>
  );
};

export default SummonerInfo;
