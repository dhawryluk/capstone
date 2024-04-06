<template>
  <div
    class="h-full bg-[url('/assets/images/fantasy.jpg')] bg-cover bg-center pt-14"
  >
    <div
      class="flex flex-col w-1/3 m-auto text-center bg-lightColor text-darkColor rounded-xl text-xl font-bold"
    >
      <img :src="game.background_image" alt="" class="rounded-t-xl" />
      <p>{{ game.name }}</p>
      <p>Release Date: {{ game.released }}</p>
      <p>Rating: {{ game.rating }}</p>
      <ul class="">
        Platforms:
        <li v-for="(platform, i) in game.parent_platforms" :key="i">
          {{ platform.platform.name }}
        </li>
      </ul>
      <p>{{ game.description_raw }}</p>
    </div>
  </div>
  <!-- <AppButton :id="game." /> -->
</template>
<script setup>
const route = useRoute();
const runtimeConfig = useRuntimeConfig();

const { data, error } = await useFetch(
  `${runtimeConfig.public.GAMES_API_URL}/games/${route.params.id}?key=${runtimeConfig.public.GAMES_API_KEY}`
);
let game = {};
console.log(data);
if (error.value) {
  console.error("API request failed:", error.value);
} else if (data.value) {
  game = data.value;
} else {
  console.warn("Data is not in the expected format or is missing:", data.value);
}

// definePageMeta({
//   layout: "games",
// });
</script>

<style scoped></style>
