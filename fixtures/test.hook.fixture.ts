import { test as baseTest } from "@playwright/test"

export const test = baseTest.extend<{
    testHook: void
}>({
    testHook: [
        async ({page}, use, testInfo) => {
            console.log("Global Setup: Before Each Test")
            await use();
            // Screenshot logic for failed tests
        if (testInfo.status === "failed") {
            const screenshotPath = `./screenshots/${testInfo.title.replace(/\\s/g, "_").toLowerCase()}.png`;
            await page.screenshot({ path: screenshotPath });
            console.log(`Screenshot saved to: ${screenshotPath}`);
        }
    } , { auto: true }
        
    ]
});

export { expect } from '@playwright/test';
