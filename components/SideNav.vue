<template>
  <div
    class="flex flex-col md:min-h-full justify-between bg-secondary/20 dark:bg-secondary rounded-lg text-accent1 dark:text-accent2 mr-4"
  >
    <!-- Main Navigation Links -->
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <NuxtLink to="/" class="group relative">
        <Icon name="heroicons:home-solid" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Home
        </span>
      </NuxtLink>
      <NuxtLink :to="linkDestination" class="group relative">
        <Icon name="heroicons:user-solid" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Account
        </span>
      </NuxtLink>
      <NuxtLink to="/socialFeed" class="group relative">
        <Icon name="heroicons:chat-bubble-left-right-20-solid" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Social Feed
        </span>
      </NuxtLink>
      <NuxtLink to="/games" class="group relative">
        <Icon name="game-icons:console-controller" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Games
        </span>
      </NuxtLink>
      <NuxtLink to="/news" class="group relative">
        <Icon name="heroicons:newspaper-solid" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          News
        </span>
      </NuxtLink>
    </div>

    <!-- Social Media Links -->
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <NuxtLink to="https://twitter.com/" class="group relative">
        <Icon name="icon-park-twotone:big-x" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Twitter
        </span>
      </NuxtLink>
      <NuxtLink to="https://www.facebook.com/" class="group relative">
        <Icon name="icon-park-twotone:facebook" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Facebook
        </span>
      </NuxtLink>
      <NuxtLink to="https://www.instagram.com/" class="group relative">
        <Icon name="icon-park-twotone:instagram" size="36" />
        <span
          class="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-300"
        >
          Instagram
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const linkDestination = user.value ? "/account" : "/login";
</script>
