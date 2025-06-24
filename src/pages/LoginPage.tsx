import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      const res = await fetch("http://localhost:4000/authkit/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text();
      if (!res.ok) throw new Error(`로그인 실패: ${text}`);

      window.location.href = "/mypage";
    } catch (err) {
      setError("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      console.error(err);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:4000/authkit/auth/google";
  };

  const handleNaverLogin = () => {
    window.location.href = "http://localhost:4000/authkit/auth/naver";
  };

  return (
    <div className="min-h-screen bg-[#fff7b1] flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[30px] border-4 border-black flex flex-col md:flex-row overflow-hidden shadow-lg">
        {/* 좌측 이미지 영역 */}
        <div className="w-full md:w-1/2 p-6 bg-[#eee] border-r-4 border-black flex justify-center items-center">
          <img src="/assets/troll.png" alt="Troll" className="w-60 h-auto" />
        </div>

        {/* 우측 폼 영역 */}
        <div className="w-full md:w-1/2 p-10 space-y-5 text-black">
          <h2 className="text-3xl font-extrabold text-center">돌아온 트롤 로그인</h2>

          <input
            className="w-full p-3 border-2 border-black rounded-full text-sm placeholder-gray-500"
            placeholder="이메일을 입력해주세요"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="w-full p-3 border-2 border-black rounded-full text-sm placeholder-gray-500"
            placeholder="비밀번호"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full bg-[#7b5bff] hover:bg-[#6348d6] text-white font-bold py-2 rounded-full border-2 border-black transition"
            onClick={handleLogin}
          >
            🧙 로그인하기
          </button>

          {error && (
            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
          )}

          {/* 소셜 로그인 */}
          <div className="space-y-2 pt-4">
            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center bg-white border-2 border-black rounded-full py-2 hover:bg-gray-100"
            >
              <img src="/assets/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google로 로그인
            </button>
            <button
              onClick={handleNaverLogin}
              className="w-full flex items-center justify-center bg-[#03c75a] text-white border-2 border-black rounded-full py-2 hover:bg-[#02b24f]"
            >
              <img src="/assets/naver.svg" alt="Naver" className="w-5 h-5 mr-2" />
              Naver로 로그인
            </button>
          </div>

          <div className="text-center pt-4 text-xs">
            <p>계정이 없으신가요? <a href="/register" className="underline">회원가입 하기</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
