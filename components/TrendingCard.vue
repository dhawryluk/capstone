<template>
  <div class="w-full m-auto mt-8">
    <h1 class="text-3xl text-bold text-center p-6">New and Upcoming Titles</h1>
    <div class="grid md:grid-cols-3 justify-center gap-4">
      <div v-for="trending in results" :key="trending.id">
        <NuxtLink :to="`/games/${trending.slug}`">
          <img
          :src="trending.background_image"
          :alt="trending.name"
          class="w-full h-auto shadow-md rounded-tl-3xl hover:scale-103 hover:bg-black hover:opacity-50 duration-300 ease-in-out"
          />
        </NuxtLink>
        <h1 class="p-2">{{ trending.name }}</h1>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const results = ref([]);
const error = ref(null);

const fetchGames = async () => {
  try {
    const response = await $fetch('/api/trending');
    if (response.error) {
      throw new Error(response.error);
    }
    results.value = response.results;
  } catch (err) {
    console.error("An unexpected error occurred", err);
    error.value = err.message;
  }
};

onMounted(() => {
  fetchGames();
});
</script>
