import { test, expect } from "@playwright/test";

test("Validate the Ultralesson web page title", async ({ page }) => {
    await page.goto("https://ultralesson.ai/");
    await expect(page).toHaveTitle("Ultralesson");
});
