import { test, expect, Locator } from "@playwright/test";

test("Dynamic element identification with getByTestId", async ({ page }) => {
    await page.goto("https://web-playground.ultralesson.com");

    // Dynamically set a data-test-id attribute on the account icon
    await page.evaluate(() => {
        const accountIconElement: Element = document.querySelector("a[class*='header__icon--account']") as Element
        accountIconElement.setAttribute("data-test-id", "account-icon")
    })

    // Locate the account icon by its test ID and perform a click
    const accountIconElementWithTestID: Locator = page.getByTestId("account-icon")
    await accountIconElementWithTestID.click()

    // Find the login header and verify its visibility
    const loginHeaderElement: Locator = page.getByRole("heading", {
        name: "Login",
        level: 1 //Level - 1, indicates the h1 tag
    })

    await expect(loginHeaderElement).toBeVisible()
});
