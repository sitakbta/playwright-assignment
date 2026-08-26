import { Page, Locator } from '@playwright/test';

export class CheckoutPage {
    readonly page: Page;
    readonly firstName: Locator;  // First Name input field
    readonly lastName: Locator;   // Last Name input field
    readonly postalCode: Locator; // Postal Code input field
    readonly continueBtn: Locator; // Continue to order review button
    readonly cancelBtn: Locator;   // Cancel checkout button
    readonly finishBtn: Locator;   // Finish order button

    //Initialize CheckoutPage with page object and locate all required elements
    constructor(page: Page) {
        this.page = page;
        this.firstName = page.locator('[data-test="firstName"]');
        this.lastName = page.locator('[data-test="lastName"]');
        this.postalCode = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');
        this.finishBtn = page.locator('[data-test="finish"]');
    }

    //Fill the checkout information form with user details
    async fillCheckoutForm(firstName: string, lastName: string, postalCode: string) {
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.postalCode.fill(postalCode);
    }

    //Click Continue button to proceed to order review page
    async clickContinue() {
        await this.continueBtn.click();
    }

    //Cancel the checkout process
    async clickCancel() {
        await this.cancelBtn.click();
    }

    //Click Finish button to complete and submit the order
    async clickFinish() {
        await this.finishBtn.click();
    }
} 