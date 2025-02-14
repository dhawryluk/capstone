<template>
  <NuxtLoadingIndicator />
  <div
    class="bg-lightColor dark:bg-darkColor text-darkColor dark:text-lightColor"
  >
    <TopNav />
    <div class="flex">
      <SideNav />
      <NuxtPage />
    </div>
    <Footer />
  </div>
</template>
