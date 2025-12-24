
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#2D3142',
        accent: '#4F9D69',
        brandGray: '#F4F4F9'
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '3rem'
      }
    }
  },
  plugins: [],
}
