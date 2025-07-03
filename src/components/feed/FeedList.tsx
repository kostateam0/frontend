import { useEffect, useState } from 'react';
import FeedItem from './FeedItem';
import { Link } from 'react-router-dom';

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
    setFeedList((prevFeeds) => prevFeeds.filter((feed) => feed.feedID !== id));
  };

  return (
    <div className='flex flex-col space-y-4'>
      {feedList.map((feed, idx) => (
        <FeedItem key={idx} feed={feed} onDelete={handleDeleteFeed} />
      ))}
    </div>
  );
}
