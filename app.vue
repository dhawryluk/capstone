<template>
  <NuxtLoadingIndicator />
  <div
    class="bg-lightColor dark:bg-darkColor text-darkColor dark:text-lightColor flex flex-col"
  >
    <TopNav />
    <div class="flex">
      <SideNav class="w-1/5" />
      <NuxtPage class="w-4/5 m-auto"></NuxtPage>
    </div>
    <Footer />
  </div>
</template>

<script setup></script>
