<template>
  <div>
    <h1
      class="dark:bg-gradient-to-r dark:from-secondary dark:via-accent2 dark:to-darkColor bg-gradient-to-r from-lightColor via-accent2 to-white text-lightColor rounded-lg text-6xl font-bold ring-2 ring-accent1 dark:ring-accent2 text-center my-4 p-4 font-sans drop-shadow-lg"
    >
      Gaming News
    </h1>
    <div v-if="loading" class="text-center text-xl py-4">
      Loading articles...
    </div>
    <div v-else-if="error" class="text-center text-red-500 py-4">
      Error: {{ error }}
    </div>
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div v-for="article in articles" :key="article.id" class="p-4 border-b">
        <!-- Article Image -->
        <img
          v-if="article.image?.original"
          :src="article.image.original"
          :alt="article.title"
          class="w-full h-auto rounded-lg shadow-md"
        />
        <!-- Article Title -->
        <h2 class="text-2xl font-bold py-4">{{ article.title }}</h2>
        <!-- Article Summary (Deck)-->
        <p v-if="article.deck" class="italic text-gray-600 pb-2">
          {{ article.deck }}
        </p>

        <!-- Article Body (First 200 Characters) -->
        <div v-html="truncateText(article.body, 200)" class="font-serif"></div>

        <!-- Article Metadata -->
        <div
          class="flex justify-between items-center py-4 text-sm text-gray-600"
        >
          <p>Author: {{ article.authors || "Unknown" }}</p>
          <p class="italic">{{ formatDate(article.publish_date) }}</p>
        </div>

        <!-- Read More Link -->
        <a
          :href="article.site_detail_url"
          target="_blank"
          class="text-accent2 hover:underline"
          >Read full article</a
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";

const articles = ref([]);
const loading = ref(true);
const error = ref(null);

const truncateText = (text, length) => {
  return text.length > length ? text.slice(0, length) + "..." : text;
};

const formatDate = (dateString) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(dateString).toLocaleDateString(undefined, options);
};

const fetchData = async () => {
  try {
    const response = await $fetch("/api/news");
    const articlesData = response?.results ?? [];
    articles.value = articlesData;

    if (articlesData.length === 0) {
      error.value = "No articles found.";
    }
  } catch (err) {
    console.error("Error fetching data:", err);
    error.value = "Failed to load articles. Please try again later.";
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchData();
});
</script>
