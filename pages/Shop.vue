<template>
  <div class="flex flex-col items-center px-4">
    <h1 class="text-4xl md:text-6xl font-bold text-center mb-6">Shop</h1>
    <div class="w-full md:w-5/6 m-auto flex flex-wrap items-center justify-center gap-4">
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
      <stripe-buy-button
        buy-button-id="buy_btn_1RDtO8DHPkLwKHSucUxbXLYu"
        :publishable-key="publishableKey"
        :stripe-account="accountId"
      ></stripe-buy-button>
    </div>
  </div>
</template>

<script setup>
import { useRuntimeConfig } from '#app';

const config = useRuntimeConfig();
const publishableKey = config.public.STRIPE_PUBLIC_KEY;
const accountId = config.public.STRIPE_ACCOUNT_ID;

onMounted(() => {
  const script = document.createElement('script');
  script.src = 'https://js.stripe.com/v3/buy-button.js';
  script.async = true;
  document.body.appendChild(script);
});
</script>



