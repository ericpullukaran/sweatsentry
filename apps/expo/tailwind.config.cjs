/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./*.{js,jsx,ts,tsx}",
    "./app/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  presets: [require("@acme/tailwind-config")],
};
