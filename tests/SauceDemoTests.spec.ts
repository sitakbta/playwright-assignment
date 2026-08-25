import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from '../pages/checkoutPage';
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
  
// 3. End-to-End Purchase Flow
test("TC3: End-to-End Purchase Flow", async ( { page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.login(users.validUser.username, users.validUser.password);

    await expect(page).toHaveURL(/inventory/);

    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart();
    await inventoryPage.goToCart();
    
    await expect(page).toHaveURL(/cart/);

    const cartPage = new CartPage(page);
    await cartPage.checkOut();

    await expect(page).toHaveURL(/checkout-step-one/);

    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm(users.validUser.profile.firstName, users.validUser.profile.lastName, users.validUser.profile.postalCode);

    await checkoutPage.clickContinue();

    await expect(page).toHaveURL(/checkout-step-two/);
    await checkoutPage.clickFinish();

    await expect(page.getByText('Thank you for your order!')).toBeVisible();

});    