<template>
  <div class="text-darkColor dark:text-lightColor font-sans">
    <form
      @submit.prevent="postComment"
      class="flex flex-col md:w-3/4 md:mx-auto space-y-4 h-full"
    >
      <h1 class="text-3xl pb-6">What's on you mind?</h1>
      <input
        placeholder="User Name"
        type="text"
        name="username"
        id="username"
        v-model="username"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        required
      />
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
      <h1 class="flex flex-col text-2xl mt-6">Lets Chat</h1>
      <ul>
        <li
          v-for="(comment, i) in data"
          :key="i"
          class="text-lightColor bg-secondary my-4 p-4 rounded-lg"
        >
          <Icon
            name="heroicons:user-20-solid"
            size="24"
            class="text-center text-accent1 dark:text-accent2"
          /><span class="m-2 italic">{{ comment.username }}:</span>
          <p class="p-2 pl-4">
            {{ comment.comments }}
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const runtimeConfig = useRuntimeConfig();
const username = ref("");
const comments = ref("");
const router = useRouter();
let isOpen = ref(false);

async function postComment() {
  try {
    const { error } = await supabase
      .from("social_feed")
      .insert([{ username: username.value, comments: comments.value }])
      .select();
    if (error) throw error;
    isOpen.value = true;
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
}
async function isClosed() {
  router.push("/");
}

const { data } = await useFetch(
  `${runtimeConfig.public.SUPABASE_URL}/rest/v1/social_feed?apikey=${runtimeConfig.public.SUPABASE_KEY}`
);
</script>
