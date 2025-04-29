<template>
  <div
    class="flex flex-col md:min-h-full justify-between bg-secondary/20 dark:bg-secondary rounded-lg text-accent1 dark:text-accent2 mr-4"
  >
    <!-- Main Navigation Links -->
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <UTooltip text="Home">
        <NuxtLink to="/" class="group relative">
          <Icon name="mdi:home" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Account">
        <NuxtLink :to="linkDestination" class="group relative">
          <Icon name="mdi:account-circle" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Social Feed">
        <NuxtLink to="/socialFeed" class="group relative">
          <Icon name="mdi:message-text" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Games">
        <NuxtLink to="/games" class="group relative">
          <Icon name="mdi:gamepad-variant" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="News">
        <NuxtLink to="/news" class="group relative">
          <Icon name="mdi:newspaper-variant-outline" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Anime">
        <NuxtLink to="/anime" class="group relative">
          <Icon name="mdi:movie-open-outline" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Shop">
        <NuxtLink to="/shop" class="group relative">
          <Icon name="mdi:cart-outline" size="36" />
        </NuxtLink>
      </UTooltip>
    </div>

    <!-- Social Media Links -->
    <div class="flex flex-col gap-12 py-4 mx-4 items-center md:items-start">
      <UTooltip text="Twitter">
        <NuxtLink to="https://twitter.com/" class="group relative">
          <Icon name="prime:twitter" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Facebook">
        <NuxtLink to="https://www.facebook.com/" class="group relative">
          <Icon name="mdi:facebook" size="36" />
        </NuxtLink>
      </UTooltip>
      <UTooltip text="Instagram">
        <NuxtLink to="https://www.instagram.com/" class="group relative">
          <Icon name="mdi:instagram" size="36" />
        </NuxtLink>
      </UTooltip>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();
const linkDestination = user.value ? "/account" : "/login";
</script>
