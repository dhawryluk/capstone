<template>
  <div class="w-5/6 mx-auto my-10">
    <h1 class="text-3xl font-bold text-center mb-8">Coming Soon</h1>
    <div
      class="grid grid-flow-row grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6"
    >
      <div
        v-for="game in results"
        :key="game.id"
        class="bg-secondary/20 dark:bg-secondary dark:text-white text-black rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:-translate-y-1"
      >
        <NuxtLink :to="`/games/${game.slug}`" class="block">
          <img
            :src="game.background_image"
            alt="gaming content"
            class="w-full h-48 object-cover"
          />
        </NuxtLink>
        <div class="p-4">
          <h2 class="text-xl font-semibold">{{ game.name }}</h2>
          <div class="flex mt-2 justify-center gap-4">
            <img
              v-for="(platform, i) in game.parent_platforms"
              :key="i"
              :src="getPlatformIcon(platform.platform.slug)"
              :alt="platform.platform.name"
              class="h-6 w-6 filter invert"
            />
          </div>
          <p class="text-secondary dark:text-lightColor italic mt-2">
            Release Date: {{ game.released }}
          </p>
        </div>
      </div>
    </div>
    <div class="text-center mt-6">
      <PrimaryButton @click="loadMore" v-if="hasMore">Load More</PrimaryButton>
      <p v-else class="text-gray-500">No more results to load</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import PrimaryButton from "./PrimaryButton.vue";

const results = ref([]);
const error = ref(null);
const loading = ref(true);
const page = ref(1);
const pageSize = 12;
const hasMore = ref(true);

const getPlatformIcon = (slug) => {
  const platformIcons = {
    pc: "/icons/pc.svg",
    playstation: "/icons/playstation.svg",
    xbox: "/icons/xbox.svg",
    nintendo: "/icons/nintendo.svg",
    ios: "/icons/ios.svg",
    android: "/icons/android.svg",
    linex: "/icons/linux.svg",
    mac: "/icons/mac.svg",
    web: "/icons/web.svg",
  };
  return platformIcons[slug] || "/icons/default.svg";
};

const fetchGames = async () => {
  try {
    const response = await fetch(
      `/api/comingSoon?page=${page.value}&pageSize=${pageSize}`
    );
    const data = await response.json();

    // Log the entire API response
    if (response.ok && data?.results) {
      if (data.results.length < pageSize) {
        hasMore.value = false;
      }
      results.value = [...results.value, ...data.results];
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

const loadMore = () => {
  if (!loading.value && hasMore.value) {
    page.value += 1;
    fetchGames();
  }
};

onMounted(() => {
  fetchGames();
});
</script>
