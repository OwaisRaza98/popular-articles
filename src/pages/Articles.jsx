import React from "react";
import { useArticle } from "../hooks/useArticle";
import ArticleItem from "../components/ArticleItem";
import reactLogo from "../assets/react.svg";

const Articles = () => {
  const { articles, isArticlesLoading, isArticlesError } = useArticle({});

  if (isArticlesLoading) {
    return (
      <div className="flex justify-center mt-20">
        <img src={reactLogo} alt="Loading" className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  if (isArticlesError) {
    return <div className="text-center mt-10 text-red-500">Failed to load articles.</div>;
  }

  return (
    <div className="max-w-[1200px] mx-auto px-6 py-8">
      <h2 className="text-2xl font-semibold mb-6 text-center">Most Popular Articles</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {articles?.map((article) => (
          <ArticleItem key={article.id} data={article} />
        ))}
      </div>
    </div>
  );
};

export default Articles;
