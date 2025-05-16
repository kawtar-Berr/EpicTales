/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#7B61FF",
        secondary: "#4A90E2",
        gold: "#FFD700",
        navbar: "#2D2D3A",
        footer: "#2D2D3A",
        lightBg: "#F5F5FA",
      },
    },
  },
  plugins: [],
};
