import { test, expect, Locator } from "@playwright/test";

test("File upload automation", async ({ page }) => {
    // Navigate to a webpage with a file upload input
    await page.goto("https://ps.uci.edu/~franklin/doc/file_upload.html");

    // Locate the file input element
    const fileInput: Locator = await page.locator("input[type='file']");

    // Provide the local file path you want to upload
    const filePath: string = "../resources/helloWorld.txt"; // Adjust the path to match your project structure

    // Set the value of the file input to the file path
    await fileInput.setInputFiles(filePath);

    // Add additional steps to validate the successful upload if necessary
});
