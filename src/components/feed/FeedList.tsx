import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';

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
  id: string;
  userID: string;
  content: string;
  createdAt: string;
};

export default function FeedList() {
  const [feedList, setFeedList] = useState<Feed[]>([]);
  useEffect(() => {
    const fetchFeeds = async () => {
      try {
        const feeds = await getFeeds();
        console.log('Fetched feeds:', feeds);
        setFeedList(feeds.data);
      } catch (error) {
        console.error('Error fetching feeds:', error);
      }
    };
    fetchFeeds();
  }, []);
  
  // 피드 삭제 핸들러
  const handleDeleteFeed = (id: string) => {
    setFeedList((prevFeeds) => prevFeeds.filter((feed) => feed.id !== id));
  };

  return (
    <div className='space-y-4'>
      {feedList.map((feed, idx) => (
        <FeedItem key={idx} feed={feed} onDelete={handleDeleteFeed} />
      ))}
    </div>
  );
}
