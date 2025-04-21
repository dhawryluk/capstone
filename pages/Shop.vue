<template>
  <div class="flex flex-col items-center px-4">
    <h1 class="w-full md:w-5/6 dark:bg-gradient-to-r dark:from-secondary dark:via-accent2 dark:to-darkColor bg-gradient-to-r from-lightColor via-accent2 to-white text-lightColor rounded-lg text-2xl md:text-6xl font-bold ring-2 ring-accent1 dark:ring-accent2 text-center mb-8 py-4 font-sans drop-shadow-lg">Shop</h1>
    <div
      class="w-full md:w-5/6 m-auto flex flex-wrap items-center justify-center gap-4"
    >
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RGPXmDHPkLwKHSu7HvFydTz"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RGPT6DHPkLwKHSuf4mW2f3r"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RGPbeDHPkLwKHSubtz4eROM"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RGPdxDHPkLwKHSu3pS8uxtl"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RGPfVDHPkLwKHSuMWGy161i"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RGPhGDHPkLwKHSuRUwjaz0I"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from "#app";

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
