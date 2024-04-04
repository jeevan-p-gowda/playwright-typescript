import { test, expect, Locator, ElementHandle, Page } from "@playwright/test";

test("Handling multiple tabs in Playwright", async ({ page, context }) => {
    // Step 1: Navigate to the website
    await page.goto("https://web-playground.ultralesson.com/");

    // Step 2: Locate the first product link
    const firstProductAnchorTagLocator: Locator = page.locator("h3[class*='card-information__text'] > a");
    const firstProductElementHandle: ElementHandle<HTMLElement> = (await firstProductAnchorTagLocator
        .nth(0)
        .elementHandle()) as ElementHandle<HTMLElement>;

    // Step 3: Set 'target' attribute to '_blank' using evaluate
    await page.evaluate(
        ([firstProductElementHandle]) => {
            firstProductElementHandle.setAttribute("target", "_blank");
        },
        [firstProductElementHandle],
    );

    // Step 4: Click the first product link (opens in a new tab)
    await firstProductElementHandle.click({ force: true });

    // Step 5: Wait for a new tab to be created in the context
    await context.waitForEvent("page");

    // Step 6: Get a list of all open tabs in the context
    const tabs: Page[] = await context.pages();

    // Step 7: Assert that there are two tabs (the original page and the new product page)
    await expect(tabs.length).toBe(2);

    // Step 8: Assign names to the two tabs
    const [homePage, productPage] = tabs;

    // Step 9: Assert that the URLs of the two tabs are as expected
    await expect(homePage).toHaveURL("https://web-playground.ultralesson.com/");
    await expect(productPage).toHaveURL(/\/products/);

    // Step 10: Close the product page tab
    await productPage.close();
});
