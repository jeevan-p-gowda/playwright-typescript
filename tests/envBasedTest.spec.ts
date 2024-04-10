import { test, expect } from "@playwright/test";

test("Environment-Specific URL Test", async ({ page }) => {
    await page.goto("/");
    switch (process.env.ENV) {
        case "dev":
            await expect(page).toHaveURL(/google/);
            break;
        case "prod":
            await expect(page).toHaveURL(/ultralesson/);
            break;
        case "stage":
            await expect(page).toHaveURL(/yahoo/);
            break;
    }
});
