<template>
  <div
    class="w-full mt-14 bg-[url('/assets/images/wave.jpg')] bg-cover bg-center"
  >
    <div
      class="flex justify-between bg-[url('/assets/images/overwatch.png')] bg-no-repeat bg-center"
    >
      <div
        class="w-1/4 bg-white p-4 font-bold opacity-30 grid grid-cols-2 justify-evenly"
      >
        <div
          class="flex flex-col gap-4 bg-[url('/assets/images/wave.jpg')] bg-clip-text text-transparent"
        >
          <h2 class="text-4xl">Where</h2>
          <h2 class="text-4xl">Gamers</h2>
          <h2 class="text-4xl">Unite</h2>
        </div>
        <div
          class="flex flex-col justify-self-end text-5xl bg-[url('/assets/images/wave.jpg')] bg-clip-text text-transparent"
        >
          <p>4</p>
          <p>P</p>
          <p>L</p>
          <p>A</p>
          <p>Y</p>
        </div>
      </div>
      <div class="self-end p-2 mb-2 bg-secondary rounded-xl">
        <p>&copy;Copyright 2024 4Play</p>
      </div>
      <div class="flex self-end gap-12 p-4 text-2xl text-accent2">
        <NuxtLink to="/about">About 4Play</NuxtLink>
        <NuxtLink to="/contact">Contact Us</NuxtLink>
      </div>
    </div>
  </div>
</template>

<script setup></script>
