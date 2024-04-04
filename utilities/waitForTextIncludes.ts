import { Page, Locator } from "@playwright/test";

export async function waitForTextIncludes(
    page: Page,
    locator: Locator,
    substring: string,
    timeout: number = 30000,
): Promise<boolean> {
    const startTime = Date.now();
    while (Date.now() - startTime < timeout) {
        const textContent = await locator.textContent();
        if (textContent?.includes(substring)) {
            return true;
        }
        await page.waitForTimeout(500); // waits for 500 milliseconds before the next check
    }
    throw new Error(`Timeout: Text including '${substring}' not found within ${timeout}ms`);
}
