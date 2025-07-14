import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';

export default defineConfig(({ mode }) => ({
  base: './', // ✅ 이 줄만 추가하면 Electron에서 경로 깨짐 해결됨!
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://192.168.0.42:4000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
      },
    },
  },

  define: {
    'process.env.VITE_DEV_SERVER_URL':
      mode === 'development' ? '"http://localhost:5173"' : 'undefined',
  },
}));
