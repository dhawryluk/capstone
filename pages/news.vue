<template>
  <div class="">
    <h1 class="bg-[url('/assets/images/wave.jpg')] bg-cover bg-center text-lightColor rounded-lg text-6xl font-bold ring-2 ring-accent1 dark:ring-accent2 text-center my-4 p-4 font-sans drop-shadow-lg">World Gaming News</h1>
    <div v-for="article in articles" key:="article.id" class="p-4">
    <h2 class="text-2xl py-4">{{ article.title }}</h2>
    <div v-html="article.body" class="font-serif"></div>
    <div class="flex justify-between py-4">
    <p class="">Author(s): {{ article.authors }}</p>
    <p class="italic">{{ article.publish_date }}</p>
  </div>
    </div>
  </div>
</template>

<script setup>
const articles = ref([]);

const fetchData = async () => {
  try {
    const response = await $fetch("/api/news");
    articles.value = response.results;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

onMounted(() => {
  fetchData();
});

</script>

<style scoped></style>
