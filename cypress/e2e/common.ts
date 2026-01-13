export const commonLocators = {
    variantPrimary: '[variant="primary"]',
    labelSelect: '[label="Select"]',
    roleRegion: '[role="region"]',
    extractPrice,
    getAndSavePrice,
    calculateTotal,
    pressOnButton,
    checkPageIsLoaded,
    getCartCheckoutSum,
    compareTotals,
    addToCartWithCheck,
    waitForAddToCart,
};

const GRAPHQL_URL = 'https://ecomm.svc.ui.com/graphql';
const prices = {
    cloudGateway1: 0,
    cloudGateway2: 0,
    switching1: 0,
    wifi1: 0,
    camera1: 0,
    camera2: 0,
};
type PriceKey = keyof typeof prices;

let cartCheckoutSum = 0;

function extractPrice(priceText: string): number {
    const onlyDigits = priceText.replace(/[^0-9]/g, '');
    return parseInt(onlyDigits) || 0;
}

function getAndSavePrice(productKey: PriceKey) {
    cy.contains('VAT incl.').invoke('text').then((priceText) => {
        const price = extractPrice(priceText);
        prices[productKey] = price;
        cy.log(`${productKey} price: ${price}`);
    });
}

function calculateTotal(): number {
    return Object.values(prices).reduce((sum, price) => sum + price, 0);
}

function pressOnButton(buttonText: string) {
    cy.contains(buttonText).click();
}

function checkPageIsLoaded() {
    cy.get(commonLocators.roleRegion).should('be.visible');
}

function getCartCheckoutSum() {
    cy.contains('Order Details')
        .parent()
        .parent()
        .parent()
        .within(() => {
            cy.contains('Total')
                .next('div')
                .invoke('text')
                .then((totalText) => {
                    cartCheckoutSum = extractPrice(totalText);
                    cy.log(`Cart Checkout Sum: ${cartCheckoutSum}`);
                });
        });
}

function compareTotals() {
    cy.then(() => {
        const expectedTotal = calculateTotal();
        cy.log(`Expected Total (our sum): ${expectedTotal}`);
        cy.log(`Cart Checkout Sum: ${cartCheckoutSum}`);

        if (cartCheckoutSum === expectedTotal) {
            cy.log('Total sum is equal');
        } else {
            cy.log(`Totals differs`);
        }
        expect(cartCheckoutSum).to.equal(expectedTotal);
    });
}

function interceptAddToCart() {
  cy.intercept('POST', GRAPHQL_URL).as('addToCart');
}

function waitForAddToCart() {
  cy.wait('@addToCart', { timeout: 10000 }).then((interception) => {
    const statusCode = interception.response?.statusCode;
    
    if (statusCode === 200) {
      cy.log('Add to Cart request successful (200)');
    } else if (statusCode) {
      cy.log(`Add to Cart request returned status: ${statusCode}`);
    } else {
      cy.log('Add to Cart request - no response received, continuing...');
    }
  });
};

function addToCartWithCheck() {
  interceptAddToCart();
  waitForAddToCart();
};
