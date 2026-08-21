/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        bg: {
          darker: '#090d16',
          dark: '#0d121d',
          card: '#131926',
          cardHover: '#1a2234',
          border: '#222d42',
        },
        accent: {
          cyan: '#38bdf8',
          violet: '#818cf8',
          mint: '#64ffda',
          coral: '#f87171',
          amber: '#fbbf24',
          blue: '#60a5fa',
          purple: '#c084fc',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        display: ['Bricolage Grotesque', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
