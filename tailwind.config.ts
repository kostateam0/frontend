// tailwind.config.ts
import { type Config } from 'tailwindcss';
// import animate from "tailwindcss-animate";

const config: Config = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: 'hsl(var(--primary))',
        secondary: 'hsl(var(--secondary))',
        destructive: 'hsl(var(--destructive))',
        muted: 'hsl(var(--muted))',
        accent: 'hsl(var(--accent))',
        popover: 'hsl(var(--popover))',
        card: 'hsl(var(--card))',
      },
    },
  },
  //   plugins: [animate],
};
export default config;
