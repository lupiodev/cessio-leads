/** @type {import('tailwindcss').Config} */
import tailwindForm from "@tailwindcss/forms"
export default {
  content: [
    "./src/App.tsx",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
  ],  
  theme: {
    extend: {},
    colors: {
      primary: "#00ADBB",
      heading: "#00416B",
      transparent: "transparent",
      black: "#000",
      dark: "#404040",
      light: "#D9D9D9",
      white: "#fff",
      gray: {
        100: "#F7F7F7",
        200: "#edf2f7",
        300: "#e2e8f0",
        400: "#cbd5e0",
        500: "#a0aec0",
        600: "#718096",
        700: "#4a5568",
        800: "#2d3748",
        900: "#1a202c",
      },
    },
    fontFamily: {
      custom: ['Raleway','sans-serif']
    }
  },
  plugins: [tailwindForm],
};
