<template>
  <div>
    <HomeHero />
    <div class="m-auto text-center">
      <h1 class="text-4xl md:text-6xl font-bolder pt-10 pb-4">
        Welcome to 4PLAY
      </h1>
      <h2 class="text-2xl font-serif">Where Gamers Unite</h2>
      <p class="font-serif text-lg md:text-xl pt-8 text-justify">
        Welcome to 4Play, the ultimate gaming community where players unite to
        celebrate their love for gaming. Designed to be the Facebook of gaming,
        4Play is the go-to platform for gamers to connect, share experiences,
        and stay updated on the latest gaming news and releases.
      </p>
      <div>
        <UCarousel
          v-slot="{ item }"
          :items="items"
          :ui="{ item: 'basis-full' }"
          class="rounded-lg overflow-hidden pt-14 w-2/3 h-2/3 mx-auto"
          arrows
        >
          <img :src="item" class="w-full" draggable="false" />
        </UCarousel>
      </div>
      <ComingSoon />
    </div>
  </div>
</template>

<script setup>
const items = [
  "https://images.alphacoders.com/134/1343705.png",
  "https://images5.alphacoders.com/134/1349297.png",
  "https://images6.alphacoders.com/134/1348515.png",
  "https://images4.alphacoders.com/135/1356322.jpeg",
  "https://images5.alphacoders.com/133/1337070.jpeg",
  "https://images6.alphacoders.com/697/697947.jpg",
];
</script>
