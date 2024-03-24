import { test, expect, Locator } from "@playwright/test";

test("Page navigation and element interaction with getByAltText", async ({ page }) => {
    const homePageURL: string = "https://web-playground.ultralesson.com/";

    await page.goto(homePageURL);

    // Locate the first product image by its alternative text
    const firstProductImageLocator: Locator = page.getByAltText("12 Ti Xelium Skis");

    // Click the product image, using force if necessary
    await firstProductImageLocator.click({force: true});

    // Validate the URL contains /products
    await expect(page).toHaveURL(/\/products/);

    // Navigate back to the homepage
    await page.goBack();

    // Validate the homepage URL
    await expect(page).toHaveURL(homePageURL);

    // Navigate forward to the product page
    await page.goForward();

    // Re-validate the URL contains /products
    await expect(page).toHaveURL(/\/products/);
});
