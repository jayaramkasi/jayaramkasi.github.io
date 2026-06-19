export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        night: {
          950: "#070d24",
          900: "#0a1128",
          800: "#11203f",
          700: "#1a2a52",
          600: "#24386b",
        },
        gold: {
          200: "#fdeebb",
          300: "#f9e08a",
          400: "#f4d35e",
          500: "#e9b949",
          600: "#cf9b3a",
          700: "#a87b2a",
        },
        cream: "#f7f3e8",
        moonlight: "#dce4f5",
      },
      fontFamily: {
        display: ["Fraunces", "Georgia", "serif"],
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },
      keyframes: {
        "tab-enter": {
          "0%": {
            opacity: "0",
            transform: "translateY(16px) scale(0.985)",
            filter: "blur(8px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0) scale(1)",
            filter: "blur(0)",
          },
        },
      },
      animation: {
        "tab-enter": "tab-enter 480ms cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};
