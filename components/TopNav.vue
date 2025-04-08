<template>
  <div class="flex justify-end text-accent1 dark:text-accent2 my-4">
    <div class="w-full sm:w-fit flex bg-secondary/20 dark:bg-secondary rounded-lg p-4 gap-12">
      <!-- User Email with Tooltip -->
      <NuxtLink v-if="user" to="/account" class="group relative">
        <h3 class="username">{{ user.email }}</h3>
        <span
          class="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-500"
        >
          Account
        </span>
      </NuxtLink>

      <!-- Login Icon with Tooltip -->
      <NuxtLink to="/login" class="group relative">
        <Icon
          name="heroicons:arrow-right-end-on-rectangle-20-solid"
          size="24"
        />
        <span
          class="absolute right-full mr-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-500"
        >
          Login
        </span>
      </NuxtLink>

      <!-- Color Scheme Icon with Tooltip -->
      <NuxtLink @click="changeColor" class="group relative cursor-pointer">
        <ColorScheme placeholder="...">
          <Icon
            v-if="colorMode.value === 'dark'"
            name="heroicons:moon-solid"
            size="24"
            class="text-accent2"
          />
          <Icon
            v-else
            name="heroicons:sun-solid"
            size="24"
            class="text-accent1"
          />
        </ColorScheme>
        <span
          class="absolute right-full top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-darkColor text-lightColor text-xs py-1 px-2 rounded-lg shadow-lg transition-opacity delay-500"
        >
          {{ colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode' }}
        </span>
      </NuxtLink>
    </div>
  </div>
</template>

<script setup>
const user = useSupabaseUser();

const colorMode = useColorMode();
const changeColor = () =>
  (colorMode.preference = colorMode.value === "light" ? "dark" : "light");
</script>

<style scoped></style>
