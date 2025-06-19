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
    <h2 class="text-2xl font-bold my-6 text-center">Trending Now</h2>
    <div v-if="loadingTrending" class="text-center text-xl py-4">
      Loading Anime...
    </div>
    <div v-else-if="errorTrending" class="text-center text-red-500 py-4">
      Error: {{ errorTrending }}
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
          class="w-full h-84 object-contain bg-white rounded-t-lg"
        />
        <div class="p-4 mt-auto">
          <h3 class="text-lg font-semibold truncate">{{ anime.title }}</h3>
          <div class="text-xs text-darkColor dark:text-lightColor mt-1">
            Rating:
            <span
              v-if="anime.ageRating === 'R-18'"
              class="text-red-500 font-semibold"
            >
              {{ anime.ageRating }}
            </span>
            <span v-else class="text-accent1 dark:text-accent2 font-semibold">
              {{ anime.ageRating }}
            </span>
          </div>
        </div>
      </NuxtLink>
    </div>
    <button
      v-if="!loadingTrending && hasMoreTrending"
      @click="viewMoreTrending"
      class="block mx-auto my-4 px-6 py-2 bg-accent1 text-white rounded hover:bg-accent2 transition"
    >
      View More Trending
    </button>
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
      page: 1,
      perPage: 15,
      hasMore: true,
      trendingPage: 1,
      trendingPerPage: 15,
      hasMoreTrending: true,
      loadingTrending: false,
      errorTrending: null,
    };
  },
  async created() {
    await this.fetchAnimeList();
    await this.fetchTrendingAnime();
  },
  methods: {
    async fetchAnimeList(search = "", append = false) {
      this.loading = true;
      this.error = null;
      try {
        // Reset page if not appending (i.e., new search)
        if (!append) this.page = 1;
        const response = await fetch(
          `/api/anime?search=${encodeURIComponent(search)}&page=${
            this.page
          }&perPage=${this.perPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animeArr = await response.json();
        const mapped = animeArr.map((anime) => ({
          id: anime.id,
          title: anime.title.romaji,
          image: anime.coverImage?.extraLarge,
          ageRating: anime.isAdult ? "R-18" : "PG",
        }));
        if (append) {
          this.animeList = [...this.animeList, ...mapped];
        } else {
          this.animeList = mapped;
        }
        this.hasMore = animeArr.length === this.perPage;
      } catch (error) {
        this.error = error.message;
        this.animeList = [];
      } finally {
        this.loading = false;
      }
    },
    async fetchTrendingAnime(append = false) {
      this.loadingTrending = true;
      this.errorTrending = null;
      try {
        const response = await fetch(
          `/api/anime?trending=1&page=${this.trendingPage}&perPage=${this.trendingPerPage}`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const animeArr = await response.json();
        const mapped = animeArr.map((anime) => ({
          id: anime.id,
          title: anime.title.romaji,
          image: anime.coverImage?.extraLarge,
          ageRating: anime.isAdult ? "R-18" : "PG",
        }));
        if (append) {
          this.trendingAnime = [...this.trendingAnime, ...mapped];
        } else {
          this.trendingAnime = mapped;
        }
        this.hasMoreTrending = animeArr.length === this.trendingPerPage;
      } catch (error) {
        this.errorTrending = error.message;
        this.trendingAnime = [];
      } finally {
        this.loadingTrending = false;
      }
    },
    async searchAnime() {
      this.page = 1;
      await this.fetchAnimeList(this.searchQuery, false);
    },
    async viewMore() {
      this.page += 1;
      await this.fetchAnimeList(this.searchQuery, true);
    },
    async viewMoreTrending() {
      this.trendingPage += 1;
      await this.fetchTrendingAnime(true);
    },
  },
};
</script>
