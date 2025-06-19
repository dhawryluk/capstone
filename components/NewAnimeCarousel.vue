<template>
  <div
    v-if="trendingAnime.length > 0"
    class="grid grid-cols-1 sm:grid-cols-2 md:gird-cols-3 lg:grid-cols-5 gap-6"
  >
    <NuxtLink
      v-for="anime in trendingAnime.slice(0, 5)"
      :key="anime.id"
      :to="`/anime/${anime.id}`"
      class="bg-secondary/20 dark:bg-secondary shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
    >
      <img
        :src="anime.image"
        :alt="anime.title"
        class="w-full h-80 object-cover bg-white rounded-t-lg"
        draggable="false"
      />
      <div class="p-4 mt-auto">
        <p class="text-lg font-bold truncate">{{ anime.title }}</p>
        <p class="text-xs text-darkColor dark:text-lightColor mt-1">
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
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

<script>
export default {
  data() {
    return {
      trendingAnime: [],
      loading: true,
      error: null,
    };
  },
  async created() {
    await this.fetchTrendingAnime();
  },
  methods: {
    async fetchTrendingAnime() {
      this.loading = true;
      this.error = null;
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
          ageRating:
            anime.rating ||
            anime.ageRating ||
            anime.ageRatingGuide ||
            anime.averageRating ||
            anime.adult
              ? "R-18"
              : "PG", // fallback logic
        }));
      } catch (error) {
        this.error = error.message;
        this.trendingAnime = [];
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
