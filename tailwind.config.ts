import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
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
        sans: ["RobotoSlab", "serif"], // Make RobotoSlab the default font
      },
    },
  },
  plugins: [],
};

export default config;
