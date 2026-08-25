import { Page, Locator } from '@playwright/test';

export class InventoryPage {
    readonly page: Page;
    readonly addToCartBtn: Locator
    readonly removeBtn: Locator
    readonly shoppingCartLink: Locator

    constructor(page: Page) {
        this.page = page;
        this.addToCartBtn = page.locator('[data-test="add-to-cart-sauce-labs-backpack"]');
        this.removeBtn = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.shoppingCartLink = page.locator('[data-test="shopping-cart-link"]');
    }

    async addToCart() {
        await this.addToCartBtn.click();
    }

    async removeItem() {
        await this.removeBtn.click();
    }

    async goToCart() {
        await this.shoppingCartLink.click();
    }
}