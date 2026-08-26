import {test, expect} from "@playwright/test";

//TC-API-01: Response Logic Validation
test("TC-API-01: Response Logic Validation", async ({ request }) => {
        // Send GET request to the fruits endpoint with JSON header
        const response = await request.get(
        "https://demo.playwright.dev/api-mocking/api/v1/fruits",
        {
            headers: {
                Accept: "application/json",
            },
        },
    );
    // Requirement 1: Validate response status is 200 OK
    expect(response.status()).toBe(200);
    // Requirement 2: Verify Blueberry with ID 33 exists in response
    const responseBody = await response.json();
    expect(responseBody).toContainEqual({ name: "Blueberry", id: 33 });
});
    //TC-API-02: Negative Validation
    test("TC-API-02: Negative Validation", async ({ request }) => {
        // Send GET request to the fruits endpoint
        const response = await request.get(
        "https://demo.playwright.dev/api-mocking/api/v1/fruits",
        {
            headers: {
                Accept: "application/json",
            },
        },
    );
        // Parse JSON response body
        const responseBody = await response.json();
        // Convert entire response to string to check for "camel" anywhere
        // This catches "camel" as a name, text, or any other field value
        const responseString = JSON.stringify(responseBody);
        expect(responseString).not.toContain("camel");
});