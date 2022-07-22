/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#9ECCE4",
        secondary: "#F1FDFF",
        disabled: "#C5C5C5",
      },
    },
  },
  plugins: [],
};
