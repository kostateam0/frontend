import { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import FeedItem from './FeedItem';
import FeedItemSkeleton from '../skeleton/FeedItemSkeleton';

// GET 함수 http://localhost:4000/api/feed
export const getFeeds = async () => {
  const response = await fetch(`http://localhost:4000/api/feed`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch feeds');
  }

  return response.json();
};

type Feed = {
  feedID: string;
  userID: string;
  lp: number;
  content: string;
  createdAt: string;
};

export default function FeedList() {
  const [feedList, setFeedList] = useState<Feed[]>([]);
  const queryClient = useQueryClient();

  const { data, isLoading, isError } = useQuery({
    queryKey: ['feeds'],
    queryFn: getFeeds,
    select: (data) => data.data as Feed[],
  });

  // 피드 삭제 핸들러
  const handleDeleteFeed = (id: string) => {
    // setFeedList((prevFeeds) => prevFeeds.filter((feed) => feed.feedID !== id));
    queryClient.setQueryData<Feed[]>(['feeds'], (prev) =>
      prev ? prev.filter((f) => f.feedID !== id) : [],
    );
  };

  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const feeds = await getFeeds();
        console.log('Fetched feeds:', feeds);
        // setFeedList(feeds.data);
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };
    fetchFeeds();
  }, []);

  if (isLoading)
    return Array.from({ length: 3 }, () => <FeedItemSkeleton />);
  if (isError) return <div>Failed to load feeds</div>;

  return (
    <div className='flex flex-col space-y-4'>
      {data.map((feed, idx) => (
        <FeedItem key={idx} feed={feed} onDelete={handleDeleteFeed} />
      ))}
    </div>
  );
}
