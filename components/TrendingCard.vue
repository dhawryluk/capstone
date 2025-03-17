<template>
  <div class="w-5/6 mx-auto mt-8">
    <h1 class="text-3xl font-bold text-center p-6">New and Trending</h1>
    <div v-if="loading" class="text-center text-xl py-4">Loading games...</div>
    <div v-else-if="error" class="text-center text-red-500 py-4">
      Error: {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="trending in results"
        :key="trending.id"
        class="bg-secondary/20 dark:bg-secondary shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 ease-in-out"
      >
        <NuxtLink :to="`/games/${trending.slug}`">
          <img
            :src="trending.background_image"
            :alt="trending.name"
            class="w-full h-48 object-cover rounded-t-lg shadow-md"
        /></NuxtLink>
        <h2 class="text-2xl font-bold p-2">{{ trending.name }}</h2>
        <div class="flex justify-between items-center p-2 text-sm">
          <p>Released: {{ trending.released }}</p>
          <p class="italic">Rating: {{ trending.rating_top }} / 5</p>
        </div>
        <p class="p-2">
          <span class="font-bold mr-2">Genres:</span>
          <span v-for="(genre, index) in trending.genres" :key="index">
            {{ genre.name
            }}<span v-if="index < trending.genres.length - 1">, </span>
          </span>
        </p>
        <div class="pb-4 mb-0">
          <NuxtLink
            :to="`/games/${trending.slug}`"
            class="p-2 text-accent2 hover:underline"
            >More details</NuxtLink
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const results = ref([]);
const error = ref(null);
const loading = ref(true);

const fetchGames = async () => {
  try {
    const response = await fetch("/api/trending");
    const data = await response.json();

    if (response.ok && data?.results) {
      results.value = data.results;
    } else {
      console.warn("Data is not in the expected format or is missing:", data);
    }
  } catch (err) {
    console.error("Fetch error:", err);
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchGames();
});
</script>
