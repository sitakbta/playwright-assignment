import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import users from "../fixtures/users.json"

test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
});

// 1. Successful Login
test("TC1: Successful Login (@smoke)", async ( { page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/inventory/);
});

// 2. Failed Login
test("TC2: Failed Login Validation", async ( { page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible(); 
});
    