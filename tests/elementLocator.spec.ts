import { test, expect, Locator } from "@playwright/test";

test("Validate elements using locator strategies", async ({ page }) => {
    await page.goto("https://web-playground.ultralesson.com/");

        // Defining the locators
    const featuredProductHeadingLocator: Locator = page.getByRole("heading", {
        name: "Featured products",
    });

    const ulWebPlaygroundTitleLocator: Locator = page.getByRole("heading", {
        name: "ul-web-playground",
    });

    const firstProduct: Locator = page.getByText("12 Ti Xelium Skis")

    // Assertions for getByRole locator strategy to match the predefined text
    await expect(featuredProductHeadingLocator).toHaveText("Featured products");
    await expect(ulWebPlaygroundTitleLocator).toHaveText("ul-web-playground");

    // Assertion for getByText locator strategy to verify whether elements are displayed or not
    await expect(firstProduct).toBeVisible();
});
