/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'login': 'url(./assets/images/backgr.jpeg)'
      }
    },
  },
  plugins: [],
}
