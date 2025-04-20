import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ArticleItem from '../components/ArticleItem';

describe('ArticleItem Component', () => {
  const mockArticle = {
    id: 1,
    title: 'Test Article',
    abstract: 'This is a test abstract',
    media: [{ 'media-metadata': [{ url: 'test.jpg' }] }],
    url: 'http://test.com',
  };

  it('renders article item correctly', () => {
    render(
      <MemoryRouter>
        <ArticleItem data={mockArticle} />
      </MemoryRouter>
    );

    expect(screen.getByText('Test Article')).toBeInTheDocument();
    expect(screen.getByText('This is a test abstract')).toBeInTheDocument();
    expect(screen.getByRole('img')).toHaveAttribute('src', 'test.jpg');
  });

  it('uses fallback image when media metadata is missing', () => {
    const articleWithoutMedia = {
      ...mockArticle,
      media: [],
    };

    render(
      <MemoryRouter>
        <ArticleItem data={articleWithoutMedia} />
      </MemoryRouter>
    );

    expect(screen.getByRole('img')).toHaveAttribute(
      'src',
      'https://upload.wikimedia.org/wikipedia/commons/0/0e/Nytimes_hq.jpg'
    );
  });

  it('links to the correct article URL', () => {
    render(
      <MemoryRouter>
        <ArticleItem data={mockArticle} />
      </MemoryRouter>
    );

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', '/article/1');
  });
});