<template>
  <form
    class="flex flex-col space-y-6 pt-14 w-1/3 md:w-1/2 mx-auto text-darkColor dark:text-lightColor font-sans"
    @submit.prevent="updateProfile"
  >
    <Avatar v-model:path="avatar_path" @upload="updateProfile" />
    <div>
      <input
        placeholder="Your Email"
        id="email"
        type="text"
        :value="user.email"
        class="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        disabled
      />
    </div>
    <div>
      <input
        placeholder="Your Username"
        id="username"
        type="text"
        v-model="username"
        class="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
      />
    </div>
    <div class="flex gap-4 pt-4">
      <PrimaryButton
        @click="updateProfile"
        :disabled="loading">
        {{ loading ? 'Loading ...' : 'Update' }}
      </PrimaryButton>
      <PrimaryButton @click="signOut">Sign Out</PrimaryButton>
    </div>
    
    <!-- Add the UModal here -->
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
            Your update has been submitted!
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
  </form>
</template>


<script setup>
const supabase = useSupabaseClient();
const user = useSupabaseUser();
const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_path = ref("");
const isOpen = ref(false); // Add state for the modal
const router = useRouter();
loading.value = true;

// Fetch user data
const { data } = await supabase
  .from("profiles")
  .select(`username, website, avatar_url`)
  .eq("id", user.value.id)
  .single();

if (data) {
  username.value = data.username;
  website.value = data.website;
  avatar_path.value = data.avatar_url;
}

loading.value = false;

// Function to update the profile
async function updateProfile() {
  try {
    loading.value = true;

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal",
    });

    if (error) throw error;

    // Open the modal on success
    isOpen.value = true;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

// Function to close the modal
function isClosed() {
  isOpen.value = false;
}

// Function to sign out
async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    router.push("/login");
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
