/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf0',
          100: '#d1fadd',
          200: '#a7f3c0',
          300: '#6ce697',
          400: '#3cd170',
          500: '#27a844', // Primary Brand Color
          600: '#158c31',
          700: '#126e29',
          800: '#145724',
          900: '#124820',
        }
      },
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
