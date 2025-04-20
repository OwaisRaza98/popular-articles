import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useArticle } from "../hooks/useArticle";
import reactLogo from "../assets/react.svg";

export default function ArticleDetails() {
  const location = useLocation();
  const articleURL = location.state?.url;

  const { articleDetails, isArticleDetailsLoading } = useArticle({
    articleURL,
    getArticles: false,
  });

  useEffect(() => {
    console.log("Received URL:", articleURL);
  }, [articleURL]);

  if (!articleURL)
    return <div className="text-center mt-10">No article provided.</div>;

  if (isArticleDetailsLoading) {
    return (
      <div className="flex justify-center mt-20">
        <img src={reactLogo} alt="Loading" className="w-16 h-16 animate-spin" />
      </div>
    );
  }

  console.log(articleDetails);

  const article = articleDetails;

  if (!article)
    return <div className="text-center mt-10">Article not found.</div>;

  const { headline, abstract, byline, pub_date, multimedia } = article;

  const imageUrl = multimedia?.[0]
    ? `https://www.nytimes.com/${multimedia[0].url}`
    : "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

  return (
    <div
      className="max-w-[650px] mx-auto p-4 mt-8"
      data-testid="article-details"
    >
      <h1 className="text-3xl font-bold mb-4" data-testid="article-title">
        {headline?.main}
      </h1>
      <p className="text-gray-700 text-lg mb-4" data-testid="article-abstract">
        {abstract}
      </p>

      <img src={imageUrl} alt="article" className="w-full rounded-md mb-2" />
      {multimedia?.[0]?.caption && (
        <p className="text-xs text-gray-500 mb-2">{multimedia[0].caption}</p>
      )}

      <p
        className="text-sm text-gray-800 font-medium mb-1"
        data-testid="article-byline"
      >
        {byline?.original}
      </p>
      <p className="text-xs text-gray-500 mb-4" data-testid="article-pub_date">
        Published on {new Date(pub_date).toLocaleDateString()}
      </p>

      <a
        href={articleURL}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block mt-4 text-blue-600 hover:underline font-medium"
      >
        Read full article on NYTimes.com →
      </a>
    </div>
  );
}
