import { test, expect, Cookie } from "@playwright/test";

test.describe("Cookie Handling in Playwright", () => {
    test("should set, retrieve, and validate cookies", async ({ context, page }) => {
        // Navigating to a webpage
        await page.goto("https://www.ultralesson.in/");

        // Setting a cookie
        await context.addCookies([{
            name: "testCookie",
            value: "12345",
            domain: "example.com",
            path: "/"
        }]);
        // Retrieving cookies
        const cookies: Cookie[] = await context.cookies();
        const testCookie: Cookie = cookies.find(cookie => cookie.name === "testCookie") as Cookie;

        // Validating the testCookie
        expect(testCookie).toBeDefined();
        expect(testCookie?.value).toBe("12345");
    });
});
