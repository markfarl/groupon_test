/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ]
 ,
 darkMode: "class",
  theme: {
    extend: {
      backgroundColor: {
        "home-light": "#dcffd8",
        "home-dark": "#191919",
        "search-light": "#f3f3f3",
        "search-dark": "#191919",
        "search-icon": "#ffac6d",
      },
      fontFamily: {
        'Bowlby': 'Bowlby One SC',
      },
      colors: {
        "border-line" : "#ffac6d",
        "border-grey-line" : "aaaaaa"
      }
    },
  },
  plugins: [],
}

