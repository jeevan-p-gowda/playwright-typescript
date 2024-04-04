import { Page, Locator } from "@playwright/test";

// Define the interface for bounding box coordinates
interface BoundingBoxSignature {
    x: number;
    y: number;
    width: number;
    height: number;
}

/**
 * Perform a drag-and-drop action from the source element to the center of the target element.
 *
 * @param page - The Playwright page object.
 * @param source - Locator for the source element to drag.
 * @param target - Locator for the target element to drop onto.
 */
export async function dragAndDropToCenter(page: Page, source: Locator, target: Locator): Promise<void> {
    // Get the bounding boxes of the source and target elements
    const sourceBoundingBox: BoundingBoxSignature = (await source.boundingBox()) as BoundingBoxSignature;
    const targetBoundingBox: BoundingBoxSignature = (await target.boundingBox()) as BoundingBoxSignature;
// Calculate the center coordinates of the source and target elements
const sourceCenterX = sourceBoundingBox.x + sourceBoundingBox.width / 2;
const sourceCenterY = sourceBoundingBox.y + sourceBoundingBox.height / 2;
const targetCenterX = targetBoundingBox.x + targetBoundingBox.width / 2;
const targetCenterY = targetBoundingBox.y + targetBoundingBox.height / 2;

// Perform the drag-and-drop action
await page.mouse.move(sourceCenterX, sourceCenterY);
await page.mouse.down();
await page.mouse.move(targetCenterX, targetCenterY);
await page.mouse.up();

}
