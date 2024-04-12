<template>
  <div class="p-14 w-full text-darkColor dark:text-lightColor font-sans">
    <div class="">
      <h1 class="text-2xl m-2 font-serif uppercase">Sign up or Login</h1>
      <form @submit.prevent="signIn">
        <div class="flex p-2">
          <label for="email" class="w-48 m-2 uppercase">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            v-model="email"
            class="flex justify-self-end w-full rounded-sm border-solid border-2 border-accent1 dark:border-accent2 p-2 font-serif bg-secondary"
          />
          <div>{{ email }}</div>
        </div>
        <div class="flex p-2">
          <label for="password" class="w-48 m-2 uppercase">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            v-model="password"
            class="flex justify-self-end w-full rounded-sm border-solid border-2 border-accent1 dark:border-accent2 p-2 font-serif bg-secondary self-end"
          />
          <div>{{ password }}</div>
        </div>
      </form>
      <div class="flex justify-end gap-4 pt-4 mr-2">
        <PrimaryButton @click="signIn">Sign In</PrimaryButton>
        <PrimaryButton @click="signUp">Sign Up</PrimaryButton>
        <PrimaryButton @click="googleLogin">Login with Google</PrimaryButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const router = useRouter();
const supabase = useSupabaseClient();
const email = ref("");
const password = ref("");

// Sign in info
async function signIn() {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value,
    });
    if (error) throw error;
    router.push("/confirm");
  } catch (error) {
    console.error(`Login Error: ${error}`);
  }
}

// Sign up info
async function signUp() {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
    });
    if (error) {
      throw error;
    }
  } catch (error) {
    console.error(`Sign Up Error: ${error}`);
  }
}

// Use Google Login
async function googleLogin() {
  const supabase = useSupabaseClient();
  const { error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error(error);
  }
}
</script>
