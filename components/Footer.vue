<template>
  <div
    class="w-full flex justify-between mt-14 dark:bg-gradient-to-r dark:from-secondary dark:via-accent2 dark:to-darkColor bg-gradient-to-r from-lightColor via-accent2 to-white text-lightColor"
  >
    <div
      class="w-1/3 md:w-1/4 bg-white p-4 font-bold opacity-30 grid md:grid-cols-2 justify-evenly"
    >
      <div
        class="flex flex-col text-xl md:text-4xl bg-black bg-clip-text text-transparent"
      >
        <h2>Where</h2>
        <h2>Gamers</h2>
        <h2>&amp;</h2>
        <h2>Anime</h2>
        <h2>Lovers</h2>
        <h2>Unite</h2>
      </div>
      <div
        class="flex flex-col justify-self-end text-2xl md:text-5xl bg-black bg-clip-text text-transparent items-center"
      >
        <span>4</span>
        <span>P</span>
        <span>L</span>
        <span>A</span>
        <span>Y</span>
      </div>
    </div>
    <p
      class="text-xs md:text-md self-end p-1 md:p-2 mb-4 bg-secondary rounded-xl"
    >
      &copy;Copyright {{ today }} 4Play
    </p>
    <div
      class="flex flex-col items-end gap-4 md:gap-8 m-4 text-lg md:text-xl text-accent2"
    >
      <NuxtLink to="/about" class="hover:text-accent1 transition-colors"
        >About 4Play</NuxtLink
      >
      <NuxtLink to="/contact" class="hover:text-accent1 transition-colors"
        >Contact Us</NuxtLink
      >
      <NuxtLink to="/news" class="hover:text-accent1 transition-colors"
        >News</NuxtLink
      >
      <NuxtLink to="/socialFeed" class="hover:text-accent1 transition-colors"
        >Social Feed</NuxtLink
      >
      <NuxtLink to="/games" class="hover:text-accent1 transition-colors"
        >Games</NuxtLink
      >
    </div>
  </div>
</template>

<script setup>
const today = new Date().getFullYear();
</script>
