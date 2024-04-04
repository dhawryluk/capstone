<template>
  <div>
    <p>{{ id }}</p>
    <p>{{ game.released }}</p>
    <p>{{ game.rating }}</p>
    <ul class="">
      <li v-for="(platform, i) in game.platforms" :key="i">
        {{ platform.platform.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
const { id } = useRoute().params;
const runtimeConfig = useRuntimeConfig();

// const { data, error } = await useFetch(
//   `${runtimeConfig.public.GAMES_API_URL}/games?key=${runtimeConfig.public.GAMES_API_KEY}`
// );
// let results = [];

// if (error.value) {
//   console.error("API request failed:", error.value);
// } else if (data.value?.results) {
//   results = data.value.results;
// } else {
//   console.warn("Data is not in the expected format or is missing:", data.value);
// }
definePageMeta({
  layout: "games",
});
</script>

<style scoped></style>
