<template>
  <main>
    <h1>Confirmation Page</h1>
    <NuxtLink to="/">Take me home</NuxtLink>
  </main>
</template>

<script setup>
const user = useSupabaseUser();
const client = useSupabaseClient();

watch(
  user,
  () => {
    if (!user.value) {
      return navigateTo("/");
    }
  },
  { immediate: true }
);
</script>
