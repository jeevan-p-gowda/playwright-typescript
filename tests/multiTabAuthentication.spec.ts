import { test, expect, Locator } from "@playwright/test";

test("Multi-Tab Authentication Test", async ({ page, context }) => {
    // Navigate to a webpage with an alert dialog
    await page.goto("https://web-playground.ultralesson.com/");

    // Locate and click the account icon
    const accountIcon: Locator = page.locator("a[class*='header__icon--account']");
    await accountIcon.click();

    // Fill in email and password fields for login
    const emailField: Locator = page.locator("#CustomerEmail");
    const passwordField: Locator = page.locator("#CustomerPassword");
    await emailField.fill("ultralesson@gmail.com"); // Replace with a valid email, if not registeted please create one and use it.
    await passwordField.fill("12345"); // Corresponding password used while registering...

    // Click the "Sign in" button
    const submitButtonField: Locator = page.getByText("Sign in");
    await submitButtonField.click();

    // Optionally, you can add a pause here if there's a CAPTCHA challenge
    await page.pause()

    // Open a new tab in the same context
    const newTab = await context.newPage();
    await newTab.goto("https://web-playground.ultralesson.com/");

    // Bring the new tab to the front
    await newTab.bringToFront();

    // Locate and click the account icon in the new tab
    const accountIconInNewTab: Locator = newTab.locator("a[class*='header__icon--account']");
    await accountIconInNewTab.click();

    // Assert that the "Log out" button is visible in the new tab
    await expect(newTab.getByText("Log out")).toBeVisible();

    // Close the new tab
    await newTab.close();

    // Click the "Log out" button in the original tab
    await page.getByText("Log out").click();
});
