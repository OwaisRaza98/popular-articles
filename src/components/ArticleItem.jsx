import React from "react";
import { Link } from "react-router-dom";

export default function ArticleItem({ data }) {
  const {
    id,
    url,
    title,
    abstract,
    media,
  } = data;

  const imageUrl =
    media?.[0]?.["media-metadata"]?.[2]?.url ||
    media?.[0]?.["media-metadata"]?.[0]?.url ||
    "https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg";

  return (
    <Link to={`/article/${id}`} className="w-full" state={{ url: data.url }} data-testid="article-item">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full flex flex-col transition hover:shadow-lg">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-52 object-cover"
        />
        <div className="p-4 flex flex-col gap-2">
          <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
          <p className="text-sm text-gray-600 line-clamp-3">{abstract}</p>
        </div>
      </div>
    </Link>
  );
}
