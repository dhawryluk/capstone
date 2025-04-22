<template>
  <div
    class="flex flex-col md:min-h-full justify-between bg-secondary/20 dark:bg-secondary rounded-lg text-accent1 dark:text-accent2 mr-4"
  >
    <!-- Main Navigation Links -->
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <UTooltip text="Home">
        <NuxtLink to="/" class="group relative">
          <Icon name="heroicons:home-solid" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Account">
        <NuxtLink :to="linkDestination" class="group relative">
          <Icon name="heroicons:user-solid" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Social Feed">
        <NuxtLink to="/socialFeed" class="group relative">
          <Icon name="heroicons:chat-bubble-left-right-20-solid" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Games">
        <NuxtLink to="/games" class="group relative">
          <Icon name="game-icons:console-controller" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="News">
        <NuxtLink to="/news" class="group relative">
          <Icon name="heroicons:newspaper-solid" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Shop">
        <NuxtLink to="/shop" class="group relative">
          <Icon name="mdi:tshirt-crew" size="36" />
        </NuxtLink>
      </UTooltip>
    </div>

    <!-- Social Media Links -->
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <UTooltip text="Twitter">
        <NuxtLink to="https://twitter.com/" class="group relative">
          <Icon name="icon-park-twotone:big-x" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Facebook">
        <NuxtLink to="https://www.facebook.com/" class="group relative">
          <Icon name="icon-park-twotone:facebook" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Instagram">
        <NuxtLink to="https://www.instagram.com/" class="group relative">
          <Icon name="icon-park-twotone:instagram" size="36" />
        </NuxtLink>
      </UTooltip>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const linkDestination = user.value ? "/account" : "/login";
</script>
