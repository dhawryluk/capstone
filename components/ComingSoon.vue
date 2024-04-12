<template>
  <div class="w-full m-auto mt-8">
    <h1 class="text-3xl text-bold text-center p-6">Coming Soon</h1>
    <div class="grid md:grid-cols-2 justify-center gap-4">
      <div
        v-for="game in results"
        :key="game.id"
        class="bg-secondary rounded-t-3xl"
      >
        <NuxtLink :to="`/games/${game.slug}`" class="">
          <img
            :src="game.background_image"
            alt="gaming content"
            class="rounded-t-3xl hover:scale-105 hover:bg-black hover:opacity-50 duration-300 ease-in-out"
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
  `${runtimeConfig.public.GAMES_API_URL}/games?key=${runtimeConfig.public.GAMES_API_KEY}&page_size=6&dates=2024-04-15,2024-12-01`
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
