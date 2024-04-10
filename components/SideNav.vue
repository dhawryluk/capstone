<template>
  <div
    class="absolute top-14 flex flex-col gap-12 p-4 bg-secondary w-16 md:w-2/12 rounded-lg text-accent1 dark:text-accent2"
  >
    <NuxtLink to="/"
      ><Icon name="heroicons:home-solid" size="36" class=""></Icon
      ><span class="text-lg p-4 hidden md:inline-block">Home</span></NuxtLink
    >
    <NuxtLink to="/"
      ><Icon name="prime:objects-column" size="36" class=""></Icon
      ><span class="text-lg p-4 hidden md:inline-block"
        >Dashboard</span
      ></NuxtLink
    >
    <NuxtLink to="/games"
      ><Icon name="game-icons:console-controller" size="36" class=""></Icon
      ><span class="text-lg p-4 hidden md:inline-block"
        >New & Trending</span
      ></NuxtLink
    >
    <NuxtLink to="/news"
      ><Icon name="heroicons:newspaper-solid" size="36" class=""></Icon
      ><span class="text-lg p-4 hidden md:inline-block"
        >Gaming News</span
      ></NuxtLink
    >
    <h2 class="text-lightColor pl-2">News Feed</h2>
    <div v-for="article in articles" key:="article.id" class="px-2 shadow-lg hidden md:inline-block line-clamp-2">
      <p>{{ article.deck }}</p>
    </div>
  </div>
  <div>
  
  </div>
</template>

<script setup>
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMESPOT_API_URL}articles/?api_key=${runtimeConfig.public.GAMESPOT_API_KEY}&filter=publish_date:2024-04-01|2024-04-09&limit=10&format=json`
);
let articles = [];

if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value?.results) {
  articles = data.value.results;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}

</script>

<style scoped></style>
