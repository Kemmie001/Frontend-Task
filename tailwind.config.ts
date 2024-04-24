import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/tailwind-datepicker-react/dist/**/*.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: '#131316',
        secondary: '',
        faint: '#DBDEE5',
        amber: {
          200: "#A77A07",
        },
        gray: {
          50: '#EFF1F6',
          // 200: '#F3F5F6',
          // 250: '#A8BACA',
          // 300: '#353F50',
          400: '#56616B',
          // 500: '#C8D2DF',
          // 600: '#4F6476',
          // 800: '#848F9F',
        },
        green: {
          200: '#E3FCF2',
          400: '#075132',
          500: '#0EA163',
          // 600: '#34BE6D',
          // 700: '#27AE60',
        },
        customRed: {
          200: '#F9E3E0',
          400: ' #961100',
        }
      },
    },
  },
  plugins: [],
};
export default config;
