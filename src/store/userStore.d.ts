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
interface User {
    id: string;
    email: string;
    name: string;
    point: number;
    feeds?: Feed[];
    bets?: Bet[];
}
interface UserStore {
    user: User | null;
    accessToken: string | null;
    isLoggedIn: boolean;
    setUser: (user: User, token: string) => void;
    logout: () => void;
}
export declare const useUserStore: import("zustand").UseBoundStore<import("zustand").StoreApi<UserStore>>;
export {};
