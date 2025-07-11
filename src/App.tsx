import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TooltipProvider } from '@/components/ui/tooltip';
import { HashRouter, BrowserRouter, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

import MainLayout from './layout/MainLayout';
import Index from './pages/Index';
import SearchPage from './pages/SearchPage';
import Mypage from './pages/Mypage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import AuthInitializer from './components/AuthInitializer';
import Esports from './pages/EsportsPage';
import LeaderBoardPage from './pages/LeaderBoardPage';
import BetPage from './pages/BetPage';
import FeedDetailPage from './pages/FeedDetailPage';

const queryClient = new QueryClient();

// ✅ 환경 감지: Electron이면 HashRouter, 아니면 BrowserRouter
const isElectron = navigator.userAgent.toLowerCase().includes('electron');
const Router = isElectron ? HashRouter : BrowserRouter;

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Router>
          <AuthInitializer />
          <AnimatePresence mode="wait">
            <Routes>
              {/* MainLayout 적용 구간 */}
              <Route element={<MainLayout />}>
                <Route index element={<Index />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="esports" element={<Esports />} />
                <Route path="mypage" element={<Mypage />} />
                <Route path="bet" element={<BetPage />} />
                <Route path="feed/:feedID" element={<FeedDetailPage />} />
                <Route path="leaderboard" element={<LeaderBoardPage />} />
              </Route>

              {/* 로그인/회원가입 등 레이아웃 없는 페이지 */}
              <Route path="login" element={<LoginPage />} />
              <Route path="register" element={<RegisterPage />} />
            </Routes>
          </AnimatePresence>
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}
