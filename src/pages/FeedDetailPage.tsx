import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import {
  Heart,
  MessageCircle,
  Repeat2,
  Share,
  MoreHorizontal,
  MoveLeft,
} from 'lucide-react';
import FullDate, { formatDate } from '@/utils/formatDate';
import { NewComment } from '@/components/comment/NewComment';

interface CommentType {
  userID: string;
  createdAt: string;
  content: string;
}

interface FeedData {
  content: string;
  createdAt: string;
  feedID: string;
  imageUrl: string | null;
  updatedAt: string;
  userID: string;
  Comment: CommentType[];
  user: {
    id: string;
    name?: string | null;
  };
}

export default function FeedDetailPage() {
  const [feedData, setFeedData] = useState<FeedData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [liked, setLiked] = useState(false);
  const [retweeted, setRetweeted] = useState(false);

  const params = useParams();
  console.log(params);
  console.log(params.feedID);
  const feedID = (params?.feedID as string) || '';
  console.log(feedID);

  useEffect(() => {
    const fetchFeed = async () => {
      try {
        const res = await fetch(`http://localhost:4000/api/feed/${feedID}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });

        if (!res.ok) throw new Error('서버 응답 실패');

        const data = await res.json();
        console.log(data);
        setFeedData(data.data);
      } catch (err) {
        console.error('피드 정보를 불러오지 못했습니다.', err);
        setError('피드 정보를 불러오지 못했습니다.');
      } finally {
        setLoading(false);
      }
    };

    if (feedID) fetchFeed();
  }, [feedID]);

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleRetweet = () => {
    setRetweeted(!retweeted);
  };

  if (loading) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        <div className='text-lg'>로딩 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        <div className='text-lg text-red-400'>{error}</div>
      </div>
    );
  }

  if (!feedData) {
    return (
      <div className='flex min-h-screen items-center justify-center bg-black text-white'>
        <div className='text-lg'>피드를 찾을 수 없습니다.</div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-black text-white'>
      <div className='mx-auto max-w-2xl'>
        {/* Header */}
        <div className='sticky top-0 border-b border-gray-800 bg-black/80 p-4 backdrop-blur-md'>
          <div className='flex items-center space-x-4'>
            <Button
              variant='ghost'
              size='sm'
              className='text-gray-500 hover:bg-gray-800'
              onClick={() => window.history.back()}
            >
              <MoveLeft />
            </Button>
            <h1 className='text-xl font-bold'>게시물</h1>
          </div>
        </div>

        {/* Main Tweet */}
        <Card className='rounded-none border-x-0 border-t-0 border-gray-800 bg-black'>
          <CardHeader className='pb-3'>
            <div className='flex items-start justify-between'>
              <div className='flex items-center space-x-3'>
                <Avatar className='h-12 w-12'>
                  <AvatarImage src={`/placeholder.svg?height=48&width=48`} />
                  <AvatarFallback className='bg-gray-700 text-white'>
                    {feedData.user?.name ? feedData.user.name : '닉네임 없음'}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className='flex items-center space-x-2'>
                    <h3 className='font-bold text-white'>
                      {feedData.user?.name ? feedData.user.name : '닉네임 없음'}
                    </h3>
                  </div>
                  <p className='text-sm text-gray-500'>
                    {formatDate(feedData.createdAt)}
                  </p>
                </div>
              </div>
              <Button
                variant='ghost'
                size='sm'
                className='text-gray-500 hover:bg-gray-800'
              >
                <MoreHorizontal className='h-5 w-5' />
              </Button>
            </div>
          </CardHeader>

          <CardContent className='px-0 pt-0'>
            <div className='space-y-4'>
              <p className='text-lg leading-relaxed whitespace-pre-wrap text-white'>
                {feedData.content}
              </p>

              {feedData.imageUrl && (
                <div className='flex space-x-2 overflow-x-auto rounded-2xl border border-gray-800 p-2'>
                  {feedData.imageUrl.split(',').map((url, idx) => (
                    <img
                      key={idx}
                      src={url.trim()}
                      alt={`게시물 이미지 ${idx + 1}`}
                      className='h-auto w-48 rounded-lg object-cover'
                    />
                  ))}
                </div>
              )}

              {/* Timestamp */}
              <div className='border-t border-gray-800 pt-4 text-sm text-gray-500'>
                {FullDate(feedData.createdAt)}
              </div>
              <NewComment
                isOpen={false}
                onClose={() => {}}
                feedID={feedData.feedID}
              />

              {/* Action Buttons */}
              <div className='flex max-w-md items-center justify-between border-t border-gray-800 pt-4'>
                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center space-x-2 text-gray-500 hover:bg-blue-400/10 hover:text-blue-400'
                >
                  <MessageCircle className='h-5 w-5' />
                  <span className='text-sm'>{feedData.Comment.length}</span>
                </Button>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleRetweet}
                  className={`flex items-center space-x-2 ${
                    retweeted
                      ? 'text-green-400 hover:bg-green-400/10 hover:text-green-300'
                      : 'text-gray-500 hover:bg-green-400/10 hover:text-green-400'
                  }`}
                >
                  <Repeat2 className='h-5 w-5' />
                  <span className='text-sm'>리트윗</span>
                </Button>

                <Button
                  variant='ghost'
                  size='sm'
                  onClick={handleLike}
                  className={`flex items-center space-x-2 ${
                    liked
                      ? 'text-red-500 hover:bg-red-500/10 hover:text-red-400'
                      : 'text-gray-500 hover:bg-red-500/10 hover:text-red-500'
                  }`}
                >
                  <Heart className={`h-5 w-5 ${liked ? 'fill-current' : ''}`} />
                  <span className='text-sm'>좋아요</span>
                </Button>

                <Button
                  variant='ghost'
                  size='sm'
                  className='flex items-center space-x-2 text-gray-500 hover:bg-blue-400/10 hover:text-blue-400'
                >
                  <Share className='h-5 w-5' />
                  <span className='text-sm'>공유</span>
                </Button>
              </div>
              {/* Comments Section */}
              <div className='mt-6'>
                <h2 className='flex items-center space-x-2 text-lg font-semibold text-white'>
                  <span>댓글</span>
                  <span>{feedData.Comment.length}</span>
                </h2>
                {feedData.Comment.length > 0 ? (
                  feedData.Comment.map((comment, index) => (
                    <div
                      key={index}
                      className='mt-4 rounded-lg bg-gray-800 p-4'
                    >
                      <div className='flex items-start space-x-3'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage
                            src={`/placeholder.svg?height=32&width=32`}
                          />
                          <AvatarFallback className='bg-gray-700 text-white'>
                            {comment.userID}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='flex items-center space-x-2'>
                            <span className='font-bold text-white'>
                              {comment.userID}
                            </span>
                            <span className='text-gray-500'>
                              {formatDate(comment.createdAt)}
                            </span>
                          </div>
                          <p className='mt-1 text-sm text-gray-300'>
                            {comment.content}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className='mt-4 text-gray-500'>아직 댓글이 없습니다.</p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
