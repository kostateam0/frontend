import { create } from "zustand";

interface User {
    id: string;
    email: string;
    name: string; // ✅ 반드시 추가!
    nickname?: string;
    rsoAccount?: {
      gameName: string;
      tagLine: string;
      puuid: string;
      profileIconId: number;
      summonerLevel: number;
    };
  }
  

interface UserStore {
  user: User | null;
  accessToken: string | null;
  isLoggedIn: boolean;
  setUser: (user: User, token: string) => void;
  logout: () => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  accessToken: null,
  isLoggedIn: false,

  setUser: (user, token) =>
    set({
      user,
      accessToken: token,
      isLoggedIn: true,
    }),

  logout: () =>
    set({
      user: null,
      accessToken: null,
      isLoggedIn: false,
    }),
}));
