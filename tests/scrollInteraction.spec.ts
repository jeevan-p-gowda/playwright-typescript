import { test, expect, Locator } from "@playwright/test";

test("Scroll into view and validate element text", async ({ page }) => {
    // Navigate to the Ultralesson Web Playground homepage
    await page.goto("https://web-playground.ultralesson.com/");

    // Locate the element with the heading 'Subscribe to our emails'
    const subscribeToEmailHeaderAtFooter: Locator = page.getByRole("heading", {
        name: 'Subscribe to our emails'
    });

    // Scroll to the element to ensure it's in view
    await subscribeToEmailHeaderAtFooter.scrollIntoViewIfNeeded();

    // Wait for a brief moment to observe the scroll action (not recommended in actual tests)
    await page.waitForTimeout(3000);

    // Validate the text content of the element
    await expect(await subscribeToEmailHeaderAtFooter.textContent()).toBe("Subscribe to our emails");
});
