module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    fontFamily: {
      header: ['"Rockwell Nova"', '"Roboto Slab"', "Rokkit", "serif"],
      body: ["Cabin", "Aller", "Ubuntu", "sans-serif"]
    },
    extend: {}
  },
  plugins: [require("@tailwindcss/typography")]
};
