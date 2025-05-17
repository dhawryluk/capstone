export default defineEventHandler(async () => {
  try {
    const apiUrl = process.env.GAMES_API_URL;
    const apiKey = process.env.GAMES_API_KEY;

    const today = new Date();
    const thirtyDaysAgo = new Date(today.setDate(today.getDate() - 365))
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

    const excludedSlugs = ["hentai", "nsfw", "sexual-content", "nudity"];

    const filteredData = data.results?.filter(
      (game) => !game.tags.some((tag) => excludedSlugs.includes(tag.slug))
    );

    return { results: filteredData || [] };
  } catch (err) {
    console.error("An unexpected error occurred", err);
    return { error: err.message };
  }
});
