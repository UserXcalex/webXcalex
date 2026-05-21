import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        navy: {
          950: "#02020a",
          900: "#07070f",
          800: "#0c1224",
          700: "#111827",
          600: "#1f2937",
        },
        accent: {
          DEFAULT: "#3B82F6",
          dark: "#2563EB",
          light: "#60A5FA",
          violet: "#8b5cf6",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-del": "float-delayed 7s ease-in-out 1.5s infinite",
        "glow-pulse": "glow-pulse 2.8s ease-in-out infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
