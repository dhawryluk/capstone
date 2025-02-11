export default defineEventHandler(async (event) => {
  try {
    const apiUrl = process.env.GAMES_API_URL;
    const apiKey = process.env.GAMES_API_KEY;

    // Get query parameters from the request
    const query = getQuery(event);
    const page = parseInt(query.page) || 1;
    const pageSize = parseInt(query.pageSize) || 12;

    // Calculate the date 30 days ahead
    const today = new Date();
    const ninetyDaysAhead = new Date(today.getTime() + 90 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const requestUrl = `${apiUrl}/games?key=${apiKey}&dates=${
      new Date().toISOString().split("T")[0]
    },${ninetyDaysAhead}&ordering=-added&page=${page}&page_size=${pageSize}`;

    console.log("Request URL:", requestUrl);

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `API request failed: ${data.error || response.statusText}`
      );
    }

    // Log the raw API response
    console.log("Raw API Response:", data);

    // Define the excluded slugs
    const excludedSlugs = ["hentai", "nsfw", "sexual-content", "nudity"];

    // Filter out games with excluded slugs, checking if tags exist
    const filteredData = data.results?.filter(
      (game) =>
        game.tags && !game.tags.some((tag) => excludedSlugs.includes(tag.slug))
    );

    // Log the filtered data
    console.log("Filtered Data:", filteredData);

    return { results: filteredData || [] };
  } catch (err) {
    console.error("An unexpected error occurred", err);
    return { error: err.message };
  }
});
