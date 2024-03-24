import { test, expect, Locator } from "@playwright/test";

test("Product grid navigation and element filtering", async ({ page }) => {
    await page.goto("https://web-playground.ultralesson.com/");

    // Filter out elements not matching a specific product name
    const totalNumberProductsApartFromSpecifiedProductName: number = await page
        .locator("css=ul[class*='product-grid']")
        .locator("css=h3[class*='card-information__text']")
        .filter({
            hasNotText: "12 Ti Xelium Skis",
        })
        .count() // Naming the variable is used for understanding purpose, please change it accordingly to shorter or meaniful names

    // Assert the count of products excluding the specified product
    await expect(totalNumberProductsApartFromSpecifiedProductName).toBe(27)

    // Locate and click on the specified product
    await page
        .locator("css=ul[class*='product-grid']")
        .locator("css=h3[class*='card-information__text']")
        .filter({
            hasText: "12 Ti Xelium Skis",
        })
        .click({
            force: true,
        });

    // Validate navigation to the product details page
    await expect(page).toHaveURL(/\/products/);
});
