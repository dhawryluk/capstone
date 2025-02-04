export default defineEventHandler(async () => {
  try {
    const apiUrl = process.env.GAMES_API_URL;
    const apiKey = process.env.GAMES_API_KEY;

    const today = new Date().toISOString().split("T")[0];
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      .toISOString()
      .split("T")[0];

    const requestUrl = `${apiUrl}/games?key=${apiKey}&dates=${thirtyDaysAgo},${today}&ordering=added`;

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(`API request failed: ${data.error || response.statusText}`);
    }

    // Define the excluded slugs
    const excludedSlugs = ['hentai', 'nsfw', 'sexual-content', 'nudity'];

    // Filter out games with excluded slugs
    const filteredData = data.results.filter(game =>
      !game.tags.some(tag => excludedSlugs.includes(tag.slug))
    );

    return { results: filteredData };
  } catch (err) {
    console.error("An unexpected error occurred", err);
    return { error: err.message };
  }
});