import { useEffect, useState } from "react";

const Mypage = () => {
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
        try {
          const res = await fetch("http://localhost:4000/authkit/user/profile", {
            credentials: "include",
          });
          if (!res.ok) throw new Error("인증 실패");
      
          const data = await res.json();
          console.log("✅ user data:", data); // 👈 콘솔로 구조 확인
      
          // 구조가 { user: { name, email } } 이라면:
          setUser(data.user);
        } catch (err) {
          console.error(err);
          setUser(null);
        } finally {
          setLoading(false);
        }
      };
      

    fetchUser();
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:4000/authkit/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    window.location.href = "/login";
  };

  if (loading) return <div className="text-center mt-10">로딩 중...</div>;

  if (!user)
    return (
      <div className="text-center mt-10 text-red-500">
        로그인 정보가 없습니다. <a href="/login" className="underline">로그인</a>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#fff7b1] flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[30px] border-4 border-black flex flex-col md:flex-row overflow-hidden shadow-lg">
        {/* 좌측 트롤 이미지 영역 */}
        <div className="w-full md:w-1/2 p-6 bg-[#eee] border-r-4 border-black flex justify-center items-center">
          <img src="/assets/troll.png" alt="Troll" className="w-60 h-auto" />
        </div>

        {/* 우측 마이페이지 정보 */}
        <div className="w-full md:w-1/2 p-10 space-y-5 text-black">
          <h2 className="text-3xl font-extrabold text-center">트롤 마이페이지</h2>

          <div className="space-y-4 text-center text-lg">
            <p><strong>이름:</strong> {user.name}</p>
            <p><strong>이메일:</strong> {user.email}</p>
          </div>

          <button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-2 rounded-full border-2 border-black transition"
          >
            로그아웃
          </button>
        </div>
      </div>
    </div>
  );
};

export default Mypage;
