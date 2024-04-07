import { test, expect } from "@playwright/test";

test("Mobile emulation test", async ({ page }) => {
    // Navigate to the specified URL
    const url: string = "https://ultralesson.ai/";
    await page.goto(url);

    // Validate that the page URL is as expected
    await expect(page).toHaveURL(url);
});
