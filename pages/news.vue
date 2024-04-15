<template>
  <div class="">
    <h1 class="text-3xl my-4 p-4">World Gaming News</h1>
    <div v-for="article in articles" key:="article.id" class="p-4">
    <h2 class="text-2xl py-4">{{ article.title }}</h2>
    <div v-html="article.body" class="font-serif"></div>
    <div class="flex justify-between py-4">
    <p class="">Author(s): {{ article.authors }}</p>
    <p class="italic">{{ article.publish_date }}</p>
  </div>
    </div>
  </div>
</template>

<script setup>
const data = await useFetch("/api/news");
const articles = data.data.value.results;
console.log(data.data);
// const runtimeConfig = useRuntimeConfig();

// const { data, error } = await useFetch(
//   `${runtimeConfig.public.GAMESPOT_API_URL}articles/?api_key=${runtimeConfig.public.GAMESPOT_API_KEY}&filter=publish_date:2024-04-03|2024-04-20&limit=10&sort=publish_date:desc&format=json`
// );
// let articles = [];

// if (error.value) {
//   console.error("API request failed:", error.value);
// } else {
//   articles = data.value.results;
// }

// const headers = {
//   Accept: "application/json",
//   "Client-ID": runtimeConfig.public.IGDB_CLIENT,
//   Authorization: runtimeConfig.public.IGDB_AUTHORIZATION,
// };

// const { data, error } = await useFetch(runtimeConfig.public.IGDB_URL, {
//   onRequest({ request, options }) {
//     options.headers = headers;
//   },
//   query: {
//     fields:
//       "age_ratings,aggregated_rating,aggregated_rating_count,alternative_names,artworks,bundles,category,checksum,collection,collections,cover,created_at,dlcs,expanded_games,expansions,external_games,first_release_date,follows,forks,franchise,franchises,game_engines,game_localizations,game_modes,genres,hypes,involved_companies,keywords,language_supports,multiplayer_modes,name,parent_game,platforms,player_perspectives,ports,rating,rating_count,release_dates,remakes,remasters,screenshots,similar_games,slug,standalone_expansions,status,storyline,summary,tags,themes,total_rating,total_rating_count,updated_at,url,version_parent,version_title,videos,websites",
//     limit: "20",
//   },
// });
// let game = {};
// console.log(data);
// if (error.value) {
//   console.error("API request failed:", error.value);
// } else if (data.value) {
//   game = data.value;
// } else {
//   console.warn("Data is not in the expected format or is missing:", data.value);
// }
</script>

<style scoped></style>
