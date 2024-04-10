import { test, expect } from "@playwright/test";

test.describe('Dialog Handling Tests', () => {
    // Test case for handling an alert dialog
    test("Handling Alert Dialog in Playwright @alert", async ({ page }) => {
        // Navigate to a webpage with an alert dialog
        await page.goto("https://nxtgenaiacademy.com/alertandpopup/");

        // Register an event listener for alert dialogs
        page.on("dialog", async (dialog) => {
            if (dialog.type() === "alert") {
                // Handling an alert dialog
                await expect(dialog.type()).toBe("alert");
                await expect(dialog.message()).toEqual("I am an alert box!");
                await dialog.accept(); // Click the OK button or accept the alert
            }
        });

        // Trigger the alert dialog
        await page
            .getByRole("button", {
                name: "Alert Box",
                exact: true,
            })
            .click();
    });

    // Test case for handling a confirm dialog
    test("Handling Confirm Dialog in Playwright @confrim", async ({ page })  => {
        // Navigate to a webpage with a confirm dialog
        await page.goto("https://nxtgenaiacademy.com/alertandpopup/");

        // Register an event listener for confirm dialogs
        page.on("dialog", async (dialog) => {
            if (dialog.type() === "confirm") {
                // Handling a confirm dialog
                await expect(dialog.type()).toBe("confirm");
                await expect(dialog.message()).toEqual("Confirm pop up with OK and Cancel button");
                await dialog.dismiss(); // Dismiss the dialog (Click Cancel)
            }
        });

        // Trigger the confirm dialog
        await page
            .getByRole("button", {
                name: "Confirm Alert Box",
                exact: true,
            })
            .click();

        // Verify the result after dismissing the dialog
        await expect(page.getByText("You clicked on Cancel!")).toBeVisible();
    });

    // Test case for handling a prompt dialog
    test("Handling Prompt Dialog in Playwright @prompt", async ({ page }) => {
        // Navigate to a webpage with a prompt dialog
        await page.goto("https://nxtgenaiacademy.com/alertandpopup/");

        // Register an event listener for prompt dialogs
        page.on("dialog", async (dialog) => {
            if (dialog.type() === "prompt") {
                // Handling a prompt dialog
                await expect(dialog.type()).toBe("prompt");
                await expect(dialog.message()).toEqual("Do you like Automation ?");
                await dialog.accept("yes"); // Accept the prompt and provide a response
            }
        });

        // Trigger the prompt dialog
        await page
            .getByRole("button", {
                name: "Prompt Alert Box",
                exact: true,
            })
            .click();

        // Verify the result after accepting the prompt
        await expect(page.getByText("Thanks for Liking Automation")).toBeVisible();
    });
});
