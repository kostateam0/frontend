// src/components/AuthInitializer.tsx
import { useEffect } from "react";
import { useUserStore } from "@/store/userStore";

export default function AuthInitializer() {
  const { setUser } = useUserStore();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("http://192.168.0.42:4000/authkit/auth/me", {
          credentials: "include",
        });
        if (!res.ok) return;

        const data = await res.json();
        const token = ""; // JWT 토큰을 별도로 저장했다면 여기서 불러올 수 있음
        setUser(data.user, token);
      } catch (err) {
        console.warn("유저 인증 상태 확인 실패", err);
      }
    };

    fetchUser();
  }, []);

  return null;
}
