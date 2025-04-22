<template>
  <div class="w-full md:w-5/6 flex flex-col items-center px-4 m-auto">
    <h1 class="w-full dark:bg-gradient-to-r dark:from-secondary dark:via-accent2 dark:to-darkColor bg-gradient-to-r from-lightColor via-accent2 to-white text-lightColor rounded-lg text-2xl md:text-6xl font-bold ring-2 ring-accent1 dark:ring-accent2 text-center mb-8 py-4 font-sans drop-shadow-lg">Shop</h1>
    <div
      class="w-full md:w-5/6 m-auto flex flex-wrap items-center justify-center gap-4"
    >
      <ShopItem
        v-for="(item, index) in shopItems"
        :key="index"
        :item="item"
        :publishableKey="publishableKey"
        :accountId="accountId"
      />
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "#app";
import shopItems from "~/data/shopItems.json";
import ShopItem from "~/components/ShopItem.vue";

const config = useRuntimeConfig();
const publishableKey = config.public.STRIPE_PUBLIC_KEY;
const accountId = config.public.STRIPE_ACCOUNT_ID;

onMounted(() => {
  const script = document.createElement("script");
  script.src = "https://js.stripe.com/v3/buy-button.js";
  script.async = true;
  document.body.appendChild(script);
});
</script>
