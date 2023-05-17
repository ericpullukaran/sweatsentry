/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        info: "#2196f3",
        "info-content": "#181830",
        success: "#4caf50",
        "success-content": "#ffffff",
        warning: "#ff9800",
        "warning-content": "#181830",
        error: "#f44336",
        "error-content": "#ffffff",
        "color-scheme": "dark",
        primary: "#1eb854",
        "primary-content": "#c2ffd7",
        secondary: "#1fd65f",
        accent: "#d99330",
        neutral: "#110e0e",
        "base-100": "#171212",
      },
      fontFamily: {
        sans: ["Inter, sans-serif"],
      },
    },
  },
  plugins: [],
};
