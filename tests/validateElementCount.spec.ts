import { test, expect, Locator } from "@playwright/test";

test("Validating element count with getByPlaceholder and getByLabel", async ({ page }) => {
    // Navigate to the sign-in page
    await page.goto("https://web-playground.ultralesson.com/account/login");

    // Query elements by placeholder
    const elementLocatorsWithPlaceholderEmail: Locator = page.getByPlaceholder("Email", {exact: true});

    // Query elements by label
    const elementLocatorsWithEmailAsLabel: Locator = page.getByLabel("Email");

    // Count elements with the placeholder "Email" and validate
    const numberOfElementsWithPlaceholderEmail: number = await elementLocatorsWithPlaceholderEmail.count();
    await expect(numberOfElementsWithPlaceholderEmail).toBe(3);

    // Validate the count of elements with label "Email"
    await expect(elementLocatorsWithEmailAsLabel).toHaveCount(3);
});
