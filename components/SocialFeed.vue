<template>
  <div class="w-5/6 m-auto text-darkColor dark:text-lightColor font-sans">
    <form
      @submit.prevent="postComment"
      class="flex flex-col md:w-3/4 md:mx-auto space-y-4 h-full"
    >
      <h1 class="text-3xl pb-6">What's on your mind?</h1>
      <textarea
        placeholder="Your Comment"
        type="text"
        name="comments"
        id="comments"
        v-model="comments"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        rows="5"
        required
      ></textarea>
      <PrimaryButton type="submit" class="py-4">Post Comment</PrimaryButton>
    </form>
    <div>
      <UModal v-model="isOpen" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-darkColor dark:text-lightColor"
            >
              Your Comment has been Posted!
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isClosed"
            />
          </div>
        </UCard>
      </UModal>
    </div>
    <div>
      <UModal v-model="isBannedModalOpen" prevent-close>
        <UCard
          :ui="{
            ring: '',
            divide: 'divide-y divide-gray-100 dark:divide-gray-800',
          }"
        >
          <div class="flex items-center justify-between">
            <h3
              class="text-base font-semibold leading-6 text-darkColor dark:text-lightColor"
            >
              Inappropriate Language Detected
            </h3>
            <UButton
              color="gray"
              variant="ghost"
              icon="i-heroicons-x-mark-20-solid"
              class="-my-1"
              @click="isBannedModalOpen = false"
            />
          </div>
          <div class="mt-4">
            <p>
              Your comment contains inappropriate language and cannot be posted.
            </p>
          </div>
        </UCard>
      </UModal>
    </div>
    <div>
      <ul v-if="data && data.length > 0">
        <h1 class="text-xl md:text-3xl py-6">Let's Chat!</h1>
        <li
          v-for="(comment, i) in data"
          :key="i"
          class="bg-secondary/20 dark:bg-secondary text-sm md:text-lg my-2 md:my-4 p-2 md:p-4 rounded-lg"
        >
          <Icon
            name="heroicons:user-20-solid"
            size="20"
            class="text-accent1 dark:text-accent2"
          /><span class="m-2 italic">{{ comment.username }}:</span>
          <p class="p-2">
            {{ comment.comments }}
          </p>
        </li>
      </ul>
      <PrimaryButton v-if="hasMore" @click="loadMore">
        Load More
      </PrimaryButton>
      <p v-else-if="data.length === 0" class="text-center text-gray-500">
        No comments yet. Be the first to post!
      </p>
    </div>
  </div>
</template>

<script setup>
import Papa from "papaparse";

const supabase = useSupabaseClient();
const user = useSupabaseUser();
const username = ref("");
const comments = ref("");
const data = ref([]);
let isOpen = ref(false);
let isBannedModalOpen = ref(false);
const bannedWords = ref([]);

const page = ref(1);
const pageSize = 12;
const hasMore = ref(true);

async function loadBannedWords() {
  try {
    const response = await fetch("/banned_words.csv");
    const csvText = await response.text();
    const parsed = Papa.parse(csvText, { skipEmptyLines: true });
    // Flatten and clean up
    bannedWords.value = parsed.data
      .flat()
      .map((w) => (w || "").trim().toLowerCase().replace(/,+$/, ""))
      .filter((w) => !!w && w.length > 0);
  } catch (error) {
    console.error("Failed to load banned words:", error);
  }
}

async function fetchComments(reset = false) {
  try {
    if (reset) {
      page.value = 1;
      data.value = [];
      hasMore.value = true;
    }
    const from = (page.value - 1) * pageSize;
    const to = from + pageSize - 1;
    const { data: commentsData, error } = await supabase
      .from("social_feed")
      .select("*")
      .order("id", { ascending: false })
      .range(from, to);

    if (error) throw error;

    if (!commentsData || commentsData.length < pageSize) {
      hasMore.value = false;
    }
    data.value = [...data.value, ...(commentsData || [])];
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
}

function loadMore() {
  page.value++;
  fetchComments();
}

onMounted(async () => {
  await loadBannedWords();
  if (user.value) {
    try {
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", user.value.id)
        .single();

      if (error) throw error;

      if (profileData) {
        username.value = profileData.username;
      }
    } catch (error) {
      console.error("Error fetching username:", error);
    }
  } else {
    console.error("User is not logged in.");
  }
  await fetchComments(true);
});

function containsBannedWord(text) {
  const lowerText = text.toLowerCase();
  return bannedWords.value
    .filter((word) => word && word.length > 0)
    .some((word) => lowerText.includes(word));
}

async function postComment() {
  if (!username.value) {
    console.error("Username is not set. Cannot post comment.");
    return;
  }
  if (containsBannedWord(comments.value)) {
    isBannedModalOpen.value = true;
    return;
  }
  try {
    const { error } = await supabase
      .from("social_feed")
      .insert([{ username: username.value, comments: comments.value }])
      .select();
    if (error) throw error;

    isOpen.value = true;

    await fetchComments(true);
  } catch (error) {
    console.error("Error sending message:", error.message || error);
  }
}

async function isClosed() {
  isOpen.value = false;
  window.location.reload();
}
</script>
