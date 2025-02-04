export default defineEventHandler(async () => {
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
});
