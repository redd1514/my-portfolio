/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],

  theme: {
    extend: {
      colors: {
        border: "bg-gray-300",
        background: "bg-black",
        primary: "bg-gray-900",
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        }
      },
      animation: {
        'fade-in': 'fadeIn 1s ease-out',
      }
    },
  },

  plugins: [],
};


