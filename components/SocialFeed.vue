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
      <ul v-if="data && data.length > 0">
        <h1 class="text-xl md:text-3xl py-6">
        Let's Chat!
        </h1>
        <li
          v-for="(comment, i) in data.slice().reverse()"
          :key="i"
          class="text-sm md:text-lg text-lightColor bg-secondary my-2 md:my-4 p-2 md:p-4 rounded-lg"
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
<p v-else class="text-center text-gray-500">No comments yet. Be the first to post!</p>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const runtimeConfig = useRuntimeConfig();
const username = ref("");
const comments = ref("");
const data = ref([]);
let isOpen = ref(false);

onMounted(async () => {
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

  // Fetch comments
  try {
    const { data: commentsData, error } = await supabase
      .from("social_feed")
      .select("*");

    if (error) throw error;

    data.value = commentsData || [];
  } catch (error) {
    console.error("Error fetching comments:", error);
  }
});

// Post new comment
async function postComment() {
  if (!username.value) {
    console.error("Username is not set. Cannot post comment.");
    return;
  }
  try {
    const { error } = await supabase
      .from("social_feed")
      .insert([{ username: username.value, comments: comments.value }])
      .select();
    if (error) throw error;

    isOpen.value = true;

    // Refresh comments after posting
    const { data: updatedComments, error: fetchError } = await supabase
      .from("social_feed")
      .select("*");

    if (fetchError) throw fetchError;
    data.value = updatedComments || [];
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
}

// Closing Pop-up
async function isClosed() {
  isOpen.value = false;
  window.location.reload();
}
</script>