// I know that it's not a good idea to post my API KEY on github, but for the power of exemple (and lack of backend server) i chose to post it.
const API_KEY = "59a95bc5-5f65-44b3-bad3-1f9ff99c6e46";

export function getNewsCategoriesEndpoint(
  category,
  pageNumber = 1,
  pageSize = 20
) {
  const queryParams = `?api-key=${API_KEY}&section=${category}&show-fields=all&page-size=${pageSize}&page=${pageNumber}`;

  return `https://content.guardianapis.com/search${queryParams}`;
}

export function getNewsDetailsEndpoint(newsId) {
  const queryParams = `?api-key=${API_KEY}&show-fields=all`;

  return `https://content.guardianapis.com/${newsId}${queryParams}`;
}
