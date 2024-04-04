import { test, expect, Locator, FrameLocator } from "@playwright/test";
import { dragAndDropToCenter } from "../utilities/dragAndDropToCenter";

test("Drag-and-drop interaction to center", async ({ page }) => {
    // Navigate to the website with draggable and droppable elements
    await page.goto("https://jqueryui.com/droppable/");

    // Locate the iframe containing the elements
    const dragAndDropIframe: FrameLocator = await page.frameLocator(".demo-frame");

    // Locate the draggable and droppable elements
    const draggableLocator: Locator = await dragAndDropIframe.locator("#draggable");
    const droppableLocator: Locator = await dragAndDropIframe.locator("#droppable");

    // Perform the drag-and-drop operation
    await dragAndDropToCenter(page, draggableLocator, droppableLocator);

    // Validate the text change in the droppable element
    await expect(droppableLocator).toHaveText("Dropped!");
});
