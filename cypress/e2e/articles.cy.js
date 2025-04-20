// cypress/e2e/articles.cy.js
describe('NY Times Articles', () => {
  // Option 2: Test with MOCKED API (if you want controlled data)
  it('should load mocked articles', () => {
    // 1. Create cypress/fixtures/articles.json with sample data
    // 2. Mock the API before visiting
    cy.intercept('GET', '**/mostpopular/v2/viewed/**', {
      fixture: 'articles.json'
    }).as('getArticles')

    cy.visit('http://localhost:5173')
    cy.wait('@getArticles') // Now this will work
    
    cy.get('[data-testid="article-item"]')
      .should('have.length', 2) // Match your mock data count
  })

  // it('should navigate to article details', () => {
  //   // Mock API responses
  //   cy.intercept('GET', '**/mostpopular/v2/viewed/*', { fixture: 'articles.json' });
  //   cy.intercept('GET', '**/article-details*', { fixture: 'article-details.json' });

  //   cy.visit('/');
  //   cy.get('[data-testid="article-item"]').first().click();
  //   cy.url().should('include', '/article/');
  //   cy.contains('Test Article 1').should('be.visible');
  // });
});