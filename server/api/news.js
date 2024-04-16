export default defineEventHandler(async () => {
  let articles = [];
  let error = null;
  try {
    const runtimeConfig = useRuntimeConfig();
    const data = await fetch(
      `${runtimeConfig.public.GAMESPOT_API_URL}articles/?api_key=${runtimeConfig.public.GAMESPOT_API_KEY}&filter=publish_date:2024-04-03|2024-04-20&limit=10&sort=publish_date:desc&format=json`
    );
    const response = await data.json();
    // console.log(response);
    if (data.error) {
      console.error("API request failed:", data.error);
      throw error;
    }
    return response;
  } catch (err) {
    console.error("An unexpected error occurred:", err);
    error = err;
  }
  return { articles, error };
});
