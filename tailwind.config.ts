// tailwind.config.ts
import { type Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: '#2A2A2A',
        input: '#1A1A1A',
        ring: '#4A6741',
        background: '#0A0A0A',
        foreground: '#E0E0E0',
        primary: '#4A6741',
        secondary: '#8B6914',
        destructive: '#4A2A2A',
        muted: '#666666',
        accent: '#6B4423',
        popover: '#151515',
        card: '#1A1A1A',
      },
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive'],
      },
    },
  },
};

export default config;
