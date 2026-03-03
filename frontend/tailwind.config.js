/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'ayur-green': {
          light: '#F1F8F6', // Page backgrounds 
          DEFAULT: '#2D5A27', // Primary buttons/icons [cite: 26, 32]
          dark: '#1B3D18',
        },
        'ayur-orange': {
          DEFAULT: '#FF7D44', // "Book Consultation" & "Add to Cart" [cite: 68, 506]
          light: '#FFF2EC',
        },
        'ayur-beige': '#F9F7F2', // Card backgrounds [cite: 1]
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // For the modern digital feel 
      },
    },
  },
  plugins: [],
}