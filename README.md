# Ubie2eStore

E2E tests for Ubiquiti Store using Cypress and TypeScript.

## Description

This project contains end-to-end tests for the Ubiquiti Store e-commerce website. The main test verifies the correctness of the total cart amount calculation.

## What is being tested

**Main test:** `compare sum of added items to cart with sum on checkout`

The test performs the following actions:
1. Adds **7 items** to the cart from different categories:
   - 2 devices from "UniFi Cloud Gateway" category
   - 1 device from "Switching" category
   - 1 device from "WiFi" category
   - 2 devices from "Camera Security" category
2. Saves the price of each item
3. Navigates to the checkout page
4. Compares the sum of all added items with the total amount in the cart
5. Takes a screenshot of the checkout page

## Project Structure

```
Ubie2eProj/
├── cypress/
│   ├── e2e/                          # Test files
│   │   ├── common.ts                 # Common functions and locators
│   │   └── ubiquiti-store.cy.ts      # Main test
│   ├── support/                      # Cypress support files
│   │   ├── commands.ts               # Custom commands
│   │   ├── e2e.ts                    # E2E configuration
│   │   └── interceptors.ts           # Request interceptors
│   ├── screenshots/                  # Screenshots (git ignored)
├── cypress.config.ts                  # Cypress configuration
├── package.json                       # Dependencies and scripts
├── tsconfig.json                      # TypeScript configuration
└── README.md                          # Documentation
```

## Installation

1. Clone the repository:
```bash
git clone https://github.com/AfricaTV/Ubie2eStore.git
cd Ubie2eStore
```

2. Install dependencies:
```bash
npm install
```

## Running Tests

### Interactive Mode (with GUI)

Opens Cypress Test Runner for visual test execution:

```bash
npm run cy:open
```

Or:

```bash
npx cypress open
```

### Headless Mode (in terminal)

Runs all tests in headless mode:

```bash
npm run cy:run
```

Or:

```bash
npm test
```

Or:

```bash
npx cypress run
```

## Configuration

Main settings in `cypress.config.ts`:

- **baseUrl**: `https://eu.store.ui.com`
- **viewport**: 1920x1080
- **defaultCommandTimeout**: 15000ms
- **pageLoadTimeout**: 30000ms

## Key Files

### `cypress/e2e/ubiquiti-store.cy.ts`
Main test file containing the cart total sum verification scenario.

### `cypress/e2e/common.ts`
Contains:
- **commonLocators** - selectors for page elements
- **getAndSavePrice()** - gets and saves item price
- **calculateTotal()** - calculates sum of all saved prices
- **getCartCheckoutSum()** - gets total sum from cart
- **compareTotals()** - compares the sums
- **addToCartWithCheck()** - adds item to cart with GraphQL request verification

## Screenshots

The test automatically creates a screenshot of the checkout page with full page capture (fullPage). Screenshots are saved in `cypress/screenshots/`.

## Dependencies

- **cypress**: ^13.6.0 - E2E testing framework
- **typescript**: ^5.3.0 - TypeScript support

## License

GPL-2.0

## Some moments about test: test is flaky. Sometimes one or several products are added to basket with incorrect price and test fails, i am sure that there is a bug, however task was to create e2e test, and it was done and he found a bug, to recognize it need to make deeper investigation. There are still several moments how to make test better and more stable, but for this need to change app FE code, basically need to place data-test attributes on elements, from QA architecture DOM is "empty" and create stable automation tests where all elements are random is bad solution, sure it is faster to develop but much harder to follow the quality.
