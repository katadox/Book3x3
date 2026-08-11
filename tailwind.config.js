/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090e',
          900: '#0d1117',
          850: '#121721',
          800: '#181f2c',
          700: '#222b3d',
          600: '#303b52',
        },
        amber: {
          450: '#f69d1b',
        },
        book: {
          gold: '#dfa649',
          crimson: '#9e2a2b',
          parchment: '#f4ebd0',
          darkBg: '#0b0d12',
          cardBg: '#141822',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
        display: ['Cinzel', 'Playfair Display', 'serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 25px -5px rgba(223, 166, 73, 0.25)',
        'glow-lg': '0 0 40px -5px rgba(223, 166, 73, 0.35)',
        'book': '0 10px 30px -5px rgba(0, 0, 0, 0.5), 0 2px 6px rgba(0, 0, 0, 0.4)',
        'cell': '0 4px 20px -2px rgba(0, 0, 0, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out forwards',
        'scale-up': 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulseSubtle 3s infinite ease-in-out',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleUp: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
}
