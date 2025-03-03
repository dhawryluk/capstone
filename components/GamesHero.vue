<template>
  <div class="grid gap-4">
    <div class="bg-secondary p-2 md:p-4 rounded-lg h-[700px]">
      <NuxtLink
        v-if="randomGames.length > 0"
        :to="`/games/${randomGames[0].slug}`"
        class="block h-full w-full"
      >
        <div
          :style="{
            backgroundImage: `url(${randomGames[0].background_image})`,
          }"
          class="bg-cover bg-center rounded-lg h-full w-full relative flex items-center"
        >
          <div class="absolute left-4 text-left text-black bg-white/30 p-4 rounded-xl ">
            <h2 class="text-2xl md:text-6xl font-bold mb-4">
              {{ randomGames[0].name }}
            </h2>
            <p class="text-lg md:text-xl mb-2">
              Release Date: {{ randomGames[0].released }}
            </p>
            <p class="text-lg md:text-xl mb-2">
              Rating: {{ randomGames[0].rating_top }} /5
            </p>
            <p class="text-lg md:text-xl mb-2">
              {{ randomGames[0].platforms.map((platform) => platform.platform.name).join(", ") }}
            </p>
            <PrimaryButton class="mt-6"><NuxtLink
              :to="`/games/${randomGames[0].id}`">
              Read More
            </NuxtLink></PrimaryButton>
          </div>
        </div>
      </NuxtLink>
    </div>

    <div class="grid md:grid-cols-2 gap-4">
      <div
        v-for="game in randomGames.slice(1, 3)"
        :key="game.id"
        class="bg-secondary p-2 md:p-4 rounded-lg h-[400px]"
      >
        <NuxtLink :to="`/games/${game.slug}`" class="block h-full w-full">
          <div
            :style="{ backgroundImage: `url(${game.background_image})` }"
            class="bg-cover bg-center rounded-lg h-full w-full"
          >
            <h2
              class="h-full flex justify-end items-end text-xl md:text-2xl pr-4 pb-2 font-bold"
            >
              {{ game.name }}
            </h2>
          </div>
        </NuxtLink>
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
