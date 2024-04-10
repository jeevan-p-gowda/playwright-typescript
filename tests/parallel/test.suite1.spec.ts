import { test } from "@playwright/test";

test.describe.configure({ mode: 'serial' });

const testFileNamePrefix = "Test - in test.suite1.spec.ts file";

test(`${testFileNamePrefix} - Test 1`, async ({ page }) => {
    console.log("Test case 1");
});

test(`${testFileNamePrefix} - Test 2`, async ({ page }) => {
    console.log("Test case 2");
});

test(`${testFileNamePrefix} - Test 3`, async ({ page }) => {
    console.log("Test case 3");
});
