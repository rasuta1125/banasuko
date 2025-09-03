/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        'navy': {
          600: '#0f172a',
          700: '#0a0f1c',
          800: '#050b14'
        },
        'cyber-blue': '#00f5ff',
        'cyber-green': '#39ff14',
        'cyber-pink': '#ff6b9d',
        'cyber-purple': '#8b5cf6',
        'cyber-orange': '#ff8c42'
      },
      fontFamily: {
        'orbitron': ['Orbitron', 'monospace']
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite alternate',
        'slide-up': 'slide-up 0.8s ease-out',
        'float': 'float 6s ease-in-out infinite'
      },
      keyframes: {
        'pulse-glow': {
          '0%': { 'box-shadow': '0 0 5px #00f5ff' },
          '100%': { 'box-shadow': '0 0 20px #00f5ff, 0 0 30px #8b5cf6' }
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      }
    }
  },
  plugins: []
}