import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#6366f1",
          DEFAULT: "#4f46e5",
          dark: "#4338ca",
        },
        secondary: {
          light: "#f472b6",
          DEFAULT: "#db2777",
          dark: "#be185d",
        },
      },
    },
  },
  plugins: [],
};
export default config;
