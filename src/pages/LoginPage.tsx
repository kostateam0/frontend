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
        credentials: "include", // ✅ 세션 쿠키 전송
        body: JSON.stringify({ email, password }),
      });

      const text = await res.text(); // 혹시 JSON 응답이 아닐 경우를 대비

      if (!res.ok) {
        throw new Error(`로그인 실패: ${text}`);
      }

      // 로그인 성공 시 페이지 이동
      window.location.href = "/mypage";
    } catch (err) {
      setError("로그인 실패: 이메일 또는 비밀번호를 확인해주세요.");
      console.error(err);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">로그인</h2>
      <input
        className="border w-full p-2 mb-2"
        placeholder="이메일"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className="border w-full p-2 mb-2"
        placeholder="비밀번호"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button
        className="bg-purple-600 text-white px-4 py-2 w-full"
        onClick={handleLogin}
      >
        로그인
      </button>
      {error && <p className="text-red-500 mt-2">{error}</p>}
    </div>
  );
};

export default LoginPage;
