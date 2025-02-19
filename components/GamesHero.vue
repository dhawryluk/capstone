<template>
  <div class="grid gap-4">
    <div class="w-full bg-secondary p-2 md:p-4 rounded-lg h-[400px]">
      <div
        v-if="randomGames.length > 0"
        :style="{ backgroundImage: `url(${randomGames[0].background_image})` }"
        class="bg-cover bg-center rounded-lg h-full w-full"
      ></div>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div
        v-for="game in randomGames.slice(1, 3)"
        :key="game.id"
        class="bg-secondary p-2 md:p-4 rounded-lg h-[300px]"
      >
        <div
          :style="{ backgroundImage: `url(${game.background_image})` }"
          class="bg-cover bg-center rounded-lg h-full w-full"
        >
          <h2
            class="h-full flex justify-end items-end text-xl pr-4 pb-2 text-bold"
          >
            {{ game.name }}
          </h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const games = ref([]);
const randomGames = ref([]);
const error = ref(null);
const loading = ref(true);

const fetchGames = async () => {
  try {
    const response = await fetch("/api/trending");
    const data = await response.json();

    console.log("Fetched data:", data);

    if (response.ok && data?.results) {
      games.value = data.results;

      randomGames.value = games.value
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      console.log("Random games selected:", randomGames.value);
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
