/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        softPink: "#F6D6DA",
        brandBrown: "#4B2E2E",
        accentPink: "#E88997",
        darkText: "#6B4B4B",
        cream: "#FFF4F4",
      },

      animation: {
        "bounce-slow": "bounce 8s infinite",
      },
    },
  },
  plugins: [],
};
