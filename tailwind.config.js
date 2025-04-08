/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
    ],
    darkMode: "class", // Dark mode is enabled through class strategy enable
    theme: {
      extend: {
        colors: {
          'brand-blue': '#1e3a8a',
          'brand-purple': '#7c3aed',
        },
      },
    },
    plugins: [],
  }
  