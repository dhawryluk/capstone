<template>
  <div class="w-1/3 mx-auto pt-6">
    <h1 class="text-3xl pb-6">Contact Us</h1>
    <form @submit.prevent="sendEmail" class="flex flex-col space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <input
        type="email"
        placeholder="Your Email"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
      <textarea
        placeholder="Your Message"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows="5"
        required
      ></textarea>
      <PrimaryButton type="submit"> Send Message </PrimaryButton>
    </form>
  </div>
</template>

<script setup></script>
