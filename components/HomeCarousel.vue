<template>
    <div v-if="results.length > 0" class="relative w-full md:w-5/6 mx-auto mt-8 overflow-hidden">
        <div
            class="flex transition-transform duration-500 ease-in-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }"
        >
            <div
                v-for="(game, index) in loopedResults"
                :key="index"
                class="w-full flex-shrink-0 relative"
            >
                <img
                    :src="game.background_image"
                    :alt="game.name"
                    class="w-full h-[600px] object-cover object-center"
                    draggable="false"
                />
                <div class="absolute bottom-0 left-0 w-full bg-secondary/50 text-lightColor font-bold dark:bg-secondary dark:text-lightColor text-center py-2">
                    <p>{{ game.name }} Releasing: {{ game.released }}</p>
                </div>
            </div>
        </div>
        <button
            @click="prevSlide"
            class="absolute top-1/2 left-4 transform -translate-y-1/2"
        >
            <icon name="heroicons:arrow-left-circle-20-solid" size="36" class="hover:bg-secondary"></icon>
        </button>
        <button
            @click="nextSlide"
            class="absolute top-1/2 right-4 transform -translate-y-1/2"
        >
            <icon name="heroicons:arrow-right-circle-20-solid" size="36" class="hover:bg-secondary"></icon>
        </button>
    </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";

const results = ref([]);
const currentIndex = ref(0);
const error = ref(null);
const loading = ref(true);

// Create a computed property to handle the looped results
const loopedResults = computed(() => {
    return results.value.length > 0 ? [...results.value, { ...results.value[0] }] : [];
});

const fetchGames = async () => {
    try {
        const response = await fetch("/api/trending");
        const data = await response.json();

        if (response.ok && data?.results) {
            results.value = data.results;
        } else {
            console.warn("Data is not in the expected format or is missing:", data);
        }
    } catch (err) {
        console.error("Fetch error:", err);
        error.value = err.message;
    } finally {
        loading.value = false;
    }
};

const nextSlide = () => {
    if (currentIndex.value === results.value.length) {
        setTimeout(() => {
            currentIndex.value = 0; // Reset to the first slide without animation
        }, 500); // Match the transition duration
    } else {
        currentIndex.value++;
    }
};

const prevSlide = () => {
    if (currentIndex.value === 0) {
        currentIndex.value = results.value.length - 1;
    } else {
        currentIndex.value--;
    }
};

onMounted(() => {
    fetchGames();
});
</script>