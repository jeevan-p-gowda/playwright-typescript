import { test, expect, Locator } from "@playwright/test";

test("Dynamic dropdown interaction and navigation", async ({ page }) => {
    // Step 1: Navigate to the website
    await page.goto("https://web-playground.ultralesson.com/");

    // Step 2: Click the search icon
    const searchIcon: Locator = page.locator("css=summary[class*='header__icon--search']");
    await searchIcon.click();

    // Step 3: Fill the search input field with "Shoes"
    const searchInput: Locator = page.locator("#Search-In-Modal");
    await searchInput.fill("Shoes");

    // Step 4: Wait for the suggestions list to have more than 3 items
    await page.waitForFunction(() => {
        const suggestions: NodeListOf<Element> = document.querySelectorAll("#predictive-search-results-list li");
        return suggestions.length > 3;
    });

    // Step 5: Find and click the desired product suggestion ("Golf Shoe in Black")
    const suggestionElements: Locator[] = await page.locator("#predictive-search-results-list li").all();
    for (const suggestionElement of suggestionElements) {
        const suggestionText: string = (await suggestionElement.textContent()) as string;
        if (suggestionText.trim().includes("Golf Shoe in Black")) {
            await suggestionElement.click({ force: true });
            break;
        }
    }

    // Step 6: Wait for the URL to contain 'golf-shoe' (case-insensitive)
    await page.waitForURL(/golf-shoe/gi);

    // Step 7: Assert that the URL contains 'golf-shoe' (case-insensitive)
    await expect(page).toHaveURL(/golf-shoe/gi);
});
