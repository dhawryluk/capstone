<template>
  <div
    class="bg-lightColor dark:bg-darkColor text-darkColor dark:text-lightColor"
  >
    <TopNav />
    <SideNav />
    <NuxtPage></NuxtPage>
  </div>
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
