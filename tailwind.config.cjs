/** @type {import('tailwindcss').Config} */

const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    extend: {},
    colors: {
      primary: "#307DF6",
      'th-white': "#FFFFFF",
      'th-black': "#4E596B",
      'th-gray': "#F4F6FF",
      'grid-gray': "#D7E1F4",
      'th-danger': "#BD1C4D",
    },
    fontFamily: {
      sans: ["Inter", ...defaultTheme.fontFamily.sans],
    }
  },
  plugins: [],
}
