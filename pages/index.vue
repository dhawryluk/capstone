<template>
  <div class="">
    <HomeHero />
    <div class="grid w-3/4 m-auto text-center">
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
          class="rounded-lg overflow-hidden pt-14 w-4/5 m-auto h-4/5"
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
  "https://images7.alphacoders.com/370/370408.png",
  "https://images3.alphacoders.com/699/699057.png",
  "https://images8.alphacoders.com/877/877849.jpg",
  "https://images7.alphacoders.com/536/536426.png",
  "https://images5.alphacoders.com/540/540654.jpg",
];
</script>
