import { test, expect, Locator } from "@playwright/test";
import { waitForTextIncludes } from "../utilities/waitForTextIncludes";

test("Checkbox interaction and dynamic content validation", async ({ page }) => {
    // Step 1: Navigate to the website
    await page.goto("https://web-playground.ultralesson.com/");

    // Step 2: Click the search icon
    const searchIcon: Locator = page.locator("css=summary[class*='header__icon--search']");
    await searchIcon.click();

    // Step 3: Locate the search input field, fill it, and press Enter
    const searchInput: Locator = page.locator("#Search-In-Modal");
    await searchInput.fill("Shoes");
    await searchInput.press("Enter");

    // Step 4: Locate filter options and apply filters
    const filterOptionsLocators: Locator = page.locator("summary[class*='facets__summary']");
    await filterOptionsLocators.nth(0).click();

    const inStockCheckboxLocator: Locator = page.locator("#Filter-Availability-1");
    const outOfStockCheckboxLocator: Locator = page.locator("#Filter-Availability-2");

    // Step 5: Apply 'In Stock' filter and check results
    await inStockCheckboxLocator.check({ force: true });

    // Step 6: Find visible facet element
    const facetsHeaderElements: Locator[] = await page.locator("div[class*='facets__header']").all();
    let visibleFacetElement: Locator | null = null;

        // Loop through each facet header element to find the visible one
    for (let facetsHeaderElement of facetsHeaderElements) {
                // Check if the current facet header element is visible
        if (await facetsHeaderElement.isVisible()) {
                        // If it's visible, assign it to the 'visibleFacetElement' variable
            visibleFacetElement = facetsHeaderElement;
        }
    }

    // Step 7: Wait for text to include "1"
    await waitForTextIncludes(page,  (visibleFacetElement as Locator).locator("span"), "1");

    // Step 8: Assertions for 'In Stock' filter
    await expect(inStockCheckboxLocator).toBeChecked();
    await expect(await (visibleFacetElement as Locator).textContent()).toContain("1 selected");

    // Step 9: Apply 'Out of Stock' filter and check results
    await outOfStockCheckboxLocator.check({ force: true });

    // Step 10: Wait for text to include "2"
    await waitForTextIncludes(page,  (visibleFacetElement as Locator).locator("span"), "2");

    // Step 11: Assertions for 'Out of Stock' filter
    await expect(outOfStockCheckboxLocator).toBeChecked();
    await expect(await (visibleFacetElement as Locator).textContent()).toContain("2 selected");

    // Step 12: Uncheck 'Out of Stock' filter and check results
    await outOfStockCheckboxLocator.uncheck({ force: true });

    // Step 13: Wait for text to include "1"
    await waitForTextIncludes(page,  (visibleFacetElement as Locator)?.locator("span"), "1");

    // Step 14: Assertions for 'Out of Stock' filter (unchecked)
    await expect(outOfStockCheckboxLocator).not.toBeChecked();
    await expect(await (visibleFacetElement as Locator).textContent()).toContain("1 selected");
});
