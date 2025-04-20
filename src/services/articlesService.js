const BASE_URL = "https://api.nytimes.com/svc/mostpopular/v2";
const SEARCH_BASE_URL = "https://api.nytimes.com/svc/search/v2";
const API_KEY = import.meta.env.VITE_NYTIMES_API_KEY;

// Fetches a list of most popular articles (e.g., viewed in the last 7 days)
export const fetchArticles = async ({ queryKey }) => {
  const [, { period = 7 }] = queryKey;

  const url = `${BASE_URL}/viewed/${period}.json?api-key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch articles");

  const data = await response.json();
  return data.results;
};

export const fetchArticleDetails = async ({ queryKey }) => {
  const [, { webUrl }] = queryKey;

  const url = `${SEARCH_BASE_URL}/articlesearch.json?fq=url:"${encodeURIComponent(
    webUrl
  )}"&api-key=${API_KEY}`;

  const response = await fetch(url);
  if (!response.ok) throw new Error("Failed to fetch article details");

  const data = await response.json();

  // Optional: pick the first result if it exists
  return data.response.docs[0];
};
