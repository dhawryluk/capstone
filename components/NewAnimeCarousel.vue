<template>
    <div v-if="newAnime.length > 0" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
        <NuxtLink
            v-for="anime in newAnime"
            :key="anime.id"
            :to="`/anime/${anime.id}`"
            class="rounded-lg overflow-hidden shadow-lg"
        >
            <img
                :src="anime.image"
                :alt="anime.title"
                class="w-full h-[500px] object-cover"
                draggable="false"
            />
            <div class="w-full h-16 bg-gradient-to-t from-secondary to-transparent text-lightColor p-2">
                <p class="text-sm font-bold truncate">{{ anime.title }}</p>
            </div>
        </NuxtLink>
    </div>
</template>

<script>
export default {
    data() {
        return {
            newAnime: [],
        };
    },
    async created() {
        await this.fetchNewAnime();
    },
    methods: {
        async fetchNewAnime() {
            try {
                const query = `
                    query {
                        Page(page: 1, perPage: 4) {
                            media(type: ANIME, sort: START_DATE_DESC) {
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
                const animeList = result.data.Page.media.map(anime => ({
                    id: anime.id,
                    title: anime.title.romaji,
                    image: anime.coverImage.extraLarge,
                }));

                // Shuffle the anime list to randomize the display
                this.newAnime = animeList.sort(() => Math.random() - 0.5);
            } catch (error) {
                console.error('Error fetching new anime:', error.message);
            }
        },
    },
};
</script>
