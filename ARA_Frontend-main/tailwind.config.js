/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '860px': '860px',
        '980px': '980px',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        cream: {
          DEFAULT: '#fef9f2',
        },
        pink: {
          DEFAULT: '#ffe3e3',
          100: '#ffeaea',
        },
        blue: {
          DEFAULT: '#6b8daa',
          100: '#234561',
          200: '#BBC7E0',
          300: '#E7ECF6',
          400: '#0951AE',
          500: '#AEBECB',
        },
        green: {
          DEFAULT: '#C9E9D2',
          100: '#2F822F',
        },
        purple: {
          DEFAULT: '#7E75D1',
        },
      },
      animation: {
        spin: 'spin 1s linear infinite', // Default spin animation
        spinSlow: 'spin 3s linear infinite', // Increase duration to 3s
      },
      keyframes: {
        spin: {
          to: {
            transform: 'rotate(360deg)',
          },
        },
      },
      
    },
  },
  
  plugins: [],
}
