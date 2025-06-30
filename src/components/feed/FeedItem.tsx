import FeedDropdownMenu from './FeedDropdownMenu';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, Share } from 'lucide-react';
import { formatDate } from '@/utils/formatDate';

type FeedItemProps = {
  feed: {
    feedID: string;
    userID: string;
    lp: number;
    createdAt: string;
    champion: string;
    kills: number;
    deaths: number;
    assists: number;
    cs: number;
    duration: string;
    content: string;
  };
  onDelete?: (id: string) => void;
};

export default function FeedItem({ feed, onDelete }: FeedItemProps) {
  const handleEdit = () => {
    console.log('게시글 수정');
  };

  const handleDelete = () => {
    fetch(`http://localhost:4000/api/feed/${feed.feedID}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete feed');
        return res.json();
      })
      .then(() => {
        console.log('삭제 성공');
        if (onDelete) {
          onDelete(feed.feedID); // 상태 업데이트
        }
      })
      .catch((err) => console.error('삭제 실패:', err));
  };

  const handleShare = () => {
    console.log('게시글 공유');
  };

  const handleBookmark = () => {
    console.log('북마크 추가');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    console.log('링크 복사됨');
  };

  const handleReport = () => {
    console.log('게시글 신고');
  };

  const handleHide = () => {
    console.log('게시글 숨기기');
  };

  return (
    <div className='w-full space-y-4'>
      {/* 내가 작성한 게시글 예시 */}
      <Card className='border border-gray-200 bg-white dark:border-[#1a1a1a] dark:bg-[#1a1a1a]'>
        <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
          <div className='flex items-center space-x-3'>
            <Avatar className='h-10 w-10'>
              <AvatarImage src='/placeholder.svg?height=40&width=40' />
              <AvatarFallback className='h-10 w-10 bg-[#4a6741]'>
                나
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-semibold text-gray-900 dark:text-gray-100'>
                <div className='flex items-center justify-center space-x-2'>
                  <span className='font-bold text-[#8B6914]'>
                    {feed.userID}
                  </span>
                  <span className='ml-1 rounded bg-yellow-600 px-2 py-0.5 text-xs font-semibold text-black'>
                    Challenger
                  </span>
                </div>
              </div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {formatDate(feed.createdAt)}
              </p>
            </div>
          </div>
          <FeedDropdownMenu
            isOwner={true}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onShare={handleShare}
            onBookmark={handleBookmark}
            onCopyLink={handleCopyLink}
            onReport={handleReport}
            onHide={handleHide}
          />
        </CardHeader>
        <CardContent>
          <p className='mb-4 text-gray-800 dark:text-gray-200'>
            {feed.content}
          </p>
        </CardContent>
        <CardFooter className='flex items-center space-x-4 text-gray-500 dark:text-gray-400'>
          <div className='flex items-center space-x-4 text-gray-500 dark:text-gray-400'>
            <button className='flex items-center space-x-1 transition-colors hover:text-red-500'>
              <Heart className='h-4 w-4' />
              <span>12</span>
            </button>
            <button className='flex items-center space-x-1 transition-colors hover:text-blue-500'>
              <MessageCircle className='h-4 w-4' />
              <span>3</span>
            </button>
            <button className='flex items-center space-x-1 transition-colors hover:text-green-500'>
              <Share className='h-4 w-4' />
              <span>공유</span>
            </button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
