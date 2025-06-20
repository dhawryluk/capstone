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
      @input="debounceSearchAnime"
    />

    <div v-if="searchQuery">
      <div v-if="loading" class="text-center text-xl py-4">
        Loading Anime...
      </div>
      <div v-else-if="error" class="text-center text-red-500 py-4">
        Error: {{ error }}
      </div>
      <div
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6"
      >
        <NuxtLink
          v-for="anime in animeList"
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
      <PrimaryButton
        v-if="!loading && hasMore"
        @click="viewMore"
        class="view-more-btn my-4 px-6 py-2 text-center"
      >
        View More
      </PrimaryButton>
    </div>

    <div v-else>
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
          class="trending-card bg-secondary/20 dark:bg-secondary shadow-md rounded-lg overflow-hidden flex flex-col hover:scale-105 hover:shadow-xl transition-transform duration-300 ease-in-out"
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
      <PrimaryButton
        v-if="!loadingTrending && hasMoreTrending"
        @click="viewMoreTrending"
        class="view-more-trending-btn my-4 px-6 py-2 text-center"
      >
        View More Trending
      </PrimaryButton>
    </div>
  </div>
</template>

<script>
import _ from "lodash";

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
  created() {
    this.debounceSearchAnime = _.debounce(this.searchAnime, 500);
    this.fetchAnimeList();
    this.fetchTrendingAnime();
  },
  methods: {
    async fetchAnimeList(search = "", append = false) {
      this.loading = true;
      this.error = null;
      try {
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
      // Get the button's position relative to the viewport
      const btn = this.$el.querySelector(".view-more-btn");
      const rect = btn ? btn.getBoundingClientRect() : null;
      const btnOffset = rect ? rect.top : 0;

      this.page += 1;
      await this.fetchAnimeList(this.searchQuery, true);

      this.$nextTick(() => {
        // After DOM updates, get the new button position
        const newBtn = this.$el.querySelector(".view-more-btn");
        const newRect = newBtn ? newBtn.getBoundingClientRect() : null;
        const newBtnOffset = newRect ? newRect.top : 0;

        // Calculate the difference and adjust scroll
        const scrollDiff = newBtnOffset - btnOffset;
        window.scrollBy({ top: scrollDiff, behavior: "auto" });
      });
    },
    async viewMoreTrending() {
      // Get the button's position relative to the viewport
      const btn = this.$el.querySelector(".view-more-trending-btn");
      const rect = btn ? btn.getBoundingClientRect() : null;
      const btnOffset = rect ? rect.top : 0;

      // Remember the current number of cards
      const oldCount = this.trendingAnime.length;

      this.trendingPage += 1;
      await this.fetchTrendingAnime(true);

      this.$nextTick(() => {
        // Get the first new card after loading more
        const cards = this.$el.querySelectorAll(".trending-card");
        const firstNewCard = cards[oldCount];
        if (firstNewCard) {
          const newRect = firstNewCard.getBoundingClientRect();
          const scrollDiff = newRect.top - btnOffset;
          window.scrollBy({ top: scrollDiff, behavior: "auto" });
        }
      });
    },
  },
};
</script>
