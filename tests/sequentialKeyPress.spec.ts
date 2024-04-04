import { test, expect, Locator } from "@playwright/test";

test("Simulating key presses and validating navigation", async ({ page }) => {
    // Step 1: Navigate to the website
    await page.goto("https://web-playground.ultralesson.com/");

    // Step 2: Click the search icon
    const searchIcon: Locator = page.locator("css=summary[class*='header__icon--search']");
    await searchIcon.click();

    // Step 3: Locate the search input field
    const searchInput: Locator = page.locator("#Search-In-Modal");

    // Step 4: Simulate typing "Shoes" with a delay of 500ms between key presses
    await searchInput.pressSequentially("Shoes", { delay: 500 });

    // Step 5: Simulate pressing the "Enter" key
    await searchInput.press("Enter");

    // Step 6: Assert that the URL matches the expected pattern ("/search?q=Shoes")
    await expect(page).toHaveURL(/search\?q=Shoes/);
});
