import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "15px",
      screens: {
        sm: "640px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
      },
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#ff7b29",
        secondary: {
          DEFAULT: "#F4A41C",
        },
      },
      keyframes: {
        motion: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(3px)" },
        },
        roadAnimation: {
          '0%': { transform: 'translateX(0px)' },
          '100%': { transform: 'translateX(-350px)' },
        },
      },
      animation: {
        motion: "motion 1s linear infinite",
        roadAnimation: "roadAnimation 1.4s linear infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
