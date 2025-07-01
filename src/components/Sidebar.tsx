import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Home, Search, User, Coins } from 'lucide-react';
import LoginButton from '@/components/LoginButton';
import { useEffect, useState } from 'react';
import NewFeed from './feed/NewFeed';
import { NewFeedButton } from './feed/NewFeedButton';

export default function Sidebar() {
  const nav = useNavigate();
  const loc = useLocation();
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch('http://localhost:4000/auth/me', { credentials: 'include' })
      .then(async (r) => (r.ok ? setUser(await r.json()) : setUser(null)))
      .catch(() => setUser(null));
  }, []);

  const menu = [
    { icon: Home, label: '홈', path: '/' },
    { icon: Search, label: '전적검색', path: '/search' },
    { icon: Trophy, label: 'e-스포츠', path: '/esports' },
    { icon: User, label: '프로필', path: '/mypage' },
    { icon: Coins, label: '배팅', path: '/bet' },
  ];

  return (
    <aside className='hidden w-[250px] flex-col border-r border-[#2A2A2A] bg-[#111111] lg:flex'>
      <div className='flex h-full flex-col p-4'>
        <div className='mb-4 flex items-center gap-2 rounded-lg bg-[#4A6741] px-4 py-3 text-lg font-bold text-white'>
          <Trophy className='h-5 w-5 text-[#FFD700]' /> Dark Troll Tracker
        </div>

        <nav className='flex-1 space-y-2'>
          {menu.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => nav(path)}
              className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm hover:bg-gray-800/50 ${
                loc.pathname === path ? 'bg-gray-800/50' : ''
              }`}
              style={{ color: '#B0B0B0' }}
            >
              <Icon className='h-5 w-5 text-[#4A6741]' />
              {label}
            </button>
          ))}
        </nav>
        <NewFeedButton />
        <div className='mt-4'>
          {user ? (
            <LoginButton
              isLoggedIn
              nickname='MoneyMonkey'
              handle='MoneyMonkeycC8'
              avatarUrl='/monkey-avatar.png'
            />
          ) : (
            <LoginButton isLoggedIn={false} />
          )}
        </div>

        <div className='mt-auto text-center text-xs text-[#4A6741]/70'>
          © DarkTroll
        </div>
      </div>
    </aside>
  );
}
