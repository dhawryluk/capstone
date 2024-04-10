<script setup>
const user = useSupabaseUser();
</script>

<template>
  <div class="container flex flex-col w-1/3 m-auto">
    <Account v-if="user" />
    <Auth v-else />
  </div>
</template>
