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
          darker: '#0a0d14',
          dark: '#0d1117',
          card: '#161b22',
          cardHover: '#1c2128',
          border: '#30363d',
        },
        accent: {
          mint: '#64ffda',
          coral: '#ff8383',
          amber: '#ffb454',
          blue: '#58a6ff',
          purple: '#bc8cff',
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
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
