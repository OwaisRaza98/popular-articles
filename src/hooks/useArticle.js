import { useQuery } from "@tanstack/react-query";
import {
  fetchArticleDetails,
  fetchArticles,
} from "../services/articlesService";

export const useArticle = ({ articleURL = null, getArticles = true }) => {
  const {
    data: articles,
    isLoading: isArticlesLoading,
    error: isArticlesError,
  } = useQuery({
    queryKey: ["articles", { period: 7 }],
    queryFn: fetchArticles,
    enabled: getArticles,
    keepPreviousData: true,
    staleTime: 10 * 1000,
    cacheTime: 5 * 60 * 1000,
  });

  const { data: articleDetails, isLoading: isArticleDetailsLoading } = useQuery(
    {
      queryKey: ["articleDetails", { webUrl: articleURL }],
      queryFn: fetchArticleDetails,
      enabled: !!articleURL,
      keepPreviousData: true,
      staleTime: 10 * 1000,
      cacheTime: 5 * 60 * 1000,
    }
  );

  return {
    articles,
    isArticlesError,
    isArticlesLoading,
    articleDetails,
    isArticleDetailsLoading,
  };
};
