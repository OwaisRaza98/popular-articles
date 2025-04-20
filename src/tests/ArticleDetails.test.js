import React from "react"; // Add this line
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import ArticleDetails from "../pages/ArticleDetails";

// mock useArticle hook
jest.mock("../hooks/useArticle", () => ({
  useArticle: () => ({
    articleDetails: {
      headline: { main: "Test Headline" },
      abstract: "Test abstract",
      byline: { original: "By Test Author" },
      pub_date: "2025-04-20T12:00:00Z",
      multimedia: [],
    },
    isArticleDetailsLoading: false,
  }),
}));

describe("ArticleDetails", () => {
  it("renders the article correctly", () => {
    render(
      <MemoryRouter initialEntries={[{ state: { url: "http://test.com" } }]}>
        <Routes>
          <Route path="*" element={<ArticleDetails />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText("Test Headline")).toBeInTheDocument();
    expect(screen.getByText("Test abstract")).toBeInTheDocument();
    expect(screen.getByText("By Test Author")).toBeInTheDocument();
  });
});
