<template>
  <div
    class="absolute top-0 right-4 flex justify-end gap-12 text-accent1 dark:text-accent2 p-4"
  >
    <NuxtLink
      ><Icon name="heroicons:chat-bubble-oval-left" size="24" class=""></Icon
    ></NuxtLink>
    <NuxtLink
      ><Icon name="heroicons:shopping-bag" size="24" class=""></Icon
    ></NuxtLink>
    <NuxtLink to="/account">
      <Icon
        name="heroicons:arrow-right-end-on-rectangle-20-solid"
        size="24"
        class=""
      ></Icon
    ></NuxtLink>
    <NuxtLink @click="changeColor">
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
  </div>
</template>

<script setup>
const colorMode = useColorMode();
const changeColor = () =>
  (colorMode.preference = colorMode.value === "light" ? "dark" : "light");
</script>

<style lang="scss" scoped></style>
