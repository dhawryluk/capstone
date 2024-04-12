<template>
  <div
    class="flex flex-col pt-14 w-1/2 m-auto text-darkColor dark:text-lightColor font-sans"
  >
    <h1 class="text-3xl pb-6">Contact Us</h1>
    <form @submit.prevent="sendEmail" class="flex flex-col space-y-4">
      <input
        placeholder="Your Name"
        type="text"
        name="yourName"
        id="yourName"
        v-model="yourName"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        required
      />
      <input
        placeholder="Your Email"
        type="email"
        name="email"
        id="email"
        v-model="email"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        required
      />
      <textarea
        placeholder="Your Message"
        type="text"
        name="message"
        id="message"
        v-model="message"
        class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-accent2"
        rows="5"
        required
      ></textarea>
      <PrimaryButton type="submit"> Send Message </PrimaryButton>
    </form>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient();
const yourName = ref("");
const email = ref("");
const message = ref("");
const router = useRouter();

async function sendEmail() {
  console.log(yourName, email, message, "message");
  try {
    const { data, error } = await supabase
      .from("contact-page")
      .insert([
        { name: yourName.value, email: email.value, message: message.value },
      ])
      .select();
    console.log(data, "data");
    if (error) throw error;
    router.push("/");
  } catch (error) {
    console.error(`Error sending message: ${error}`);
  }
}
</script>
