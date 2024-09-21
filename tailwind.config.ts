/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const { fontFamily } = defaultTheme;
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,scss}",
    "./components/**/*.{js,ts,jsx,tsx,scss}",
    "./common/**/*.{js,ts,jsx,tsx,scss}",
    "./layouts/**/*.{js,ts,jsx,tsx,scss}",
    "./modules/**/*.{js,ts,jsx,tsx,scss}",
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          800: "#071C4D",
        },
        grey: {
          100: "#F4F6F9",
          600: "#838DA6",
        },
      },
    },
    fontFamily: {
      sans: ["Inter", ...fontFamily.sans],
    },
  },
  plugins: [],
};
