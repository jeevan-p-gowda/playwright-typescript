import { test } from "@playwright/test";

test.beforeAll("Before All Hook", async () => {
    console.log("Executed before all test cases");
});

test.afterAll("After All Hook", async () => {
    console.log("Executed after all test cases");
});

test.beforeEach("Before Each Hook", async () => {
    console.log("Executed before each test case");
});

test.afterEach("After Each Hook", async () => {
    console.log("Executed after each test case");
});

test("Test Case 1", async () => {
    console.log("Test Case 1");
    // Test code for Test Case 1
});

test("Test Case 2", async () => {
    console.log("Test Case 2");
    // Test code for Test Case 2
});

test("Test Case 3", async () => {
    console.log("Test Case 3");
    // Test code for Test Case 3
});
