<template>
  <div
    class="w-full mt-14 bg-[url('/assets/images/wave.jpg')] bg-cover bg-center"
  >
    <div
      class="flex justify-between bg-[url('/assets/images/overwatch.png')] bg-no-repeat bg-center"
    >
      <div
        class="w-1/3 md:w-1/4 bg-white p-4 font-bold opacity-30 grid grid-cols-2 justify-evenly"
      >
        <div
          class="flex flex-col gap-4 text-xl md:text-4xl bg-[url('/assets/images/wave.jpg')] bg-clip-text text-transparent"
        >
          <h2 class="">Where</h2>
          <h2 class="">Gamers</h2>
          <h2 class="">Unite</h2>
        </div>
        <div
          class="flex flex-col justify-self-end text-2xl md:text-5xl bg-[url('/assets/images/wave.jpg')] bg-clip-text text-transparent"
        >
          <p>4</p>
          <p>P</p>
          <p>L</p>
          <p>A</p>
          <p>Y</p>
        </div>
      </div>
      <div
        class="text-sm md:text-md self-end p-1 md:p-2 mb-2 bg-secondary rounded-xl"
      >
        <p>&copy;Copyright 2024 4Play</p>
      </div>
      <div
        class="flex flex-col md:flex-row self-end gap-4 md:gap-12 p-4 text-md md:text-2xl text-accent2"
      >
        <NuxtLink to="/about" class="text-accent1 dark:text-accent2"
          >About 4Play</NuxtLink
        >
        <NuxtLink to="/contact" class="text-accent1 dark:text-accent2"
          >Contact Us</NuxtLink
        >
      </div>
    </div>
  </div>
</template>

<script setup></script>
