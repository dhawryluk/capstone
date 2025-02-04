// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
<<<<<<< HEAD

=======
>>>>>>> c094205e04dd8d9b4e8729a40a4bb496ce07175e
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/supabase",
  ],
<<<<<<< HEAD

=======
>>>>>>> c094205e04dd8d9b4e8729a40a4bb496ce07175e
  runtimeConfig: {
    public: {
      GAMES_API_URL: process.env.GAMES_API_URL,
      GAMES_API_KEY: process.env.GAMES_API_KEY,
      IGDB_URL: process.env.IGDB_URL,
      IGDB_CLIENT: process.env.IGDB_CLIENT,
      IGDB_AUTHORIZATION: process.env.IGDB_AUTHORIZATION,
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
      SUPABASE_AUTHORIZATION: process.env.SUPABASE_AUTHORIZATION,
      GAMESPOT_API_URL: process.env.GAMESPOT_API_URL,
      GAMESPOT_API_KEY: process.env.GAMESPOT_API_KEY,
    },
  },
<<<<<<< HEAD

  supabase: {
    redirect: false,
  },

=======
  supabase: {
    redirect: false,
  },
>>>>>>> c094205e04dd8d9b4e8729a40a4bb496ce07175e
  colorMode: {
    preference: "dark",
    fallback: "dark",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "",
    storageKey: "nuxt-color-mode",
  },
<<<<<<< HEAD

  css: ["~/assets/css/main.css"],

=======
  css: ["~/assets/css/main.css"],
>>>>>>> c094205e04dd8d9b4e8729a40a4bb496ce07175e
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
<<<<<<< HEAD

  compatibilityDate: "2025-02-03",
});
=======
});
>>>>>>> c094205e04dd8d9b4e8729a40a4bb496ce07175e
