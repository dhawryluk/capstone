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
        class="bg-secondary/20 dark:bg-secondary shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
      >
        <NuxtLink :to="`/games/${trending.slug}`">
          <img
            :src="trending.background_image"
            :alt="trending.name"
            class="w-full h-84 object-cover rounded-t-lg"
        /></NuxtLink>
        <div class="p-4 mt-auto">
          <h3 class="text-lg font-semibold">{{ trending.name }}</h3>
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
