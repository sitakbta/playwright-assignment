# Playwright Assignment - SauceDemo & Fruit API Test Suite

## 📋 Overview
This is a professional, industry-ready automation repository that integrates:
- **UI Testing** with SauceDemo (https://www.saucedemo.com/)
- **API Validation** with Playwright Fruit Mocking API (https://demo.playwright.dev/api-mocking/api/v1/fruits)

### Objective
Demonstrate mastery of modern testing with Playwright - showcasing the evolution from Selenium and Cypress to Playwright's speed and reliability.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation
```bash
# Install dependencies
npm install
```

### Running Tests

```bash
# Run all tests
npm test

# Run specific test file
npm test tests/SauceDemoTests.spec.ts
npm test tests/apiTests.spec.ts

# Run tests with UI Mode (interactive debugging)
npm run test:ui

# Run tests in debug mode
npm run test:debug

# View HTML test report
npm run report
```

### Run Specific Tests by Tag
```bash
# Run only smoke tests
npx playwright test -g "@smoke"

# Run only API tests
npx playwright test -g "@api"
```

---

## 📁 Project Structure

```
playwright-assignment/
├── pages/                         # Page Object Model classes
│   ├── loginPage.ts               # Login page interactions
│   ├── inventoryPage.ts           # Inventory & product selection
│   ├── cartPage.ts                # Shopping cart operations
│   └── checkoutPage.ts            # Checkout & order completion
├── tests/
│   ├── SauceDemoTests.spec.ts     # UI test cases (TC1-TC4)
│   └── apiTests.spec.ts           # API test cases (TC-API-01, TC-API-02)
├── fixtures/
│   └── users.json                 # Test data (credentials & user profiles)
├── playwright.config.ts           # Playwright configuration
├── playwright-report/             # HTML test reports (generated after test run)
└── README.md                      # This file
```

---

## 🏗️ Architecture & Best Practices

### Page Object Model (POM)
Locators and actions are separated into dedicated page classes for maintainability:
- **LoginPage** - Handles authentication
- **InventoryPage** - Manages product selection and cart addition
- **CartPage** - Controls cart operations and checkout initiation
- **CheckoutPage** - Manages checkout form and order completion

### Data Management
Test data is stored in `fixtures/users.json` to separate test logic from test data:
- **validUser** - Standard user with valid credentials
- **invalidUser** - Locked-out user account for negative testing

### Test Hooks
`test.beforeEach()` handles repetitive setup actions (e.g., navigating to the base URL).

---

## 🧪 UI Test Cases (SauceDemo)

### TC1: Successful Login (@smoke)
**Scenario:** Login with a standard_user retrieved from the JSON fixture.

**Assertion:** Use `expect(page).toHaveURL()` to confirm redirection to the inventory page.

**Goal:** Verify that valid user credentials successfully authenticate and redirect to the inventory page.

**Status:** ✅ Passed

---

### TC2: Failed Login Validation
**Scenario:** Attempt login with a locked_out_user.

**Assertion:** Confirm an error message containing **"Epic sadface: Sorry, this user has been locked out."** is visible using `toBeVisible()`.

**Goal:** Verify that locked out accounts display appropriate error messages and prevent access to the application.

**Status:** ✅ Passed

---

### TC3: End-to-End Purchase Flow
**Scenario:** Login → Add "Sauce Labs Backpack" to cart → Complete Checkout.

**Assertion:** Verify the final **"Thank you for your order!"** message is displayed.

**Goal:** Validate the complete purchase workflow from login through successful order completion, ensuring all checkout steps function correctly.

**Steps:**
1. Login with valid credentials
2. Add Sauce Labs Backpack to cart
3. Navigate to shopping cart
4. Proceed to checkout
5. Fill checkout form (First Name, Last Name, Postal Code)
6. Review order on checkout step two
7. Complete order and verify success message

**Status:** ✅ Passed

---

### TC4: Intentional Failure (The Debugging Challenge)
**Scenario:** Create a test that asserts the WRONG price for an item.

**Assertion:** Assert Sauce Labs Onesie is $9.99 (actual price is $7.99).

**Goal:** Demonstrate the ability to use **Playwright Trace Viewer** or **UI Mode** to document and diagnose failures as a **Bug**.

**Status:** ❌ Intentionally Fails

#### Bug Analysis - TC4

**Expected Price:** $9.99

**Actual Price:** $7.99

**Root Cause:** Test assertion error - the Sauce Labs Onesie is priced at $7.99, not $9.99.

**How to Debug:**
1. Run with UI Mode:
   ```bash
   npm run test:ui
   ```
   - Step through the test interactively
   - Hover over elements to inspect
   - See real-time DOM updates

2. Capture Trace for Analysis:
   ```bash
   npx playwright test tests/SauceDemoTests.spec.ts --trace on
   npx playwright show-trace <path-to-trace.zip>
   ```
   - View complete test execution timeline
   - Inspect network requests
   - See DOM snapshots at each step

3. Screenshots on Failure:
   - Automatically captured in `test-results/` folder
   - Use for visual debugging

**Screenshots & Evidence:**
- Screenshot captured: `test-results/SauceDemoTests-TC4-*.png`
- Trace file: Available in `playwright-report/`

---

## 🔌 API Test Cases (Fruit API)

### Target Endpoint
`https://demo.playwright.dev/api-mocking/api/v1/fruits`

---

### TC-API-01: Response Logic Validation
**Action:** Send a GET request using the Playwright request object.

**Requirement 1:** Validate the response status code is **200 OK**.

**Requirement 2:** Verify the JSON body contains a fruit named **"Blueberry"** with an **ID of 33**.

**Implementation:**
```typescript
const response = await request.get("https://demo.playwright.dev/api-mocking/api/v1/fruits", {
    headers: { Accept: "application/json" },
});
expect(response.status()).toBe(200);
const responseBody = await response.json();
expect(responseBody).toContainEqual({ name: "Blueberry", id: 33 });
```

**Status:** ✅ Passed

---

### TC-API-02: Negative Validation
**Action:** Send a GET request to the same endpoint.

**Requirement:** Verify that the JSON response **does NOT** contain the string **"camel"** anywhere.

**Implementation:**
```typescript
const response = await request.get("https://demo.playwright.dev/api-mocking/api/v1/fruits", {
    headers: { Accept: "application/json" },
});
const responseBody = await response.json();
const responseString = JSON.stringify(responseBody);
expect(responseString).not.toContain("camel");
```

**Status:** ✅ Passed

---

## 📊 Test Configuration

### Reporter
- **HTML Report** - Comprehensive test results with screenshots and traces
- Generate report: `npm run report`
- Located in: `playwright-report/` folder

### Screenshots
- **Captured on Failure Only** - Configured in `playwright.config.ts`
- Location: `test-results/` folder
- Useful for quick visual debugging

### Traces
- **On First Retry** - Captures complete test execution trace
- View traces: `npx playwright show-trace <trace-file.zip>`
- Includes network logs, DOM snapshots, and timeline

### Browsers
- Chromium ✅
- Firefox ✅
- WebKit (Safari) ✅

---

## 📝 Test Fixtures

### users.json
```json
{
    "validUser": {
        "username": "standard_user",
        "password": "secret_sauce",
        "profile": {
            "firstName": "Standard",
            "lastName": "User",
            "postalCode": "D12345"
        }
    },
    "invalidUser": {
        "username": "locked_out_user",
        "password": "secret_sauce"
    }
}
```

---

## 🔍 Debugging & Troubleshooting

### UI Mode (Recommended for Interactive Debugging)
```bash
npm run test:ui
```
- Step through tests line-by-line
- Inspect elements in real-time
- Jump to any test step

### Debug Mode
```bash
npm run test:debug
```
- Opens Playwright Inspector
- Pause and inspect at any point
- Execute commands in console

### View Test Report
```bash
npm run report
```
- Open HTML report in browser
- View test results, screenshots, and traces

---
