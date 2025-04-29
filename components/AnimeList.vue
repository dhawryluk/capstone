<template>
    <div class="px-6">
        <h2 class="text-2xl font-bold mb-4 text-center">Find Your Favorite Anime</h2>
        <input
            type="text"
            v-model="searchQuery"
            placeholder="Search title..."
            class="w-full mb-4 px-4 py-2 border border-secondary dark:border-lightColor rounded-md focus:outline-none focus:ring-2 focus:ring-accent1 dark:focus:ring-accent2"
            @input="searchAnime"
        />
        <ul class="list-none p-0">
            <li
                v-for="anime in animeList"
                :key="anime.id"
                class="mb-2 cursor-pointer text-accent1 dark:text-accent2 hover:underline"
            >
                <NuxtLink :to="`/anime/${anime.id}`">{{ anime.title }}</NuxtLink>
            </li>
        </ul>
        <h2 class="text-2xl font-bold my-6 text-center">Trending Now</h2>
        <div v-if="loading" class="text-center text-xl py-4">Loading Anime...</div>
        <div v-else-if="error" class="text-center text-red-500 py-4">
            Error: {{ error }}
        </div>
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
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
                    <h3 class="text-lg font-semibold">{{ anime.title }}</h3>
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
        };
    },
    async created() {
        await this.fetchAnimeList();
        await this.fetchTrendingAnime();
    },
    methods: {
        async fetchAnimeList(search = "") {
            try {
                const query = `
                    query ($page: Int, $perPage: Int, $search: String) {
                        Page(page: $page, perPage: $perPage) {
                            media(type: ANIME, search: $search) {
                                id
                                title {
                                    romaji
                                }
                            }
                        }
                    }
                `;
                const variables = { page: 1, perPage: 10, search };
                const response = await fetch('https://graphql.anilist.co', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query, variables }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                this.animeList = result.data.Page.media.map(anime => ({
                    id: anime.id,
                    title: anime.title.romaji,
                }));
            } catch (error) {
                console.error('Error fetching anime list:', error.message);
                console.error('Stack trace:', error.stack);
            }
        },
        async fetchTrendingAnime() {
            try {
                const query = `
                    query {
                        Page(page: 1, perPage: 15) {
                            media(type: ANIME, sort: TRENDING_DESC) {
                                id
                                title {
                                    romaji
                                }
                                coverImage {
                                    extraLarge
                                }
                            }
                        }
                    }
                `;
                const response = await fetch('https://graphql.anilist.co', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const result = await response.json();
                this.trendingAnime = result.data.Page.media.map(anime => ({
                    id: anime.id,
                    title: anime.title.romaji,
                    image: anime.coverImage.extraLarge,
                }));
            } catch (error) {
                console.error('Error fetching trending anime:', error.message);
                console.error('Stack trace:', error.stack);
            }
        },
        async searchAnime() {
            await this.fetchAnimeList(this.searchQuery);
        },
    },
};
</script>