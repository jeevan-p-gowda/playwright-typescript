import { test } from "@playwright/test";

test("Global Teardown", async () => {
    console.log("This is a Global Teardown");
});
