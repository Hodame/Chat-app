/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ['"PT Sans"', 'sans-serif']
    },
    extend: {
      animation: {
        'message-appear': 'message-appear 0.3s ease-in-out '
      },
      keyframes: {
        'message-appear': {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        }
      },
      colors: {
        'primary': '#6B8AFD',
        'dark': '#131313',
        'background': '#202329',
        'surface': '#2E333D',
        'light': '#B0B5C1 '
      },
    },
  },
  plugins: [],
}