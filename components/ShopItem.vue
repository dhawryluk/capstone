<template>
  <div class="flex flex-col items-center text-center gap-6">
    <UCarousel v-slot="{ item: carouselItem }" arrows :items="item.images" class="w-full max-w-xs mx-auto">
      <img :src="carouselItem" width="320" height="320" class="rounded-lg" />
    </UCarousel>
    <stripe-buy-button
      :buy-button-id="item.buyButtonId"
      :publishable-key="publishableKey"
      :stripe-account="accountId"
    ></stripe-buy-button>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  },
  publishableKey: {
    type: String,
    required: true
  },
  accountId: {
    type: String,
    required: true
  }
});
</script>
