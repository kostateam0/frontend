// pages/Index.tsx

import React, { useState, useEffect } from 'react';
import SummonerSearch from '../components/SummonerSearch';
import SummonerInfo from './SummonerInfo';
import {
  Trophy,
  Home,
  Search,
  Hash,
  Users,
  Bell,
  Bookmark,
  User,
  Settings,
} from 'lucide-react';
import NewFeed from '@/components/feed/NewFeed';
import { NewFeedButton } from '@/components/feed/NewFeedButton';
import FeedList from '@/components/feed/FeedList';
import ChatCard from '@/components/chat/ChatCard';
import { ChatAccordion } from '@/components/chat/ChatAccordion';

const Index = () => {
  const [activeView, setActiveView] = useState<'feed' | 'search' | 'settings'>(
    'feed',
  );
  const [searchQuery, setSearchQuery] = useState<{
    region: string;
    summonerName: string;
    tag: string;
  } | null>(null);
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/auth/me', {
      credentials: 'include',
    })
      .then(async (res) => {
        if (!res.ok) throw new Error('Not logged in');
        const data = await res.json();
        setUser(data);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:4000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setUser(null);
    window.location.href = '/';
  };

  return (
    <div
      className='flex h-screen max-w-full flex-col items-center justify-center overflow-hidden'
      style={{ backgroundColor: '#0A0A0A' }}
    >
      {/* 헤더 */}
      <div
        className='flex items-center justify-between border-b p-4 lg:hidden'
        style={{ backgroundColor: '#151515', borderColor: '#2A2A2A' }}
      >
        <h1
          className='flex items-center gap-2 text-lg font-bold'
          style={{ color: '#E0E0E0' }}
        >
          <Trophy className='h-5 w-5' style={{ color: '#8B6914' }} />
          Dark Troll
        </h1>
      </div>

      {/* 본문 */}
      <div className='flex max-w-7xl flex-1 overflow-hidden'>
        {/* 왼쪽 사이드바 */}
        <aside
          className='hidden w-[250px] flex-col border-r lg:flex'
          style={{ backgroundColor: '#111111', borderColor: '#2A2A2A' }}
        >
          <div className='flex h-full flex-col p-4'>
            {/* 로고 */}
            <div
              className='mb-4 flex items-center justify-center gap-2 rounded-lg px-4 py-3 text-lg font-bold text-white'
              style={{ height: 48 }}
            >
              <img
                src='/TrollLogo.svg'
                alt=''
                style={{
                  width: 200,
                  height: 200,
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>
            {/* 메뉴 */}
            <nav className='flex-1 space-y-2'>
              {[
                {
                  icon: Home,
                  label: '홈',
                  onClick: () => {
                    setActiveView('feed');
                    setSearchQuery(null);
                  },
                },
                {
                  icon: Search,
                  label: '전적검색',
                  onClick: () => {
                    setActiveView('search');
                    setSearchQuery(null);
                  },
                },
                { icon: Trophy, label: '랭킹' },
                { icon: Hash, label: '챔피언' },
                { icon: Users, label: '팀' },
                { icon: Bell, label: '알림' },
                { icon: Bookmark, label: '북마크' },
                { icon: User, label: '프로필' },
                {
                  icon: Settings,
                  label: '설정',
                  onClick: () => setActiveView('settings'),
                },
              ].map(({ icon: Icon, label, onClick }, idx) => (
                <button
                  key={idx}
                  onClick={onClick}
                  className='flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition-colors hover:bg-gray-800/50'
                  style={{ color: '#B0B0B0' }}
                >
                  <Icon className='h-5 w-5' style={{ color: '#4A6741' }} />
                  {label}
                </button>
              ))}
            </nav>
            <NewFeedButton />

            {/* 푸터 */}
            <div className='mt-auto text-center text-xs text-[#4A6741] opacity-10'>
              © DarkTroll
            </div>
          </div>
        </aside>

        {/* 중앙 영역 */}
        <main
          id='scrollable-main'
          className='flex-1 overflow-y-auto px-4 pt-4 pb-24 lg:pb-4 min-w-3xl w-full'
          style={{ backgroundColor: '#0A0A0A' }}
        >
          <div className='mx-auto max-w-4xl w-full'>
            {activeView === 'feed' && (
              <div className='space-y-6'>
                <div className='rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 shadow-md'>
                  <div className='text-sm text-gray-400'>다음 경기</div>
                  <div className='mt-1 font-semibold text-[#E0E0E0]'>
                    T1 vs Gen.G - 오늘 오후 7시
                  </div>
                </div>

                <div className='rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4 shadow-md'>
                  <div className='text-sm text-gray-400'>🎯 베팅 이벤트</div>
                  <div className='mt-1 font-semibold text-[#8B6914]'>
                    승부 예측하고 보상 받기
                  </div>
                </div>
                <div className='text-lg font-semibold text-[#E0E0E0]'>
                  커뮤니티 피드
                </div>
                <FeedList />
              </div>
            )}

            {activeView === 'search' &&
              (searchQuery ? (
                <SummonerInfo
                  region={searchQuery.region}
                  summonerName={searchQuery.summonerName}
                  tag={searchQuery.tag}
                />
              ) : (
                <div className='flex min-h-[60vh] items-center justify-center'>
                  <SummonerSearch onSearch={setSearchQuery} />
                </div>
              ))}

            {activeView === 'settings' && (
              <div className='space-y-2 text-sm text-[#E0E0E0]'>
                <div className='mb-2 text-lg font-bold'>설정</div>
                {user ? (
                  <div>
                    <p className='text-gray-400'>로그인됨: {user.email}</p>
                    <button
                      onClick={handleLogout}
                      className='mt-2 rounded bg-red-600 px-4 py-2 text-sm text-white'
                    >
                      로그아웃
                    </button>
                  </div>
                ) : (
                  <a href='/login' className='text-[#4A6741] underline'>
                    로그인
                  </a>
                )}
              </div>
            )}
          </div>
        </main>

        {/* 오른쪽 사이드바 */}
        <aside
          className='hidden w-80 border-l p-4 xl:block space-y-4 max-h-screen overflow-y-auto'
          style={{ backgroundColor: '#111111', borderColor: '#2A2A2A' }}
        >
          <div className='mb-4 text-lg font-bold text-[#8B6914]'>
            eSports 경기 정보
          </div>
          <div className='space-y-4'>
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className='rounded-xl border border-[#2A2A2A] bg-[#1A1A1A] p-4'
              >
                <div className='text-sm text-gray-400'>6월 20일 | LCK</div>
                <div className='mt-1 font-semibold text-[#E0E0E0]'>
                  T1 vs Gen.G
                </div>
                <div className='mt-1 text-sm text-gray-400'>오후 7시 시작</div>
              </div>
            ))}
          </div>
          <ChatAccordion />
          {/* <ChatCard /> */}
        </aside>
      </div>

      {/* 모바일 하단 네비게이션 */}
      <aside className='fixed bottom-0 z-30 flex w-full items-center justify-around border-t border-[#2A2A2A] bg-[#151515] p-3 text-[18px] lg:hidden'>
        <button
          onClick={() => {
            setActiveView('feed');
            setSearchQuery(null);
          }}
        >
          🏠
        </button>
        <button
          onClick={() => {
            setActiveView('search');
            setSearchQuery(null);
          }}
        >
          🔍
        </button>
        <button>🎮</button>
        <button>💸</button>
        <button>⚔️</button>
        <button onClick={() => setActiveView('settings')}>⚙️</button>
      </aside>
    </div>
  );
};

export default Index;
