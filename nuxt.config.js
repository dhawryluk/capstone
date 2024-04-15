// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/google-fonts",
    "@nuxt/ui",
    "@nuxt/image",
    "@nuxtjs/supabase",
  ],
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
  supabase: {
    redirect: false,
  },
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
  css: ["~/assets/css/main.css"],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
