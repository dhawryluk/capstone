<template>
    <div v-if="anime" class="p-4 w-5/6 mx-auto">
        <div v-if="anime.image" class="float-left mr-4 mb-4 w-1/3">
            <img
                :src="anime.image"
                alt="Anime Image"
                class="h-full rounded shadow-md object-cover"
            />
        </div>
        <h1 class="text-2xl font-bold mb-4">{{ anime.title }}</h1>
        <p class="text-lg mb-4">{{ anime.description }}</p>
        <div class="mb-4 clear-left">
            <p class="font-bold">Genres: {{ anime.genres.join(', ') }}</p>
            <p class="font-bold">Score: {{ anime.averageScore }}%</p>
            <p class="font-bold">Episodes: {{ anime.episodes }}</p>
            <p class="font-bold">Country of Origin: {{ anime.countryOfOrigin }}</p>
        </div>
        <div v-if="anime.trailer" class="mb-4 flex justify-center">
            <iframe
                :src="anime.trailer"
                frameborder="0"
                allowfullscreen
                class="w-full max-w-4xl h-96 rounded shadow-md"
            ></iframe>
        </div>
    </div>
    <div v-else class="p-4">
        <p class="text-lg">Loading...</p>
    </div>
</template>

<script>
const router = useRouter();

export default {
    setup() {
        const route = useRoute();
        const anime = ref(null);

        const sanitizeDescription = (description) => {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = description;
            return tempDiv.textContent || tempDiv.innerText || '';
        };

        const fetchAnime = async (id) => {
            try {
                const query = `
                    query ($id: Int) {
                        Media(id: $id, type: ANIME) {
                            title {
                                romaji
                            }
                            description
                            genres
                            averageScore
                            episodes
                            countryOfOrigin
                            coverImage {
                                extraLarge
                            }
                            trailer {
                                site
                                id
                            }
                        }
                    }
                `;
                const variables = { id: parseInt(id) };
                const response = await fetch('https://graphql.anilist.co', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ query, variables }),
                });
                const result = await response.json();
                anime.value = {
                    title: result.data.Media.title.romaji,
                    description: sanitizeDescription(result.data.Media.description),
                    genres: result.data.Media.genres,
                    averageScore: result.data.Media.averageScore,
                    episodes: result.data.Media.episodes,
                    countryOfOrigin: result.data.Media.countryOfOrigin,
                    image: result.data.Media.coverImage?.extraLarge || null,
                    trailer: result.data.Media.trailer?.site === 'youtube'
                        ? `https://www.youtube.com/embed/${result.data.Media.trailer.id}`
                        : null,
                };
            } catch (error) {
                console.error('Error fetching anime:', error);
                anime.value = null;
            }
        };

        fetchAnime(route.params.id);

        watch(() => route.params.id, (newId) => {
            fetchAnime(newId);
        });

        return { anime };
    },
};
</script>