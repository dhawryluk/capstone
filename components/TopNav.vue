<template>
  <div class="flex justify-end text-accent1 dark:text-accent2 my-4">
    <div class="w-full sm:w-fit flex bg-secondary/20 dark:bg-secondary rounded-lg p-4 gap-12">
      <UTooltip v-if="user" text="Account">
        <NuxtLink to="/account" class="group relative">
          <h3 class="username">{{ user.email }}</h3>
        </NuxtLink>
      </UTooltip>

      <UTooltip text="Login">
        <NuxtLink to="/login">
          <Icon
            name="heroicons:arrow-right-end-on-rectangle-20-solid"
            size="24"
          />
        </NuxtLink>
      </UTooltip>

      <UTooltip :text="colorMode.value === 'dark' ? 'Light Mode' : 'Dark Mode'">
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
        </NuxtLink>
      </UTooltip>
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
