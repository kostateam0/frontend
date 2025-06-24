// src/pages/RegisterPage.tsx

import { useState } from "react";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="min-h-screen bg-[#fff7b1] flex justify-center items-center p-6">
      <div className="w-full max-w-4xl bg-white rounded-[30px] border-4 border-black flex flex-col md:flex-row overflow-hidden shadow-lg">
        {/* 좌측 이미지 영역 */}
        <div className="w-full md:w-1/2 p-6 bg-[#eee] border-r-4 border-black flex justify-center items-center">
          <img src="/assets/troll.png" alt="Troll" className="w-60 h-auto" />
        </div>

        {/* 우측 폼 영역 */}
        <div className="w-full md:w-1/2 p-10 space-y-5 text-black">
          <h2 className="text-3xl font-extrabold text-center">귀염뽀짝 트롤 가입</h2>
          <input
            className="w-full p-3 border-2 border-black rounded-full text-sm placeholder-gray-500"
            placeholder="이름을 입력해주세요"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
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

          {/* 가입 버튼 */}
          <button className="w-full bg-[#00cc66] hover:bg-[#00b35a] text-white font-bold py-2 rounded-full border-2 border-black transition">
            🚀 가입하기
          </button>

          {/* 소셜 로그인 */}
          <div className="space-y-2 pt-4">
            <button className="w-full flex items-center justify-center bg-white border-2 border-black rounded-full py-2 hover:bg-gray-100">
              <img src="/assets/google.svg" alt="Google" className="w-5 h-5 mr-2" />
              Google로 가입
            </button>
            <button className="w-full flex items-center justify-center bg-[#03c75a] text-white border-2 border-black rounded-full py-2 hover:bg-[#02b24f]">
              <img src="/assets/naver.svg" alt="Naver" className="w-5 h-5 mr-2" />
              Naver로 가입
            </button>
          </div>

          {/* 하단 링크 */}
          <div className="text-center pt-4 text-xs">
            <p>이미 계정이 있으신가요? <a href="/login" className="underline">로그인 하기</a></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
