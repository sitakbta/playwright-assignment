import { Page, Locator } from '@playwright';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;      // Username input field
    readonly password: Locator;      // Password input field
    readonly loginBtn: Locator;      // Login button

    //Initialize LoginPage with page object and locate all required elements
    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }

    //Perform login action with provided credentials
    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }
}