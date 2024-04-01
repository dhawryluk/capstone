/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        darkColor: "#121212",
        lightColor: "#fafdf6",
        secondary: "#343434",
        accent1: "#ff1053",
        accent2: "#8a4fff",
      },
      fontFamily: {
        bodyText: ["Hind", "sans-serif"],
        titleText: ["Poppins", "sans-serif"],
      },
    },
    plugins: [],
  },
};
