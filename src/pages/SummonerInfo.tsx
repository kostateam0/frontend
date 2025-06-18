import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SummonerProfile from "../components/SummonerProfile";

// API 응답 데이터 타입 정의
interface Summoner {
  name: string;
  summonerLevel: number;
  profileIconId: number;
  revisionDate: number;
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
    <div>
      <SummonerProfile
        summoner={data.user}
        summonerName={data.summonerName}
        tag={data.tag}
      />
    </div>
  );
};

export default SummonerInfo;
