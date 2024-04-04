<template>
  <div>
    <p>{{ game.id }}</p>
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
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMES_API_URL}/games/${route.params.id}?key=${runtimeConfig.public.GAMES_API_KEY}`
);
let game = {};
console.log("game", game, route);
if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value) {
  game = data.value;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}

// definePageMeta({
//   layout: "games",
// });
</script>

<style scoped></style>
