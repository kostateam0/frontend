import { useNavigate } from 'react-router-dom';

export default function MobileNav() {
  const nav = useNavigate();
  return (
    <aside className="fixed lg:hidden bottom-0 z-30 flex w-full items-center justify-around border-t border-[#2A2A2A] bg-[#151515] p-3 text-[18px]">
      <button onClick={() => nav('/')}>🏠</button>
      <button onClick={() => nav('/search')}>🔍</button>
      <button onClick={() => nav('/mypage')}>⚔️</button>
    </aside>
  );
}
