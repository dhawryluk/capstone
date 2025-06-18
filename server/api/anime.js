export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const { search, trending } = queryParams;

  let query, variables;

  if (trending) {
    query = `
      query {
        Page(page: 1, perPage: 15) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title { romaji }
            coverImage { extraLarge }
          }
        }
      }
    `;
    variables = {};
  } else {
    query = `
      query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          media(type: ANIME, search: $search) {
            id
            title { romaji }
          }
        }
      }
    `;
    variables = { page: 1, perPage: 10, search: search || "" };
  }

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    throw createError({
      statusCode: response.status,
      statusMessage: "AniList API error",
    });
  }

  const result = await response.json();
  return result.data.Page.media;
});
