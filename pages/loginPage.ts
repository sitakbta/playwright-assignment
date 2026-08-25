import {Page, Locator } from '@playwright';

export class LoginPage {
    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly loginBtn: Locator;

    constructor(page: Page) {
        this.page = page;
        this.username = page.locator('#user-name');
        this.password = page.locator('#password');
        this.loginBtn = page.locator('#login-button');
    }
    
    async login(user: string, pass: string) {
        await this.username.fill(user);
        await this.password.fill(pass);
        await this.loginBtn.click();
    }
}