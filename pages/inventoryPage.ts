import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly addToCartBtn: Locator;           // Add to Cart button for Sauce Labs Backpack
    readonly removeBtn: Locator;              // Remove item button
    readonly shoppingCartLink: Locator;       // Shopping cart navigation link

    //Initialize InventoryPage with page object and locate all required elements
    constructor(page: Page) {
        this.page = page;
        this.addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    //Click the Add to Cart button to add Sauce Labs Backpack to cart
    async addToCart() {
        await this.addToCartBtn.click();
    }

    //Remove an item from the inventory display
    async removeItem() {
        await this.removeBtn.click();
    }

    //Navigate to the shopping cart page
    async goToCart() {
        await this.shoppingCartLink.click();
    }
}