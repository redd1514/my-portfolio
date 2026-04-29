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
    },
  },

  plugins: [],
};


