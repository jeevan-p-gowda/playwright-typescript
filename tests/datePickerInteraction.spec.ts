import { test, expect, Page, Locator, FrameLocator } from "@playwright/test";

test("Date Selection in Date Picker", async ({ page }) => {
    // Navigate to the page with the date picker
    await page.goto("https://jqueryui.com/datepicker/");

    // Locate and switch to the iframe containing the date picker
    const iframeContext: FrameLocator = await page.frameLocator("iframe[class*='demo-frame']");

    // Click on the date picker input field to display the calendar
    const datePickerInput: Locator = iframeContext.locator("#datepicker");
    await datePickerInput.click();

    // Define the target year to be selected
    const yearToBeSelected: string = "2022";

    const monthToBeSelected: string = "september"; // Target month to select
    const referenceYear: number = 2023; // Reference year used in the month selection logic

    // Define the date to be selected
    const dateToBeSelected = "15";

    // Function to select the target year
    async function yearSelection() {
        const yearElement: Locator = iframeContext.locator("span.ui-datepicker-year");

                // Waiting for the year element to be in visible state
                await yearElement.waitFor({
                            state: "visible",
                        });
        const yearText: string = await yearElement.textContent() as string;

        // Logging the current year
        console.log("Current year: " + yearText);

        // If the current year is less than the target year, click on the "Next" button
        if (Number(yearText) < Number(yearToBeSelected)) {
            const nextButton: Locator = await iframeContext.locator("a[title='Next']");
            await nextButton.click();
        }
        // If the current year is greater than the target year, click on the "Prev" button
        else if (Number(yearText) > Number(yearToBeSelected)) {
            const prevButton: Locator = await iframeContext.locator("a[title='Prev']");
            await prevButton.click();
        }
        // If the target year is reached, return
        else {
            return;
        }

        // Recursively call the function until the target year is selected
        await yearSelection();
    }

    // Function to recursively select the target month in the date picker
    async function monthSelection() {
        // Wait for the month element in the date picker to be visible
        const monthElement = await iframeContext.locator("span.ui-datepicker-month");
        await monthElement.waitFor({ state: "visible" });

        // Retrieve the currently displayed month from the date picker
        const month: string = (await monthElement.textContent()) as string;

        // Log the current month for debugging purposes
        console.log("Current month: " + month);

        // Determine whether to navigate to the next or previous month
        if (monthToBeSelected !== month.trim().toLowerCase()) {
            // Click the "Prev" or "Next" button based on the year comparison to the reference year
            if (Number(yearToBeSelected) < referenceYear) {
                const prevButton = iframeContext.locator("a[title='Prev']");
                await prevButton.click();
            } else if (Number(yearToBeSelected) > referenceYear) {
                const nextButton = iframeContext.locator("a[title='Next']");
                await nextButton.click();
            }

            // Recursively call the function until the target month is reached
            await monthSelection();
        }
    }

    // Function to select the target day in the date picker
    async function daySelection() {
        // Retrieve all the day elements within the date picker
        const daysElement = iframeContext.locator(".ui-state-default");

        // Iterate over the day elements and select the target date
        const days = await daysElement.elementHandles();
        for (const day of days) {
            const innerDateValue = await day.textContent();
            if (innerDateValue === dateToBeSelected) {
                // Replace with target date
                await day.click();
                break; // Exit the loop once the target date is clicked
            }
        }
    }


    // Start the year selection process
    await yearSelection();
    await monthSelection();
    await daySelection();
});
