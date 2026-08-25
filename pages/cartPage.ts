import { Page, Locator } from '@playwright/test';

export class CartPage {
    readonly page: Page;
    readonly removeBtnCart: Locator
    readonly checkOutBtn: Locator
    readonly continueShoppingBtn: Locator

    constructor (page: Page) {
        this.page = page;
        this.removeBtnCart = page.locator('[data-test="remove-sauce-labs-backpack"]');
        this.checkOutBtn = page.locator('[data-test="checkout"]');    
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    }

    async removeItem() {
        await this.removeBtnCart.click();
    }
        
    async checkOut() {
        await this.checkOutBtn.click();
    }

    async continueShopping() {
        await this.continueShoppingBtn.click();
    }
}