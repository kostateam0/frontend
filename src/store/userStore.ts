import { create } from "zustand";

// interface Feed {
//   content: string;
//   createdAt: string;
// }

// interface Bet {
//   matchId: number;
//   team: string;
//   amount: number;
//   createdAt: string;
// }

interface User {
  id: string;
  email: string;
  name: string | null;
  point: number;
  role: string;
  provider: string;
  createdAt: string;
  isBanned: boolean;
  feeds: { content: string; createdAt: string }[];
  bets: { matchId: number; team: string; amount: number; createdAt: string }[];
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
