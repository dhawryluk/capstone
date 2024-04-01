<template>
  <div class="mt-48">
    <h1 class="text-2xl text-center p-6">This is the Games Page</h1>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="game in results" :key="game.id">
        <NuxtLink :to="`/games/${game.id}`">{{ game.name }}</NuxtLink>
        <p>{{ game.released }}</p>
        <p>{{ game.rating }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
// definePageMeta({
//   layout: "games",
// });

const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMES_API_URL}games?key=${runtimeConfig.public.GAMES_API_KEY}`
);
let results = [];

if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value?.results) {
  results = data.value.results;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}
</script>

<style scoped></style>
