/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#1e1e2f", // Deep indigo-black
        primary: "#ff6f3c", // Warm tangerine orange
        secondary: "#ffa36c", // Soft peach
        tertiary: "#e63946", // Vivid scarlet
        headline: "#f8f8f8", // Almost white
        paragraph: "#a6a9b6", // Cool muted gray
      },
    },
  },
  plugins: [],
};

/*{
        background: "#0f0e17",
        primary: "#ff8906",
        secondary: "#f25f4c",
        tertiary: "#e53170",
        headline: "#ffffff",
        paragraph: "#a7a9be",

        "#ffffff",
        primary: "#ffa45b",
        secondary: "#ffda77",
        tertiary: "#ff7b54",
        headline: "#2d4059",
        paragraph: "#4e5d6c",
      } */
