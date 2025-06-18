<template>
  <div class="px-6">
    <h2 class="text-2xl font-bold mb-4 text-center">
      Find Your Favorite Anime
    </h2>
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search title..."
      class="w-full mb-4 px-4 py-2 border border-secondary dark:border-lightColor rounded-md focus:outline-none focus:ring-2 focus:ring-accent1 dark:focus:ring-accent2"
      @input="searchAnime"
    />
    <ul class="list-none p-0">
      <li v-for="anime in animeList" :key="anime.id" class="mb-2">
        <NuxtLink
          :to="`/anime/${anime.id}`"
          class="cursor-pointer text-accent1 dark:text-accent2 hover:underline"
        >
          {{ anime.title }}
        </NuxtLink>
      </li>
    </ul>
    <h2 class="text-2xl font-bold my-6 text-center">Trending Now</h2>
    <div v-if="loading" class="text-center text-xl py-4">Loading Anime...</div>
    <div v-else-if="error" class="text-center text-red-500 py-4">
      Error: {{ error }}
    </div>
    <div
      v-else
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
    >
      <NuxtLink
        v-for="anime in trendingAnime"
        :key="anime.id"
        :to="`/anime/${anime.id}`"
        class="bg-secondary/20 dark:bg-secondary shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
      >
        <img
          :src="anime.image"
          :alt="anime.title"
          class="w-full h-84 object-cover rounded-t-lg"
        />
        <div class="p-4 mt-auto">
          <h3 class="text-lg font-semibold truncate">{{ anime.title }}</h3>
          <div class="text-xs text-darkColor dark:text-lightColor mt-1">
            Rating:
            <span
              v-if="anime.ageRating === 'R-18'"
              class="text-red-500 font-semibold"
            >
              {{ anime.ageRating ? anime.ageRating : "N/A" }}
            </span>
            <span v-else class="text-accent1 dark:text-accent2 font-semibold">
              {{ anime.ageRating ? anime.ageRating : "N/A" }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      animeList: [],
      trendingAnime: [],
      searchQuery: "",
      loading: false,
      error: null,
    };
  },
  async created() {
    await this.fetchAnimeList();
    await this.fetchTrendingAnime();
  },
  methods: {
    async fetchAnimeList(search = "") {
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch(
          `/api/anime?search=${encodeURIComponent(search)}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animeArr = await response.json();
        this.animeList = animeArr.map((anime) => ({
          id: anime.id,
          title: anime.title.romaji,
          ageRating:
            anime.ageRating ||
            anime.ageRatingGuide ||
            (anime.adult ? "R-18" : "PG"),
        }));
      } catch (error) {
        this.error = error.message;
        this.animeList = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchTrendingAnime() {
      try {
        const response = await fetch("/api/anime?trending=1");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animeArr = await response.json();
        this.trendingAnime = animeArr.map((anime) => ({
          id: anime.id,
          title: anime.title.romaji,
          image: anime.coverImage?.extraLarge,
        }));
      } catch (error) {
        console.error("Error fetching trending anime:", error.message);
      }
    },
    async searchAnime() {
      await this.fetchAnimeList(this.searchQuery);
    },
  },
};
</script>
