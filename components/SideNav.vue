<template>
  <div
    class="flex flex-col md:min-h-full md:justify-between bg-secondary rounded-lg text-accent1 dark:text-accent2 mr-4"
  >
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <NuxtLink to="/"
        ><Icon name="heroicons:home-solid" size="36"></Icon
      ></NuxtLink>
      <NuxtLink :to="linkDestination">
        <Icon name="heroicons:user-solid" size="36" class=""></Icon>
      </NuxtLink>
      <NuxtLink to="/socialFeed"
        ><Icon name="heroicons:chat-bubble-left-right-20-solid" size="36"></Icon
      ></NuxtLink>
      <NuxtLink to="/games"
        ><Icon name="game-icons:console-controller" size="36"></Icon
      ></NuxtLink>
      <NuxtLink to="/news"
        ><Icon name="heroicons:newspaper-solid" size="36"></Icon
      ></NuxtLink>
    </div>
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <NuxtLink to="https://twitter.com/"
        ><Icon name="icon-park-twotone:big-x" size="36"></Icon>
      </NuxtLink>
      <NuxtLink to="https://www.facebook.com/"
        ><Icon name="icon-park-twotone:facebook" size="36"></Icon>
      </NuxtLink>
      <NuxtLink to="https://www.instagram.com/"
        ><Icon name="icon-park-twotone:instagram" size="36"></Icon>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const linkDestination = user.value ? "/account" : "/login";
</script>
