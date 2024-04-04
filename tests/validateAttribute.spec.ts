import { test, expect, Locator } from "@playwright/test";

test("Attribute verification with getAttribute", async ({ page }) => {
    await page.goto("https://web-playground.ultralesson.com/");

    // Locate the heading element by its role
    const homePageHeadingLocator: Locator = page.getByRole("heading", {
        name: "ul-web-playground",
        level: 1
    });

    // Assert the class attribute of the heading element
    await expect(await homePageHeadingLocator.getAttribute("class")).toBe("header__heading");
});
