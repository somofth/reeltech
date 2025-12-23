/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#FF6347', // Tomato Red
      },
      screens: {
        'xs': '480px',
      },
      fontFamily: {
        sans: ['Pretendard', 'Inter', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
