import { test, expect } from '@playwright/test';
import { LoginPage } from "../pages/loginPage";
import { InventoryPage } from "../pages/inventoryPage";
import { CartPage } from "../pages/cartPage";
import { CheckoutPage } from '../pages/checkoutPage';
import users from "../fixtures/users.json"

//Before each test, navigate to the SauceDemo homepage */
test.beforeEach(async ({ page }) => {
    await page.goto("https://www.saucedemo.com/");
});

//TC1: Successful Login (@smoke)
test("TC1: Successful Login (@smoke)", async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Login with valid credentials from fixtures
    await loginPage.login(users.validUser.username, users.validUser.password);

    // Assert successful redirect to inventory page
    await expect(page).toHaveURL(/inventory/);
});

///TC2: Failed Login Validation
test("TC2: Failed Login Validation", async ({ page }) => {
    const loginPage = new LoginPage(page);
    // Attempt login with locked-out user credentials from fixtures
    await loginPage.login(users.invalidUser.username, users.invalidUser.password);

    // Assert error message is visible indicating account is locked
    await expect(page.getByText('Epic sadface: Sorry, this user has been locked out.')).toBeVisible();
});

///TC3: End-to-End Purchase Flow
test("TC3: End-to-End Purchase Flow", async ({ page }) => {
    // Step 1: Login with valid credentials
    const loginPage = new LoginPage(page);
    await loginPage.login(users.validUser.username, users.validUser.password);
    await expect(page).toHaveURL(/inventory/);

    // Step 2: Add product to cart from inventory
    const inventoryPage = new InventoryPage(page);
    await inventoryPage.addToCart();
    await inventoryPage.goToCart();
    await expect(page).toHaveURL(/cart/);

    // Step 3: Proceed to checkout from cart
    const cartPage = new CartPage(page);
    await cartPage.checkOut();
    await expect(page).toHaveURL(/checkout-step-one/);

    // Step 4: Fill checkout form and proceed to order review
    const checkoutPage = new CheckoutPage(page);
    await checkoutPage.fillCheckoutForm(users.validUser.profile.firstName, users.validUser.profile.lastName, users.validUser.profile.postalCode);
    await checkoutPage.clickContinue();
    await expect(page).toHaveURL(/checkout-step-two/);

    // Step 5: Complete purchase and verify order confirmation
    await checkoutPage.clickFinish();
    await expect(page.getByText('Thank you for your order!')).toBeVisible();
});

//TC4: Intentional Failure
test("TC4: Intentional Failure (The Debugging Challenge)", async ({ page }) => {
    // Login with credentials
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL(/inventory/);

    // Add Sauce Labs Onesie to cart and view cart
    await page.locator('[data-test="add-to-cart-sauce-labs-onesie"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();

    // INTENTIONAL FAILURE: Assert wrong price to trigger failure
    // The actual price is $7.99, but we assert $9.99 to demonstrate debugging
    await expect(page.locator('[data-test="inventory-item-price"]')).toContainText('$9.99');
});