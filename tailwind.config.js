/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
    },
    extend: {
      colors: {
        "background-color": "#fef6eb",
        "primary-font-color": "#bb6561",
        "secondary-background-color": "#2a4759",
        "light-primary-bg-color": "#f0d8d6",
        "light-brown": "#d2a679",
        "primary-text-color": "#6b292e",
      },
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        custom: ["Georgia", "serif"],
        anticSlab: ["Antic Slab", "serif"],
        arsenal: ["Arsenal", "sans-serif"],
      },
    },
  },
  plugins: [],
};
