import { test, expect } from "@playwright/test";

// Simulating a flaky test scenario
test("Flaky Test Example", async ({ page }) => {
    const isFlaky = Math.random() > 0.5; // Randomly pass or fail
    await page.goto("<https://example.com>");
    if (isFlaky) {
        expect(true).toBe(false); // Intentional failure
    } else {
        expect(true).toBe(true); // Pass
    }
});
