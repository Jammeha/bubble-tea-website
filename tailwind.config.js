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
        "bounce-slower": "bounce 12s infinite",
        "gradient-x": "gradient-x 15s ease infinite",
        "spin-slow": "spin 20s linear infinite",
        "shake": "shake 0.5s ease-in-out",
      },
      keyframes: {
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)' },
          '75%': { transform: 'translateX(-5px)' },
        },
        'gradient-x': {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center',
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center',
          },
        },
      },
    },
  },
  plugins: [],
};
