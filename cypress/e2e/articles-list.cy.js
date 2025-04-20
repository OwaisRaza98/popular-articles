describe('Articles List', () => {
  beforeEach(() => {
    // Mock API response
    cy.intercept('GET', '**/mostpopular/v2/viewed/*', {
      fixture: 'articles.json'
    }).as('getArticles');
    
    cy.visit('/');
    cy.wait('@getArticles');
  });

  it('should display the header', () => {
    cy.contains('h2', 'Most Popular Articles').should('be.visible');
  });

  it('should load and display articles', () => {
    cy.get('[data-testid="article-item"]').should('have.length.at.least', 1);
    cy.contains('Test Article 1').should('be.visible');
  });

  it('should navigate to article details when clicked', () => {
    cy.get('[data-testid="article-item"]').first().click();
    cy.url().should('include', '/article/');
    cy.contains('Test Article 1').should('be.visible');
  });
});