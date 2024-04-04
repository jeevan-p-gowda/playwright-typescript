import { test, expect, Locator } from "@playwright/test";

test("Static dropdown interaction and validation", async ({ page }) => {
    // Step 1: Navigate to the website
    await page.goto("https://web-playground.ultralesson.com/");

    // Step 2: Click the search icon
    const searchIcon: Locator = page.locator("css=summary[class*='header__icon--search']");
    await searchIcon.click();

    // Step 3: Locate the search input field, fill it, and press Enter
    const searchInput: Locator = page.locator("#Search-In-Modal");
    await searchInput.fill("Shoes");
    await searchInput.press("Enter");

    // Step 4: Locate the relevance dropdown (select element) and select "price-ascending" option
    const relevanceSelectLocator: Locator = page.locator("#SortBy");
    await relevanceSelectLocator.selectOption("price-ascending");

    // Step 5: Assert that the "price-ascending" option is selected
    await expect(page.locator("select[id='SortBy'] > option[value*='price-ascending']")).toHaveAttribute("selected", "selected");

    // Step 6: Select "price-descending" option from the relevance dropdown
    await relevanceSelectLocator.selectOption("price-descending");

    // Step 7: Assert that the "price-ascending" option is not selected (negative assertion)
    await expect(page.locator("select[id='SortBy'] > option[value*='price-ascending']")).not.toHaveAttribute("selected", "selected");
});
