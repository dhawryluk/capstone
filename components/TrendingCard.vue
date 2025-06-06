<template>
  <div class="w-5/6 mx-auto mt-8">
    <h1 class="text-3xl font-bold text-center p-6">New and Trending</h1>
    <div class="flex justify-center mb-6">
      <input
        type="text"
        v-model="search"
        placeholder="Search games..."
        class="w-full mb-4 px-4 py-2 border border-secondary dark:border-lightColor rounded-md focus:outline-none focus:ring-2 focus:ring-accent1 dark:focus:ring-accent2"
      />
    </div>
    <div v-if="loading" class="text-center text-xl py-4">Loading games...</div>
    <div v-else-if="error" class="text-center text-red-500 py-4">
      Error: {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="trending in filteredResults"
        :key="trending.id"
        class="bg-secondary/20 dark:bg-secondary shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
      >
        <NuxtLink :to="`/games/${trending.slug}`">
          <img
            :src="trending.background_image"
            :alt="trending.name"
            class="h-[240px] object-cover w-full rounded-t-lg"
          />
        </NuxtLink>
        <div class="p-4 mt-auto">
          <h3 class="text-lg font-semibold">{{ trending.name }}</h3>
          <div class="flex space-x-2 mt-2">
            <img
              v-for="(platform, i) in trending.parent_platforms"
              :key="i"
              :src="getPlatformIcon(platform.platform.slug)"
              :alt="platform.platform.name"
              class="h-6 w-6 filter invert"
            />
          </div>
          <p class="mt-2 italic">Release Date: {{ trending.released }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const search = ref("");
const results = ref([]);
const error = ref(null);
const loading = ref(true);

const getPlatformIcon = (slug) => {
  const platformIcons = {
    pc: "/icons/pc.svg",
    playstation: "/icons/playstation.svg",
    xbox: "/icons/xbox.svg",
    nintendo: "/icons/nintendo.svg",
    ios: "/icons/ios.svg",
    android: "/icons/android.svg",
    linux: "/icons/linux.svg",
    mac: "/icons/mac.svg",
    web: "/icons/web.svg",
  };
  return platformIcons[slug] || "/icons/default.svg";
};

const filteredResults = computed(() =>
  results.value.filter((game) =>
    game.name.toLowerCase().includes(search.value.toLowerCase())
  )
);

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
