export interface Participant {
  puuid: string;
  summonerName: string;
  riotIdGameName?: string;   // ✅ Riot ID 이름
  riotIdTagline?: string;    // ✅ Riot ID 태그
  championName: string;
  kills: number;
  deaths: number;
  assists: number;
  totalDamageDealtToChampions: number;
  teamPosition: string;
  win: boolean;
  item0: number;
  item1: number;
  item2: number;
  item3: number;
  item4: number;
  item5: number;
  item6: number;
  summonerLevel: number;
  totalMinionsKilled: number;
  neutralMinionsKilled: number;
  timePlayed: number;
  summoner1Id: number;
  summoner2Id: number;
  teamId: number;
}