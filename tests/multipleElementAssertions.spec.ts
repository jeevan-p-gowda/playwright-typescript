import { test, expect, Locator } from "@playwright/test";

test("Multiple element assertions in dropdown", async ({ page }) => {
    await page.goto("https://web-playground.ultralesson.com/");

    const searchIcon: Locator = page.locator("css=summary[class*='header__icon--search']");
    await searchIcon.click();

    const searchInput: Locator = page.locator("#Search-In-Modal");
    await searchInput.fill("Shoes");

    // Wait for dropdown suggestions to load
    await page.waitForFunction(() => {
        const suggestions: NodeListOf<Element> = document.querySelectorAll("#predictive-search-results-list li");
        return suggestions.length > 3;
    });

    const suggestedProductNamesLocator: Locator = page.locator("#predictive-search-results-list h3");

    // Assert all suggestion texts
    await expect(suggestedProductNamesLocator).toHaveText([
        "Wrapped Golf Shoe",
        "Golf Shoe in White",
        "Golf Shoe in Black",
        "DZR Minna",
    ]);

    // Assert the text of the third suggested product
    const thirdSuggestedProductName: string = (await suggestedProductNamesLocator.nth(2).textContent()) as string;
    await expect(thirdSuggestedProductName).toBe("Golf Shoe in Black");

    // Assert all text contents of suggestions
    const allSuggestedProductNames: string[] = await suggestedProductNamesLocator.allTextContents()
    await expect(allSuggestedProductNames).toEqual([
        "Wrapped Golf Shoe",
        "Golf Shoe in White",
        "Golf Shoe in Black",
        "DZR Minna",
    ]);
});
