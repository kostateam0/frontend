import { useNavigate, useLocation } from 'react-router-dom';
import { Trophy, Home, Search, User } from 'lucide-react';
import LoginButton from '@/components/LoginButton';
import { useEffect, useState } from 'react';

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
    { icon: Home,   label: '홈',      path: '/' },
    { icon: Search, label: '전적검색', path: '/search' },
    { icon: User,   label: '프로필',  path: '/mypage' },
  ];

  return (
    <aside className="hidden lg:flex w-[250px] flex-col border-r bg-[#111111] border-[#2A2A2A]">
      <div className="h-full flex flex-col p-4">
        <div className="px-4 py-3 mb-4 rounded-lg flex items-center gap-2 font-bold text-lg text-white bg-[#4A6741]">
          <Trophy className="w-5 h-5 text-[#FFD700]" /> Dark Troll Tracker
        </div>

        <nav className="space-y-2 flex-1">
          {menu.map(({ icon: Icon, label, path }) => (
            <button
              key={path}
              onClick={() => nav(path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm hover:bg-gray-800/50 ${
                loc.pathname === path ? 'bg-gray-800/50' : ''
              }`}
              style={{ color: '#B0B0B0' }}
            >
              <Icon className="w-5 h-5 text-[#4A6741]" />
              {label}
            </button>
          ))}
        </nav>

        <div className="mt-4">
          {user ? (
            <LoginButton isLoggedIn nickname="MoneyMonkey" handle="MoneyMonkeycC8" avatarUrl="/monkey-avatar.png" />
          ) : (
            <LoginButton isLoggedIn={false} />
          )}
        </div>

        <div className="mt-auto text-center text-xs text-[#4A6741]/70">© DarkTroll</div>
      </div>
    </aside>
  );
}
