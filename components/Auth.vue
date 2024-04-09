<template>
  <div
    class="p-14 w-full h-screen text-darkColor dark:text-lightColor font-sans"
  >
    <div class="flex flex-col w-1/3 m-auto">
      <h1 class="text-2xl m-2 font-serif uppercase">Sign up or Login</h1>
      <form @submit.prevent="signIn">
        <div class="flex p-2">
          <label for="email" class="w-48 m-2 uppercase">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
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
            class="flex justify-self-end w-full rounded-sm border-solid border-2 border-accent1 dark:border-accent2 p-2 font-serif bg-secondary self-end"
          />
          <div>{{ password }}</div>
        </div>
      </form>
      <div class="flex justify-end gap-4 pt-4 mr-2">
        <button class="bg-secondary p-2 rounded-lg" @click="signIn">
          Sign In
        </button>
        <button class="bg-secondary p-2 rounded-lg" @click="signUp">
          Sign Up
        </button>
        <button @click="useGoogleLogin">Login with Google</button>
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
  const supabase = useSupabaseClient();
  const { error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error(error);
  }
}

// Sign up info
async function signUp() {
  const supabase = useSupabaseClient();
  const { error } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
  });
  if (error) {
    console.error(error);
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
