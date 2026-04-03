/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class", // 👈 enables manual dark mode toggle

  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // 👈 tells Tailwind where to look
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};


