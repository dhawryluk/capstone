<template>
  <div class="h-screen p-14 text-darkColor dark:text-lightColor font-sans">
  <form class="form-widget" @submit.prevent="updateProfile">
    <Avatar v-model:path="avatar_path" @upload="updateProfile" />
    <div>
      <label
        for="email"
        class="block mt-2 font-serif uppercase"
        >Email</label
      >
      <input
        id="email"
        type="text"
        :value="user.email"
        class="w-full rounded-sm border-solid border-2 border-accent1 dark:border-accent2 p-2 font-serif bg-secondary"
        disabled
      />
    </div>
    <div>
      <label
        for="username"
        class="block mt-2 font-serif uppercase"
        >User Name</label
      >
      <input
        id="username"
        type="text"
        v-model="username"
        class="w-full rounded-sm border-solid border-2 border-accent1 dark:border-accent2 p-2 font-serif bg-secondary"
      />
    </div>

    <div>
      <input
        type="submit"
        class="button primary block"
        :value="loading ? 'Loading ...' : 'Update'"
        :disabled="loading"
      />
    </div>

    <div>
      <button class="bg-secondary p-2 rounded-lg" @click="signOut" :disabled="loading">
        Sign Out
      </button>
    </div>
  </form>
</div>
</template>

<script setup>
const supabase = useSupabaseClient();

const loading = ref(true);
const username = ref("");
const website = ref("");
const avatar_path = ref("");

loading.value = true;
const user = useSupabaseUser();

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

async function updateProfile() {
  try {
    loading.value = true;
    const user = useSupabaseUser();

    const updates = {
      id: user.value.id,
      username: username.value,
      website: website.value,
      avatar_url: avatar_path.value,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates, {
      returning: "minimal", // Don't return the value after inserting
    });

    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}

async function signOut() {
  try {
    loading.value = true;
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
  } catch (error) {
    alert(error.message);
  } finally {
    loading.value = false;
  }
}
</script>
