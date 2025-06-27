import FeedList from '@/components/feed/FeedList';

export default function Index() {
  return (
    <div className='space-y-6'>
      <div className='rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4'>
        <div className='text-sm text-gray-400'>다음 경기</div>
        <div className='mt-1 font-semibold text-[#E0E0E0]'>
          T1 vs Gen.G - 오늘 오후 7시
        </div>
      </div>

      <div className='text-lg font-semibold text-[#E0E0E0]'>커뮤니티 피드</div>
      <FeedList />
    </div>
  );
}
