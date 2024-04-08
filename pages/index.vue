<template>
  <div class="relative text-center">
    <HomeHero />
    <div class="w-full">
      <h1 class="text-6xl font-bolder text-center pt-10 pb-4">
        Welcome to 4PLAY
      </h1>
      <h2 class="text-2xl font-serif">Where Gamers Unite</h2>
      <p class="w-5/6 font-serif text-xl ml-auto p-6 text-justify">
        Welcome to 4Play, the ultimate gaming community where players unite to
        celebrate their love for gaming. Designed to be the Facebook of gaming,
        4Play is the go-to platform for gamers to connect, share experiences,
        and stay updated on the latest gaming news and releases.
      </p>
    </div>
    <button onclick="alert('Testing')">Click me</button>
  </div>
</template>

<script setup>

const user = useSupabaseUser();
const client = useSupabaseClient();
const router = useRouter();


watch(
  user,
  () => {
    if (!user.value) {
      return navigateTo("/login");
    }
  },
  { immediate: true }
);
</script>

<style scoped></style>
