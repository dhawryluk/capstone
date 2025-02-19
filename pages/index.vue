<template>
  <div>
    <HomeHero />
    <div class="text-center">
      <h1 class="text-4xl md:text-6xl font-bolder pt-10 pb-4">
        Welcome to 4PLAY
      </h1>
      <h2 class="text-2xl font-serif">Where Gamers Unite</h2>
      <p class="font-serif w-5/6 mx-auto text-lg md:text-xl pt-8 text-justify">
        Welcome to 4Play, the ultimate gaming community where players unite to
        celebrate their love for gaming. Designed to be the Facebook of gaming,
        4Play is the go-to platform for gamers to connect, share experiences,
        and stay updated on the latest gaming news and releases.
      </p>
      <div>
        <UCarousel
          :items="results.slice(0, 8)"
          :ui="{ item: 'basis-full' }"
          class="pt-14 w-2/3 h-2/3 mx-auto"
          arrows
        >
          <template #default="{ item: game }">
            <img
              :src="game.background_image"
              class="w-full"
              draggable="false"
            />
          </template>
        </UCarousel>
      </div>
      <ComingSoon />
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
