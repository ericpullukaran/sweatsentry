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
        primary: "#e0a82e",
        "primary-content": "#181830",
        secondary: "#f9d72f",
        "secondary-content": "#181830",
        accent: "#181830",
        neutral: "#181830",
        "base-100": "#ffffff",
      },
      fontFamily: {
        sans: ["Inter, sans-serif"],
      },
    },
  },
  plugins: [],
};
