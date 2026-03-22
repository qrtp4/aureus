import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  safelist: [
    { pattern: /^(bg|text|border)-gold(\/[0-9]+)?$/ },
    'shadow-gold',
    'shadow-gold-lg',
    'glow-gold',
    'glass-card',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F0D080',
          dark: '#8B6914',
        },
      },
      fontFamily: {
        cinzel: ['var(--font-cinzel)', 'serif'],
        playfair: ['var(--font-playfair)', 'serif'],
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #F0D080 0%, #D4AF37 50%, #8B6914 100%)',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease forwards',
        'fade-in': 'fadeIn 1s ease forwards',
        'pulse-gold': 'pulseGold 2s infinite',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 8px rgba(212, 175, 55, 0)' },
        },
      },
      boxShadow: {
        gold: '0 0 20px rgba(212, 175, 55, 0.15)',
        'gold-lg': '0 0 40px rgba(212, 175, 55, 0.2)',
        'gold-xl': '0 0 80px rgba(212, 175, 55, 0.25)',
      },
    },
  },
  plugins: [],
};

export default config;
