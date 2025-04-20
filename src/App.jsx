import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Articles from "./pages/Articles";
import ArticleDetails from "./pages/ArticleDetails";
import Header from "./components/Header";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { refetchOnWindowFocus: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Articles />} />
          <Route path="/article/:id" element={<ArticleDetails />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
