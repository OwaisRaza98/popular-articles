// cypress/e2e/article-details.cy.js
describe('Article Details', () => {
  // Use a REAL NY Times URL format that matches your app's requests
  const realArticleUrl = "https://www.nytimes.com/2025/04/17/us/politics/lisa-murkowski-trump.html";
  const encodedUrl = encodeURIComponent(realArticleUrl);

  beforeEach(() => {
    // 1. EXACT URL MATCHING with real NY Times URL pattern
    cy.intercept(
      'GET', 
      `**/svc/search/v2/articlesearch.json?fq=url:"${encodedUrl}"*`,
      {
        fixture: 'article-details.json' // Now using your dummy data
      }
    ).as('getArticleDetails');

    // 2. Simulate navigation with the REAL URL
    cy.visit('/article', {
      onBeforeLoad(win) {
        win.history.replaceState({ url: realArticleUrl }, '', '/article');
      }
    });
  });

  it('should use mocked data', () => {
    // Verify interception happened
    cy.wait('@getArticleDetails').then((interception) => {
      // Debug: confirm mock was used
      assert.isNotNull(interception.response, 'API was mocked');
      console.log('Used mock data:', interception.response.body);
    });
    
    // Verify dummy data appears
    cy.get('[data-testid="article-title"]').should('contain', 'Test Article 1');
  });
});