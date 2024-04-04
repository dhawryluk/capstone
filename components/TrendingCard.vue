<template>
  <div class="w-5/6 m-auto p-6">
    <h1 class="text-3xl text-bold text-center p-6">Trending Now</h1>
    <div class="grid grid-cols-4 gap-4">
      <div v-for="game in results" :key="game.id">
        <NuxtLink :to="`/games/${game.id}`" class="">
          <img
            :src="game.background_image"
            alt=""
            class="h-[200px] w-[370px] rounded-tl-3xl hover:scale-105 hover:bg-black hover:opacity-50 duration-300 ease-in-out"
          />
        </NuxtLink>
        <h1 class="p-2">{{ game.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMES_API_URL}/games?key=${runtimeConfig.public.GAMES_API_KEY}`
);
let results = [];

if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value?.results) {
  results = data.value.results;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}

// definePageMeta({
//   layout: "games",
// });
</script>

<style scoped></style>
