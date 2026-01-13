export function interceptAddToCart() {
    cy.intercept('POST', "https://ecomm.svc.ui.com/graphql").as('addToCart');
  };
