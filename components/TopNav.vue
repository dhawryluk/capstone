<template>
  <div
    class="absolute top-0 right-4 flex justify-end gap-12 text-accent1 dark:text-accent2 p-4"
  >
    <!-- <img
      v-if="src"
      :src="src"
      alt="Avatar"
      class="avatar image w-36 h-36 rounded-full mb-8"
    /> -->
    <NuxtLink v-if="user" to="/account">
      <h3 class="username">{{ user.email }}</h3>
    </NuxtLink>
    <NuxtLink to="/login">
      <Icon
        name="heroicons:arrow-right-end-on-rectangle-20-solid"
        size="24"
        class=""
      ></Icon
    ></NuxtLink>
    <NuxtLink @click="changeColor" class="cursor-pointer">
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
const user = useSupabaseUser();
// const props = defineProps(["path"]);
// const { path } = toRefs(props);
// const supabase = useSupabaseClient();
// const uploading = ref(false);
// const src = ref("");
// const files = ref();

// const downloadImage = async () => {
//   try {
//     const { data, error } = await supabase.storage
//       .from("avatars")
//       .download(path.value);
//     if (error) throw error;
//     src.value = URL.createObjectURL(data);
//     console.log(data, src, "string");

//     return src;
//   } catch (error) {
//     console.error("Error downloading image: ", error.message);
//   }
// };
// console.log("image");
// downloadImage();
// watch(path, () => {
//   if (path.value) {
//     downloadImage();
//   }
// });

const colorMode = useColorMode();
const changeColor = () =>
  (colorMode.preference = colorMode.value === "light" ? "dark" : "light");
</script>

<style scoped></style>
