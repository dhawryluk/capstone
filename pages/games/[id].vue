<template>
  <div
    class="h-full bg-[url('/assets/images/wave.jpg')] bg-cover bg-center py-14"
  >
    <div
      class="flex flex-col w-2/3 ml-auto mr-36 bg-lightColor text-darkColor rounded-xl text-xl font-bold"
    >
      <img
        :src="game.background_image"
        alt=""
        class="col-start-1 col-span-2 bg-cover rounded-t-xl"
      />
      <div class="text-left mx-6 text-lg">
        <p class="text-2xl font-bold py-4">{{ game.name }}</p>
        <p class="font-serif">{{ game.description_raw }}</p>
        <p class="py-2">Release Date: {{ game.released }}</p>
        <p class="py-2">Rating: {{ game.rating }}</p>
        <ul class="">
          Platforms:
          <li
            class="inline p-2"
            v-for="(platform, i) in game.parent_platforms"
            :key="i"
          >
            {{ platform.platform.name }}
          </li>
        </ul>
      </div>
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
