<template>
  <div
    class="absolute top-14 flex flex-col gap-12 p-4 h-full bg-secondary w-16 md:w-60 rounded-lg text-accent1 dark:text-accent2"
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
  </div>
</template>

<script setup></script>

<style scoped></style>
