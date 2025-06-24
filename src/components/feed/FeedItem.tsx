import { Ellipsis } from "lucide-react";

type FeedItemProps = {
  feed: {
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
};

export default function FeedItem({ feed }: FeedItemProps) {
  return (
    <div className='rounded-xl bg-[#2A2A2E] p-4 text-white shadow transition hover:shadow-lg'>
      {/* 상단 정보 영역 */}
      <div className='mb-2 flex items-center justify-between'>
        <div className='flex items-center space-x-2'>
          <div className='h-12 w-12 rounded-full bg-gray-500' />
          <div className='flex flex-col items-center justify-center gap-2'>
            <span className='ml-1 rounded bg-yellow-600 px-2 py-0.5 text-xs font-semibold text-black'>
              Challenger
            </span>
            <span className='font-semibold'>{feed.userID}</span>
          </div>
          <span className='text-sm text-gray-400'>닉네임 #KR1</span>
          <span className='text-sm text-gray-400'>• {feed.createdAt} 전</span>
        </div>
        <Ellipsis />
      </div>

      {/* Content */}
      <div className='mt-2 flex items-center space-x-4 rounded-lg bg-[#1C1C1F] p-3'>
        {feed.content}
      </div>
    </div>
  );
}
