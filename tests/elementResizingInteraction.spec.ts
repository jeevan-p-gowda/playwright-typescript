import { test, expect, Locator, FrameLocator } from "@playwright/test";
import { dragAndDropToCenter } from "../utilities/dragAndDropToCenter";

test("Element resizing interaction and validation", async ({ page }) => {
    // Navigate to the webpage with the resizable element
    await page.goto("https://jqueryui.com/resizable/");

    // Locate the iframe containing the resizable element
    const resizableIframe: FrameLocator = await page.frameLocator(".demo-frame");

    // Locate the resizable element within the iframe
    const resizableLocator: Locator = await resizableIframe.locator("#resizable");

    // Get the bounding box of the resizable element
    const boundingBox: any = await resizableLocator.boundingBox();

    // Get the computed width and height of the element before resizing
    const [widthBeforeResize, heightBeforeResize]: [number, number] = await resizableLocator.evaluate((element) => {
        // Get the computed styles and split the values to remove "px" units
        const { width, height } = window.getComputedStyle(element);
        return [width, height].map((dimension) => parseInt(dimension.split("px")[0])) as [number, number];
    });

    // Define the starting and ending points for the resizing action

    // From where to start
    const startX = boundingBox.x + boundingBox.width - 10; // Adjust as needed
    const startY = boundingBox.y + boundingBox.height - 10; // Adjust as needed

    // Where to end
    const endX = startX + 100; // Adjust as needed to control the resizing
    const endY = startY + 100; // Adjust as needed to control the resizing

    // Click on the element's edge to start the resizing action
    await page.mouse.move(startX, startY);
    await page.mouse.down();

    // Move the mouse to simulate resizing
    await page.mouse.move(endX, endY);

    // Release the mouse button to complete the resizing action
    await page.mouse.up();

    // Get the computed width and height of the element after resizing
    const [widthAfterResize, heightAfterResize]: [number, number] = await resizableLocator.evaluate((element) => {
        // Get the computed styles and split the values to remove "px" units
        const { width, height } = window.getComputedStyle(element);
        return [width, height].map((dimension) => parseInt(dimension.split("px")[0])) as [number, number];
    });

    // Hard wait added to observe the change, Never to be used in actual code
    await page.waitForTimeout(4000);

    // Assert that the width and height have increased after resizing
    await expect(widthBeforeResize).toBeLessThan(widthAfterResize);
    await expect(heightBeforeResize).toBeLessThan(heightAfterResize);
});
