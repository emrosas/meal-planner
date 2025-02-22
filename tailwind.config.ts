import type { Config } from "tailwindcss";
import fluid, { extract, fontSize, screens } from "fluid-tailwind";

export default {
  content: {
    files: [
      "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
      "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    extract,
  },
  theme: {
    screens,
    fontSize,
    extend: {
      fontFamily: {
        chivo: ["Chivo", "sans-serif"],
        besley: ["Besley", "serif"],
      },
      colors: {
        dark: "#1E1E1E",
        grey: "#444444",
        light: "#F5F5F5",
      },
    },
  },
  plugins: [fluid],
} satisfies Config;
