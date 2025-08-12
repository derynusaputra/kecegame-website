// Tailwind v4 config loaded via @config directive in CSS
// HeroUI plugin and content paths
import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [heroui()],
};

