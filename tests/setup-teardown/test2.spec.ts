import { test } from "@playwright/test";

test.beforeAll("Before All Hook", async () => {
    console.log("Executed before all test cases");
});

test.afterAll("After All Hook", async () => {
    console.log("Executed after all test cases");
});

test("Test Case", async ({ page }) => {
    console.log("Test case");
});
