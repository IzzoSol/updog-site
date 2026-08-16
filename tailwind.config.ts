import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        sky: {
          DEFAULT: "#159BFF",
          bright: "#0E7EE0",
          light: "#6CC8FF",
          pale: "#BDE4FF",
          deep: "#06265C",
        },
        cloud: {
          DEFAULT: "#F8FCFF",
          soft: "#EAF6FF",
        },
        green: {
          DEFAULT: "#00E539",
          deep: "#00B32A",
          dark: "#0A8F24",
          soft: "#C9FFDB",
        },
        dog: {
          DEFAULT: "#D99A63",
          dark: "#B9783F",
          light: "#F3D3A8",
        },
        dusk: {
          a: "#FF9A5C",
          b: "#FF6FA5",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        cloud: "0 16px 30px -14px rgba(6,38,92,0.28), 0 6px 12px -8px rgba(6,38,92,0.18)",
        cloudSm: "0 10px 20px -12px rgba(6,38,92,0.24)",
        coin: "0 22px 40px -20px rgba(6,38,92,0.38)",
      },
    },
  },
  plugins: [],
};

export default config;
