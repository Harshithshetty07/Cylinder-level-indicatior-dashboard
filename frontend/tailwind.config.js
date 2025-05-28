/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}', // for app directory
    './pages/**/*.{js,ts,jsx,tsx}', // for pages directory
    './components/**/*.{js,ts,jsx,tsx}', // if you have component files
  ],
  theme: {
    extend: {
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1920px',
      },
    },
  },
  plugins: [],
}

