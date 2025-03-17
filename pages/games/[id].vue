<template>
  <div
    class="flex flex-col w-3/4 mx-auto bg-lightColor text-darkColor dark:bg-secondary dark:text-lightColor rounded-xl text-xl p-4 shadow-lg"
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
      <img
        :src="game.background_image"
        alt="game background image"
        class="w-full h-auto rounded-lg shadow-md"
      />
      <img
        :src="game.background_image_additional"
        alt="additional game background image"
        class="w-full h-auto rounded-lg shadow-md"
      />
    </div>
    <h2 class="text-2xl font-bold py-4">{{ game.name }}</h2>
    <p class="font-serif mb-4">{{ game.description_raw }}</p>
    <div class="flex justify-between items-center py-4 text-sm text-gray-600">
      <p class="py-2">Release Date: {{ game.released }}</p>
      <p class="py-2">Rating: {{ game.rating }}</p>
      <p class="py-2">
        Genres:
        <span
          class="inline p-2 italic"
          v-for="(genre, i) in game.genres"
          :key="i"
        >
          {{ genre.name }}
        </span>
      </p>
      <ul class="">
        Platforms:
        <li
          class="inline p-2"
          v-for="(platform, i) in game.parent_platforms"
          :key="i"
        >
          {{ platform.platform.name }}
        </li>
      </ul>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <img
        v-for="screenshot in game.short_screenshots"
        :key="game.id"
        :src="screenshot.image"
        alt="Additional screenshots"
        class="w-full h-auto rounded-lg shadow-md"
      />
    </div>
  </div>
</template>

<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMES_API_URL}/games/${route.params.id}?key=${runtimeConfig.public.GAMES_API_KEY}`
);
let game = {};
if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value) {
  game = data.value;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}
</script>

<style scoped></style>
