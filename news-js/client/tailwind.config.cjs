/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        mkt: {
          50: "#32d0ae",
          100: "#28c6a4",
          200: "#1ebc9a",
          300: "#14b290",
          400: "#0aa886",
          500: "#009e7c",
          600: "#009472",
          700: "#008a68",
          800: "#00805e",
          900: "#007654",
        },
      },
    },
  },
  plugins: [],
};
