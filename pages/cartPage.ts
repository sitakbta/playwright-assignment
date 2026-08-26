import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly removeBtnCart: Locator;       // Remove button for items in cart
    readonly checkOutBtn: Locator;         // Proceed to Checkout button
    readonly continueShoppingBtn: Locator; // Continue Shopping button

    //Initialize CartPage with page object and locate all required elements
    constructor(page: Page) {
        this.page = page;
        this.removeBtnCart = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.checkOutBtn = page.locator('[data-test="checkout"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    }

    //Remove an item from the shopping cart
    async removeItem() {
        await this.removeBtnCart.click();
    }

    //Proceed to checkout from the cart page
    async checkOut() {
        await this.checkOutBtn.click();
    }

    //Continue shopping by returning to the inventory page
    async continueShopping() {
        await this.continueShoppingBtn.click();
    }
}