import { test, expect, Locator } from "@playwright/test";

test("Interacting with form fields using CSS and XPath selectors", async ({ page }) => {
    // Predefined credentials
    const email: string = "example@email.com";
    const password: string = "password123";

    // Navigate to the login page
    await page.goto("https://web-playground.ultralesson.com/account/login");

    // Locate the email field using CSS selector and fill it
    const emailTextField: Locator = page.locator("css=input[id='CustomerEmail']");
    await emailTextField.fill(email);

    // Locate the password field using XPath selector and fill it
    const passwordTextField: Locator = page.locator("xpath=//input[@id='CustomerPassword']");
    await passwordTextField.fill(password);

    // Validate the values in the email and password fields
    await expect(emailTextField).toHaveValue(email);
    await expect(passwordTextField).toHaveValue(password);
});
