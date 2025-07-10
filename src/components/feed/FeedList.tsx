import { useQuery, useQueryClient } from '@tanstack/react-query';
import FeedItem from './FeedItem';
import FeedItemSkeleton from '../skeleton/FeedItemSkeleton';
import { Link } from 'react-router-dom';
import { useUserStore } from '@/store/userStore';
import type { Feed } from '@/types/feed';

// ✅ GET 함수에 반환 타입 명시
export const getFeeds = async (): Promise<{ data: Feed[] }> => {
  const response = await fetch(`http://localhost:4000/api/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }

  return response.json();
};

export default function FeedList() {
  const queryClient = useQueryClient();
  const { user } = useUserStore();
  console.log(user);

  // ✅ useQuery에서 select로 타입 명확히 추론
  const { data, isLoading, isError } = useQuery({
    queryKey: ['feeds'],
    queryFn: getFeeds,
    select: (data) => data.data,
  });

  // 🗑 피드 삭제 핸들러
  const handleDeleteFeed = (id: string) => {
    queryClient.setQueryData<Feed[]>(['feeds'], (prev) =>
      prev ? prev.filter((f) => f.feedID !== id) : [],
    );
  };

  if (isLoading)
    return (
      <>
        {Array.from({ length: 3 }, (_, idx) => (
          <FeedItemSkeleton key={idx} />
        ))}
      </>
    );

  if (isError) return <div>Failed to load feeds</div>;

  return (
    <div className='flex flex-col space-y-4'>
      {data && data.map((feed) => (
        <Link key={feed.feedID} to={`/feed/${feed.feedID}`} className='block bg-auto'>
          <FeedItem feed={feed} onDelete={handleDeleteFeed} />
        </Link>
      ))}
    </div>
  );
}
