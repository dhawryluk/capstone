<template>
  <div v-if="props.id !== undefined">
    <button>{{ props.id }}</button>
  </div>
  <div v-else>
    <button>Text</button>
  </div>
</template>

<script setup>
// const props = defineProps({
//   id: Number,
// });
// const runtimeConfig = useRuntimeConfig();
// console.log(props.id, "id");
// const { data, error } = await useFetch(
//   `${runtimeConfig.public.GAMES_API_URL}/games/${props.id}/screenshots?key=${runtimeConfig.public.GAMES_API_KEY}`
// );
// let results = [];
// console.log(results, "results");
// if (error.value) {
//   console.error("API request failed:", error.value);
// } else if (data.value?.results) {
//   results = data.value.results;
// } else {
//   console.warn("Data is not in the expected format or is missing:", data.value);
// }
</script>

<style lang="scss" scoped></style>
