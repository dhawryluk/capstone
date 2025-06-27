export default defineEventHandler(async (event) => {
  try {
    const apiUrl = process.env.GAMES_API_URL;
    const apiKey = process.env.GAMES_API_KEY;

    const query = getQuery(event);
    const page = parseInt(query.page || "1", 10);
    const pageSize = 15;

    const today = new Date();
    const oneYearAgo = new Date();
    oneYearAgo.setDate(today.getDate() - 365);

    const requestUrl = `${apiUrl}/games?key=${apiKey}&dates=${oneYearAgo.toISOString().split("T")[0]},${
      today.toISOString().split("T")[0]
    }&ordering=-released&page=${page}&page_size=${pageSize}`;

    const response = await fetch(requestUrl);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        `API request failed: ${data.error || response.statusText}`
      );
    }

    const excludedSlugs = ["hentai", "nsfw", "sexual-content", "nudity"];

    const filteredData = data.results?.slice(0, pageSize).filter(
      (game) =>
        !game.tags ||
        !game.tags.some((tag) => excludedSlugs.includes(tag.slug))
    );

    const validResults = filteredData?.filter((game) => game && game.name) || [];

    return {
      results: validResults,
      page,
      totalPages: Math.ceil(data.count / pageSize),
      hasMore: page < Math.ceil(data.count / pageSize),
    };
  } catch (err) {
    console.error("An unexpected error occurred", err);
    return { error: err.message };
  }
});
