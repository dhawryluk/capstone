<template>
  <div class="w-5/6 m-auto">
    <h1 class="text-3xl text-bold text-center p-6">Coming Soon</h1>
    <div
      class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-center gap-4"
    >
      <div
        v-for="game in results"
        :key="game.id"
        class="bg-secondary rounded-t-3xl"
      >
        <NuxtLink
          :to="`/games/${game.slug}`"
          class="hover:bg-black hover:opacity-50 duration-300 ease-in-out"
        >
          <img
            :src="game.background_image"
            alt="gaming content"
            class="max-h-[300px] bg-cover bg-center rounded-t-3xl"
          />
        </NuxtLink>
        <h1 class="p-2">{{ game.name }}</h1>
        <p class="py-2 italic">Release Date: {{ game.released }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMES_API_URL}/games?key=${runtimeConfig.public.GAMES_API_KEY}&page_size=12&dates=2024-04-01,2024-04-30&ordering=added`
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
