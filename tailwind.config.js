/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0f0e17",
        primary: "#ff8906",
        secondary: "#f25f4c",
        tertiary: "#e53170",
        headline: "#ffffff",
        paragraph: "#a7a9be",
      },
      fontFamily: {
        sans: ["RobotoSlab", "serif"],
      },
    },
  },
  plugins: [],
};
