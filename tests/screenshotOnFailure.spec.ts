import { test, expect } from "../fixtures/test.hook.fixture";

test("Failing Test Case for Screenshot Capture", async ({ page }) => {
    const url: string = "https://ultralesson.ai/";
    await page.goto(url);
// Intentionally failing the test to capture a screenshot
await expect(page).toHaveURL("https://example.com/non-existent-page");

});
