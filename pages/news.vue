<template>
  <div>
    <h1>This is the News Page</h1>
    <div v-for="article in articles" key:="article.id">
    {{ article.title }}
    {{ article.authors }}
    {{ article.body }}
  </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMESPOT_API_URL}articles/?api_key=${runtimeConfig.public.GAMESPOT_API_KEY}&filter=publish_date:2024-04-01|2024-04-09&limit=10&format=json`
);
let articles = [];

if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value?.results) {
  articles = data.value.results;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}






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
