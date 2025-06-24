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
  userID: string;
  content: string;
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
  return (
    <div className='space-y-4'>
      {feedList.map((feed, idx) => (
        <FeedItem key={idx} feed={feed} />
        // <div
        //   key={idx}
        //   className='rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md'
        // >
        //   <div className='font-semibold text-[#7c3aed]'>{feed.userID}</div>
        //   <p className='mt-1 text-[14px] text-[#374151]'>
        //     {feed.content}
        //   </p>
        // </div>
      ))}
    </div>
  );
}
