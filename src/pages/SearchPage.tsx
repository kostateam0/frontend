// src/pages/SearchPage.tsx
import { useState } from 'react';
import SummonerSearch from '@/components/SummonerSearch';
import SummonerInfo from './SummonerInfo';

export default function SearchPage() {
  const [query, setQuery] = useState<{
    region: string;
    summonerName: string;
    tag: string;
  } | null>(null);

  return query ? (
    <SummonerInfo {...query} />
  ) : (
    <SummonerSearch onSearch={setQuery} />
  );
}
