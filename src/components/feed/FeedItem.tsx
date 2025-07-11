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
import { useState } from 'react';
import { NewCommentModal } from '../comment/NewCommentModal';
import { useUserStore } from '@/store/userStore';
import type { Feed } from '@/types/feed';
type onDelete = (id: string) => void;

export default function FeedItem({
  feed,
  onDelete,
}: {
  feed: Feed;
  onDelete?: onDelete;
}) {
  const { user, isLoggedIn } = useUserStore();
  const isOwner = user?.id === feed.userID;
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedFeedId, setSelectedFeedId] = useState('');
  const [isLiked, setIsLiked] = useState(feed.isLiked); // 초기값은 feed.isLiked로 설정
  const [likeCount, setLikeCount] = useState(feed._count.likes); // 기본값은 서버에서 받아오는 값으로 설정

  const handleLikeClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (isLiked) {
      setLikeCount((prev) => prev - 1);
    } else {
      setLikeCount((prev) => prev + 1);
    }
    setIsLiked((prev) => !prev);

    // 선택적으로 서버에 반영
    fetch(`/api/feed/${feed.feedID}/like`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userID: user, like: !isLiked }),
    }).catch((err) => console.error('좋아요 요청 실패:', err));
  };

  const handleCommentClick = (feedId: string) => {
    setSelectedFeedId(feedId);
    setIsDialogOpen(true);
  };

  const handleEdit = () => {
    console.log('게시글 수정');
  };

  const handleDelete = () => {
    fetch(`/api/feed/${feed.feedID}`, {
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

  const handleShare = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const shareData = {
      title: '피드 공유',
      text: feed.content,
      url: `$${window.location.origin}/feed/${feed.feedID}`,
    };

    if (navigator.share) {
      navigator
        .share(shareData)
        .then(() => console.log('공유 성공'))
        .catch((err) => console.error('공유 실패:', err));
    } else {
      console.warn('Web Share API를 지원하지 않습니다.');
    }
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
              <AvatarFallback
                className={`h-10 w-10 ${isOwner ? 'bg-[#4a6741]' : 'bg-[#0e87cd]'}`}
              >
                {isOwner ? '나' : '너'}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className='font-semibold text-gray-900 dark:text-gray-100'>
                <div className='flex items-center justify-center space-x-2'>
                  <span className='font-bold text-[#8B6914]'>
                    {feed.user?.name ? feed.user.name : '닉네임 없음'}
                  </span>
                  <span className='ml-1 rounded bg-yellow-600 px-2 py-0.5 text-xs font-semibold text-black'>
                    정보없음
                  </span>
                </div>
              </div>
              <p className='text-sm text-gray-500 dark:text-gray-400'>
                {formatDate(feed.createdAt)}
              </p>
            </div>
          </div>
          <FeedDropdownMenu
            isOwner={isOwner}
            onEdit={handleEdit}
            onDelete={handleDelete}
            // onShare={handleShare}
            onBookmark={handleBookmark}
            onCopyLink={handleCopyLink}
            onReport={handleReport}
            onHide={handleHide}
          />
        </CardHeader>
        {/* <Link to={`/feed/${feed.feedID}`} className='block bg-auto'> */}
        <CardContent>
          <p className='mb-4 text-gray-800 dark:text-gray-200'>
            {feed.content}
          </p>
        </CardContent>

        {/* imageArea */}
        {feed.imageUrl && (
          <div className='flex space-x-2 overflow-x-auto rounded-2xl border border-gray-800 p-2'>
            {feed.imageUrl.split(',').map((url, idx) => (
              <img
                key={idx}
                src={url.trim()}
                alt={`게시물 이미지 ${idx + 1}`}
                className='h-auto w-48 rounded-lg object-cover'
              />
            ))}
          </div>
        )}
        {/* </Link> */}
        <CardFooter className='flex items-center space-x-4 text-gray-500 dark:text-gray-400'>
          <div className='flex items-center space-x-4 text-gray-500 dark:text-gray-400'>
            {!isLoggedIn && (
              <button
                onClick={(e) => {
                  alert('로그인 후 이용 가능합니다.');
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className='flex items-center space-x-1 transition-colors hover:text-blue-500'
              >
                <Heart className='h-4 w-4' />
                <span>{feed._count.likes}</span>
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={handleLikeClick}
                className={`flex items-center space-x-1 transition-colors hover:cursor-pointer ${
                  isLiked ? 'text-red-500' : 'hover:text-red-500'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500' : ''}`} />
                <span>{likeCount}</span>
              </button>
            )}
            {!isLoggedIn && (
              <button
                onClick={(e) => {
                  alert('로그인 후 이용 가능합니다.');
                  e.preventDefault();
                  e.stopPropagation();
                }}
                className='flex items-center space-x-1 transition-colors hover:text-blue-500 hover:cursor-pointer'
              >
                <MessageCircle className='h-4 w-4' />
                <span>
                  {feed.Comment.length > 0 ? feed.Comment.length : '0'}
                </span>
              </button>
            )}
            {isLoggedIn && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleCommentClick(feed.feedID);
                }}
                className='flex items-center space-x-1 transition-colors hover:text-blue-500 hover:cursor-pointer'
              >
                <MessageCircle className='h-4 w-4' />
                <span>
                  {feed.Comment.length > 0 ? feed.Comment.length : '0'}
                </span>
              </button>
            )}

            <button
              className='flex items-center space-x-1 transition-colors hover:text-green-500 hover:cursor-pointer'
              onClick={handleShare}
            >
              <Share className='h-4 w-4' />
              <span>공유</span>
            </button>
          </div>
        </CardFooter>
      </Card>
      <NewCommentModal
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        feedID={selectedFeedId}
        feedContent={feed.content}
      />
    </div>
  );
}
