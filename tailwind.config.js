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
          50:  '#edf8ff', // near-white tint — ultra-light backgrounds, hover surfaces
          100: '#d6efff', // very light — disabled backgrounds, subtle highlights
          200: '#aedeff', // light — light-mode card borders, soft badges
          300: '#72cbff', // medium-light — placeholder text, muted icons
          400: '#3dbcff', // medium — secondary buttons, active indicators
          500: '#31b7ff', // BASE — primary buttons, key CTAs, brand identity
          600: '#0a9de8', // medium-dark — hover states for primary buttons
          700: '#0880c2', // dark — focus rings, active nav links, pressed states
          800: '#0a6499', // deep — headings on light bg, dark text accents
          900: '#0b4a72', // deepest — high-contrast text on white, dark-mode bases
        },
      },
      fontFamily: {
        sans: ['Inter', 'Tajawal', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
