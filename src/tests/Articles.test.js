import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'; // Add this import
import Articles from '../pages/Articles';

jest.mock('../hooks/useArticle', () => ({
  useArticle: jest.fn()
}));

import { useArticle } from '../hooks/useArticle';

describe('Articles Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('shows loading spinner when loading', () => {
    useArticle.mockReturnValue({
      articles: [],
      isArticlesLoading: true,
      isArticlesError: false,
      articleDetails: null,
      isArticleDetailsLoading: false
    });

    render(
      <MemoryRouter>
        <Articles />
      </MemoryRouter>
    );
    expect(screen.getByAltText('Loading')).toBeInTheDocument();
  });

  it('shows error message when there is an error', () => {
    useArticle.mockReturnValue({
      articles: [],
      isArticlesLoading: false,
      isArticlesError: true,
      articleDetails: null,
      isArticleDetailsLoading: false
    });

    render(
      <MemoryRouter>
        <Articles />
      </MemoryRouter>
    );
    expect(screen.getByText('Failed to load articles.')).toBeInTheDocument();
  });

  it('renders articles when data is loaded', () => {
    const mockArticles = [
      {
        id: 1,
        title: 'Test Article 1',
        abstract: 'This is test abstract 1',
        media: [{'media-metadata': [{url: 'test1.jpg'}]}],
        url: 'http://test1.com'
      },
      {
        id: 2,
        title: 'Test Article 2',
        abstract: 'This is test abstract 2',
        media: [{'media-metadata': [{url: 'test2.jpg'}]}],
        url: 'http://test2.com'
      }
    ];

    useArticle.mockReturnValue({
      articles: mockArticles,
      isArticlesLoading: false,
      isArticlesError: false,
      articleDetails: null,
      isArticleDetailsLoading: false
    });

    render(
      <MemoryRouter>
        <Articles />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Most Popular Articles')).toBeInTheDocument();
    expect(screen.getByText('Test Article 1')).toBeInTheDocument();
    expect(screen.getByText('Test Article 2')).toBeInTheDocument();
  });
});