export default defineEventHandler(async () => {
  try {
    const apiUrl = process.env.GAMES_API_URL;
    const apiKey = process.env.GAMES_API_KEY;

    // Calculate the date from 30 days ago
    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 30))
      .toISOString()
      .split("T")[0];

    const requestUrl = `${apiUrl}/games?key=${apiKey}&dates=${thirtyDaysAgo},${
      new Date().toISOString().split("T")[0]
    }&ordering=-added`;

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `API request failed: ${data.error || response.statusText}`
      );
    }

    // Define the excluded slugs
    const excludedSlugs = ["hentai", "nsfw", "sexual-content", "nudity"];

    // Filter out games with excluded slugs
    const filteredData = data.results?.filter(
      (game) => !game.tags.some((tag) => excludedSlugs.includes(tag.slug))
    );

    return { results: filteredData || [] };
  } catch (err) {
    console.error("An unexpected error occurred", err);
    return { error: err.message };
  }
});
