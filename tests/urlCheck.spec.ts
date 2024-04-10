import { test, expect } from "@playwright/test";

test.describe("Cross-Browser URL Verification", () => {
    test("should navigate to the webpage and check the URL", async ({ page }) => {
        await page.goto("https://ultralesson.ai/");
        await expect(page).toHaveURL("https://ultralesson.ai/");
    });
});
