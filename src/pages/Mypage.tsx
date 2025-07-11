import { useEffect, useState } from "react";
import { useUserStore } from "@/store/userStore";
import {
  Heart, MessageCircle, Repeat2, Share, Trophy,
  TrendingUp, User, Mail, Coins, LogOut, UserX,
  Edit3, Check, X, ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { safeNavigate } from "@/utils/safeNavigate";

const TABS = ["dashboard", "feeds", "bets"] as const;
type Tab = typeof TABS[number];

interface Feed {
  content: string;
  createdAt: string;
}
interface Bet {
  matchId: number;
  team: string;
  amount: number;
  createdAt: string;
}
interface StatCardProps {
  icon: React.ElementType;
  label: string;
  value: string | number;
  color: string;
}
interface FeedCardProps { feed: Feed; }
interface BetCardProps { bet: Bet; }

const Mypage = () => {
  const { user, isLoggedIn, accessToken, setUser, logout } = useUserStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [tab, setTab] = useState<Tab>("dashboard");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("http://localhost:4000/authkit/user/profile", {
          method: "GET",
          credentials: "include",
          headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
        });
        if (!res.ok) throw new Error("인증 실패");
        const { user: profile } = await res.json();
        setUser(profile, accessToken ?? "");
      } catch {
        logout();
        safeNavigate(navigate, "/login");
      } finally {
        setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleAccountDelete = async () => {
    if (!confirm("정말로 탈퇴하시겠습니까?")) return;
    try {
      const res = await fetch("http://localhost:4000/authkit/user/delete", {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) throw new Error("탈퇴 실패");
      alert("회원 탈퇴가 완료되었습니다.");
      logout();
      safeNavigate(navigate, "/login");
    } catch {
      alert("오류가 발생했습니다.");
    }
  };

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:4000/authkit/user/logout", {
        method: "POST",
        credentials: "include",
      });
      logout();
      safeNavigate(navigate, "/login");
    } catch {
      alert("로그아웃 중 오류가 발생했습니다.");
    }
  };

  const handleSaveName = async () => {
    try {
      const res = await fetch("http://localhost:4000/authkit/user/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        credentials: "include",
        body: JSON.stringify({ name: editedName }),
      });
      if (!res.ok) throw new Error("수정 실패");
      if (user) setUser({ ...user, name: editedName }, accessToken!);
      setIsEditing(false);
    } catch {
      alert("수정 중 오류가 발생했습니다.");
    }
  };

  if (isLoading) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">⏳ 로딩 중...</div>;
  if (!isLoggedIn || !user) return <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center text-white">🔐 로그인 필요</div>;

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24 px-4 py-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-white">
            <ChevronLeft size={20} />
            <h1 className="text-xl font-bold">트롤 마이페이지</h1>
          </div>
          <div className="flex gap-2">
            <button onClick={handleLogout}><LogOut className="text-gray-400 hover:text-white" size={18} /></button>
            <button onClick={handleAccountDelete}><UserX className="text-red-500 hover:text-red-700" size={18} /></button>
          </div>
        </div>

        {/* Profile */}
        <div className="bg-[#1c1c1e] rounded-xl p-6 mb-6 shadow-lg text-white">
          <div className="flex items-center gap-4">
            <img src="/assets/troll.png" className="w-20 h-20 rounded-full border-2 border-yellow-500" />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                {isEditing ? (
                  <>
                    <input value={editedName} onChange={(e) => setEditedName(e.target.value)} className="bg-[#2c2c2e] px-2 py-1 text-white rounded" />
                    <button onClick={handleSaveName}><Check size={16} className="text-green-500" /></button>
                    <button onClick={() => setIsEditing(false)}><X size={16} className="text-gray-400" /></button>
                  </>
                ) : (
                  <>
                    <h2 className="text-2xl font-semibold">{user.name}</h2>
                    <button onClick={() => { setIsEditing(true); setEditedName(user.name ?? ""); }}><Edit3 size={16} className="text-gray-400" /></button>
                  </>
                )}
              </div>
              <p className="text-sm mt-1 flex items-center gap-1"><Mail size={14} /> {user.email}</p>
              <p className="text-sm mt-1 flex items-center gap-1"><Coins size={14} /> {user.point}P</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex mb-4">
          {TABS.map((t) => (
            <button
              key={t}
              className={`flex-1 py-2 rounded-t-md text-sm font-semibold ${
                tab === t ? "bg-yellow-500 text-black" : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => setTab(t)}
            >
              {t === "dashboard" ? "📊 대시보드" : t === "feeds" ? "📝 내가 쓴 글" : "🎯 베팅 목록"}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-[#1c1c1e] rounded-b-md p-6 text-white">
          {tab === "dashboard" && (
            <div className="grid grid-cols-2 gap-4">
              <StatCard icon={MessageCircle} label="총 피드" value={user.feeds?.length || 0} color="bg-blue-500" />
              <StatCard icon={Trophy} label="총 베팅" value={user.bets?.length || 0} color="bg-green-500" />
              <StatCard icon={TrendingUp} label="포인트" value={user.point} color="bg-purple-500" />
              <StatCard icon={User} label="등급" value="A+" color="bg-yellow-500" />
            </div>
          )}

          {tab === "feeds" && (
            <div className="space-y-4">
              {user.feeds.length === 0 ? (
                <p className="text-center text-gray-400 py-8">작성한 글이 없습니다.</p>
              ) : (
                user.feeds.map((feed: Feed, i: number) => (
                  <FeedCard key={i} feed={feed} />
                ))
              )}
            </div>
          )}

          {tab === "bets" && (
            <div className="space-y-4">
              {user.bets.length === 0 ? (
                <p className="text-center text-gray-400 py-8">베팅한 경기가 없습니다.</p>
              ) : (
                user.bets.map((bet: Bet, i: number) => (
                  <BetCard key={i} bet={bet} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ icon: Icon, label, value, color }: StatCardProps) => (
  <div className="bg-[#2c2c2e] rounded-lg p-4 shadow border border-gray-700 text-sm">
    <div className="flex items-center gap-3">
      <div className={`p-2 rounded-full ${color}`}><Icon size={20} className="text-white" /></div>
      <div>
        <div className="text-gray-400">{label}</div>
        <div className="text-lg font-bold text-white">{value}</div>
      </div>
    </div>
  </div>
);

const FeedCard = ({ feed }: FeedCardProps) => (
  <div className="bg-[#2a2a2a] rounded-lg p-4 shadow">
    <div className="flex items-start gap-3">
      <img src="/assets/troll.png" className="w-10 h-10 rounded-full" />
      <div className="flex-1">
        <div className="text-white font-semibold mb-1">{feed.content}</div>
        <div className="text-gray-400 text-xs">{new Date(feed.createdAt).toLocaleString()}</div>
        <div className="flex gap-4 mt-2 text-gray-500 text-sm">
          <MessageCircle size={14} />
          <Repeat2 size={14} />
          <Heart size={14} />
          <Share size={14} />
        </div>
      </div>
    </div>
  </div>
);

const BetCard = ({ bet }: BetCardProps) => (
  <div className="bg-[#2a2a2a] rounded-lg p-4 shadow">
    <div className="flex justify-between items-center mb-2">
      <div className="flex items-center gap-2">
        <Trophy size={16} className="text-yellow-500" />
        <span className="font-semibold text-white">Match #{bet.matchId}</span>
      </div>
      <span className="text-xs text-blue-400 font-medium">베팅중</span>
    </div>
    <div className="text-sm text-gray-300">
      <div>팀: {bet.team}</div>
      <div>베팅액: <span className="text-blue-400 font-bold">{bet.amount}P</span></div>
      <div className="text-xs text-gray-500">{new Date(bet.createdAt).toLocaleString()}</div>
    </div>
  </div>
);

export default Mypage;
