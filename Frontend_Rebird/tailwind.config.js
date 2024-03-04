/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        lightGreen_mx: "#D8F3DC",
        lightGreen_sm: "#B7E4C7",
        lightGreen: "#95D5B2",
        green: "#74C69D",
        green_sm: "#52B788",
        green_mx: "#40916C",
        greenDark: "#1B4332",
        greenDark_mx: "#081C15",
      },
    },
  },
  plugins: [],
};
