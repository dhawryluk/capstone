export default defineEventHandler(async () => {
  let articles = [];
  let error = null;
  try {
    const runtimeConfig = useRuntimeConfig();
    const { data, error: fetchError } = await useFetch(
      `${runtimeConfig.public.GAMESPOT_API_URL}articles/?api_key=${runtimeConfig.public.GAMESPOT_API_KEY}&filter=publish_date:2024-04-03|2024-04-20&limit=10&sort=publish_date:desc&format=json`
    );
    if (fetchError) {
      error = fetchError;
      console.error("API request failed:", error.value);
    } else {
      articles = data.value.results;
    }
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    error = err;
  }
  return { articles, error };
});
