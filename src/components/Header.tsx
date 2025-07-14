// components/Header.tsx
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { NewFeedButton } from "./feed/NewFeedButton";


const Header = () => {
  const [user, setUser] = useState<{ email: string } | null>(null);

  useEffect(() => {
    fetch("http://192.168.0.42:4000/:4000/auth/me", {
      credentials: "include",
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Not logged in");
        const data = await res.json();
        setUser(data);
      })
      .catch(() => setUser(null));
  }, []);

  const handleLogout = async () => {
    await fetch("http://192.168.0.42:4000/:4000/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <header className="w-full p-4 md:px-8 border-b border-gray-200 bg-white sticky top-0 z-20 flex justify-between items-center">
      <h1 className="text-2xl font-extrabold text-[#7c3aed] tracking-wide">
        <Link to="/">TROLL</Link>
      </h1>
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-700">{user.email}</span>
            <button onClick={handleLogout} className="text-sm text-gray-500 hover:text-red-500">로그아웃</button>
          </div>
        ) : (
          <div className="flex gap-2 items-center justify-center">
            <NewFeedButton />
            <Link to="/login" className="text-sm text-purple-600 font-medium">로그인</Link>
            <Link to="/register" className="text-sm text-purple-600 font-medium">회원가입</Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
