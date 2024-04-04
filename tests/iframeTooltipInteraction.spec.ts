import { test, expect, Locator, FrameLocator } from "@playwright/test";

test("Handling iFrames and validating tooltips on hover", async ({ page }) => {
    // Navigate to the website with a tooltip inside an iframe
    await page.goto("https://jqueryui.com/tooltip/");

    // Locate the iframe containing the tooltip
    const toolTipIFrame: FrameLocator = await page.frameLocator(".demo-frame");

    // Check if the tooltip is not visible before hovering
    let isToolTipVisibleBeforeHover: boolean = await toolTipIFrame
        .getByRole("tooltip", {
            name: "We ask for your age only for statistical purposes.",
        })
        .isVisible();

    // Assert that the tooltip is not visible before hovering
    await expect(isToolTipVisibleBeforeHover).toBe(false);

    // Hover over the element to trigger the tooltip
    await toolTipIFrame.locator("#age").hover();

    // Check if the tooltip is visible after hovering
    isToolTipVisibleBeforeHover = await toolTipIFrame
        .getByRole("tooltip", {
            name: "We ask for your age only for statistical purposes.",
        })
        .isVisible();

    // Assert that the tooltip is visible after hovering
    await expect(isToolTipVisibleBeforeHover).toBe(true);
});
