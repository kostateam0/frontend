import React from "react";
import { useNavigate } from "react-router-dom";

interface LoginButtonProps {
  isLoggedIn: boolean;
  nickname?: string;
  handle?: string;
  avatarUrl?: string;
  onClick?: () => void; // ✅ 로그인 안됐을 때 실행할 함수
}

const LoginButton: React.FC<LoginButtonProps> = ({
  isLoggedIn,
  nickname,
  handle,
  avatarUrl,
  onClick,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isLoggedIn) {
      navigate("/settings"); // 로그인 상태이면 설정 페이지로 이동
    } else {
      onClick?.(); // 로그인 안된 경우: 전달된 onClick 실행
    }
  };

  return (
    <button
      onClick={handleClick}
      className="flex items-center w-full gap-3 p-3 rounded-lg hover:bg-[#222] transition-colors"
    >
      {isLoggedIn ? (
        <>
          <img
            src={avatarUrl}
            alt="avatar"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div className="flex flex-col overflow-hidden text-left">
            <div className="flex items-center gap-1 text-white font-bold leading-none">
              <span className="truncate">{nickname}</span>
              <img src="/blue-check.png" alt="verified" className="w-4 h-4" />
            </div>
            <span className="text-gray-400 text-sm truncate">@{handle}</span>
          </div>
          <div className="ml-auto text-gray-400 text-xl font-bold">…</div>
        </>
      ) : (
        <span className="text-white text-sm font-medium">로그인</span>
      )}
    </button>
  );
};

export default LoginButton;
