import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly postalCode: Locator;
    readonly continueBtn: Locator;
    readonly cancelBtn: Locator;
    readonly finishBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    } 
    async clickContinue() {
        await this.continueBtn.click();
    }
    async clickCancel() {
        await this.cancelBtn.click();
    }
    async clickFinish() {
        await this.finishBtn.click();
    }
} 