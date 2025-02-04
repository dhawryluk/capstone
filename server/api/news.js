export default defineEventHandler(async () => {
<<<<<<< HEAD
  try {
    // Get the API URL and key from the environment variables
    const apiUrl = process.env.GAMESPOT_API_URL;
    const apiKey = process.env.GAMESPOT_API_KEY;

    // Get the current date and the date 7 days ago (formatted as YYYY-MM-DD)
    const today = new Date().toISOString().split("T")[0];
    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

      // Construct API request URL
    const requestUrl = `${apiUrl}articles/?api_key=${apiKey}&filter=publish_date:${sevenDaysAgo}|${today}&limit=12&sort=publish_date:desc&format=json`;

    // Fetch data from the API
    const response = await fetch(requestUrl);
    const data = await response.json();

    // Check if the API request was successful
    if (!response.ok) {
      throw new Error(`API request failed: ${data.error || response.statusText}`);
    }

    return data;
  } catch (error) {
    console.error("An unexpected error occurred:", error);
    return { articles: [], error: error.message };
  }
=======
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
>>>>>>> c094205e04dd8d9b4e8729a40a4bb496ce07175e
});
