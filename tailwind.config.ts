/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'primary': '#ef233c',
      'primary-dark': '#d90429',
      'light': '#edf2f4',
      'surface': '#8d99ae',
      'surface-dark': '#2b2d42'
    },
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },
    extend: {},
  },
  plugins: [],
}