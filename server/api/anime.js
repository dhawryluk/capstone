import { defineEventHandler } from "h3";
import { getQuery } from "h3";
import _ from "lodash";

export default defineEventHandler(async (event) => {
  const queryParams = getQuery(event);
  const { trending } = queryParams;
  const search =
    typeof queryParams.search === "string" ? queryParams.search.trim() : "";
  const page = parseInt(queryParams.page) || 1;
  const perPage = parseInt(queryParams.perPage) || 15;

  let query, variables;

  if (trending) {
    query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(type: ANIME, sort: TRENDING_DESC) {
            id
            title { romaji }
            coverImage { extraLarge }
            isAdult
          }
        }
      }
    `;
    variables = { page, perPage };
  } else if (search) {
    query = `
      query ($page: Int, $perPage: Int, $search: String) {
        Page(page: $page, perPage: $perPage) {
          media(type: ANIME, search: $search) {
            id
            title { romaji }
            coverImage { extraLarge }
            isAdult
          }
        }
      }
    `;
    variables = { page, perPage, search };
  } else if (queryParams.upcoming) {
    query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(
            type: ANIME,
            status_in: [NOT_YET_RELEASED, RELEASING],
            sort: [POPULARITY_DESC, START_DATE_DESC]
          ) {
            id
            title { romaji }
            coverImage { extraLarge }
            isAdult
          }
        }
      }
    `;
    variables = { page, perPage };
  } else {
    query = `
      query ($page: Int, $perPage: Int) {
        Page(page: $page, perPage: $perPage) {
          media(type: ANIME) {
            id
            title { romaji }
            coverImage { extraLarge }
            isAdult
          }
        }
      }
    `;
    variables = { page, perPage };
  }

  const response = await fetch("https://graphql.anilist.co", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ query, variables }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw createError({
      statusCode: response.status,
      statusMessage: "AniList API error: " + errorText,
    });
  }

  const result = await response.json();
  return result.data.Page.media;
});
