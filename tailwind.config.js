/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors:{
        // Custom AODA compliant colors
        wordle:{
          bg: '#0f0f23',
    surface: '#1a1a2e',
    border: '#3d3d5c',
    text: '#f0f0f5',
    muted: '#8888aa',
    correct: '#538d4e',   
    present: '#c9b458',     
    'present-text': '#1a1a1a', 
    absent: '#3a3a4d', 
    'key-bg': '#818396',
    'key-text': '#ffffff',
        }
      },
      animation: {
        'flip': 'flip 0.6s ease-in-out',
        'shake': 'shake 0.5s ease-in-out',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateX(0deg)' },
          '50%': { transform: 'rotateX(-90deg)' },
          '100%': { transform: 'rotateX(0deg)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '10%, 30%, 50%, 70%, 90%': { transform: 'translateX(-4px)' },
          '20%, 40%, 60%, 80%': { transform: 'translateX(4px)' },
        },
      },
    },
  },
  plugins: [],
}

