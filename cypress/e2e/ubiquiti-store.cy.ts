import { commonLocators } from './common';

const baseUrl = 'https://eu.store.ui.com/eu/en';


describe('Ubiquiti Store', () => {
    it('compare sum of added items to cart with sum on checkout', () => {
        // open page with first product Cloud
        cy.visit(`${baseUrl}/category/all-cloud-gateways/products/udm-pro-max`);
        cy.url().should('include', 'category/all-cloud-gateways/products/udm-pro-max');


        // 2 devices from the "UniFi Cloud Gateway" category;
        commonLocators.getAndSavePrice('cloudGateway1');

        const expectedAddToCartWithCheckGatewayFirst =
            commonLocators.addToCartWithCheck;
        commonLocators.pressOnButton('Add to Cart');

        expectedAddToCartWithCheckGatewayFirst();

        cy.get(commonLocators.variantPrimary).contains("Cloud Gateways").click();

        cy.url().should('eq', `${baseUrl}/category/all-cloud-gateways`);

        cy.get(commonLocators.labelSelect).last().click();

        commonLocators.checkPageIsLoaded();

        commonLocators.getAndSavePrice('cloudGateway2');

        const expecteAddToCartWithCheckGatewaySecond = commonLocators.addToCartWithCheck;
        commonLocators.pressOnButton('Add to Cart');

        expecteAddToCartWithCheckGatewaySecond();


        // 1 device from the "Switching" category;
        cy.get(commonLocators.variantPrimary).contains("Switching").click();

        cy.url().should('eq', `${baseUrl}/category/all-switching`);

        cy.get(commonLocators.labelSelect).first().click();

        commonLocators.checkPageIsLoaded();

        commonLocators.getAndSavePrice('switching1');

        const expectedAddToCartWithCheckSwitchingFirst = commonLocators.addToCartWithCheck;
        commonLocators.pressOnButton('Add to Cart');

        expectedAddToCartWithCheckSwitchingFirst();


        // 1 device from the "WiFi" category;
        cy.get(commonLocators.variantPrimary).contains("WiFi").click();

        cy.url().should('eq', `${baseUrl}/category/all-wifi`);

        cy.get(commonLocators.labelSelect).last().click();

        commonLocators.checkPageIsLoaded();

        commonLocators.getAndSavePrice('wifi1');

        const expectedAddToCartWithCheckWiFiFirst = commonLocators.addToCartWithCheck;
        commonLocators.pressOnButton('Add to Cart');

        expectedAddToCartWithCheckWiFiFirst();


        // 2 devices from the "Camera Security" category;
        cy.get(commonLocators.variantPrimary).contains("Camera Security").click();

        cy.url().should('eq', `${baseUrl}/category/all-cameras-nvrs`);

        cy.get(commonLocators.labelSelect).eq(3).click();

        commonLocators.checkPageIsLoaded();

        commonLocators.getAndSavePrice('camera1');

        const expectedAddToCartWithCheckCameraFirst = commonLocators.addToCartWithCheck;
        commonLocators.pressOnButton('Add to Cart');

        expectedAddToCartWithCheckCameraFirst();

        cy.get(commonLocators.variantPrimary).contains("Camera Security").click();

        cy.url().should('eq', `${baseUrl}/category/all-cameras-nvrs`);

        cy.get(commonLocators.labelSelect).eq(6).click();

        commonLocators.checkPageIsLoaded();

        commonLocators.getAndSavePrice('camera2');

        const expectedAddToCartWithCheckCameraSecond = commonLocators.addToCartWithCheck;
        commonLocators.pressOnButton('Add to Cart');

        expectedAddToCartWithCheckCameraSecond();


        // Navigate to the cart and compare the total amount with the sum of the prices of the selected devices.
        cy.visit(`${baseUrl}/checkout`);
        cy.get(commonLocators.variantPrimary).should('be.visible');
        
        cy.screenshot('checkout-page', { capture: 'fullPage' });
        
        commonLocators.getCartCheckoutSum();
        commonLocators.compareTotals();
    });
});
