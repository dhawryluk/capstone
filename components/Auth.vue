<template>
  <div
    class="flex flex-col pt-14 w-1/3 md:w-1/2 mx-auto text-darkColor dark:text-lightColor font-sans"
  >
    <h1 class="text-3xl pb-6">Sign up or Login</h1>
    <form @submit.prevent="signIn" class="form-widget flex flex-col space-y-6">
      <div>
        <input
          placeholder="Your Email"
          type="email"
          name="email"
          id="email"
          v-model="email"
          class="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        />
      </div>
      <div>
        <input
          placeholder="Enter Password"
          type="password"
          name="password"
          id="password"
          v-model="password"
          class="w-3/4 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        />
      </div>
    </form>
    <div class="flex gap-4 pt-4">
        <PrimaryButton @click="signIn">Sign In</PrimaryButton>
        <PrimaryButton @click="signUp">Sign Up</PrimaryButton>
        <PrimaryButton @click="googleLogin">Login with Google</PrimaryButton>
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
    if (error) throw error;
    router.push("/confirm");
  } catch (error) {
    console.error(`Sign Up Error: ${error}`);
  }
}

// Use Google Login
async function googleLogin() {
  const supabase = useSupabaseClient();
  const { data, error } = supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error(error);
  }
  console.log("data");
  router.push("/confirm");
}
</script>
