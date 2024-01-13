/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    colors: {
      ...colors,
      customDark: '#181818',
      customDarkText: 'white',
      customDarkShadow: '#282828',
      customLightBorder: '#eeeeee',
      customLightOverText: 'black',
      customDarkHoverBackground: '#f5e879',
      customLightHoverBackground: '#fff59d',
      unReadLightBackground: '#f9fafb',
      unReadDarkBackground: '#1F1F1F',
    },
  },
  plugins: [require('tailwindcss-all')],
};
