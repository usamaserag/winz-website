/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#edf8ff',
          100: '#d6efff',
          200: '#aedeff',
          300: '#72cbff',
          400: '#3dbcff',
          500: '#31b7ff',
          600: '#0a9de8',
          700: '#0880c2',
          800: '#0a6499',
          900: '#0b4a72',
        },
        navy: {
          50:  '#f4f7fb',
          100: '#e8eef6',
          200: '#cdd9ea',
          300: '#a3b8d4',
          400: '#6f8fb3',
          500: '#4a6f94',
          600: '#375a7a',
          700: '#2d4963',
          800: '#1e3348',
          900: '#152638',
          950: '#0c1826',
        },
      },
      fontFamily: {
        sans: ['Inter Variable', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
