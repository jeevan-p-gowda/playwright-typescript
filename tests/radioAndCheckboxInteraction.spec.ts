import { test, expect, Locator, FrameLocator } from '@playwright/test';

test('Check and Uncheck Radio Buttons and Checkboxes', async ({ page }) => {
    // Navigate to the jQuery UI Checkboxradio demo page
    await page.goto('https://jqueryui.com/checkboxradio/');

    // Locating the iframe containing the widgets
    const radioButtonIframe: FrameLocator = await page.frameLocator('.demo-frame');

    // Radio Group Interaction and Validation
    const radioButtons: string[] = ['radio-1', 'radio-2', 'radio-3'];
    for (const radioButtonId of radioButtons) {
        const radioButton: Locator = await radioButtonIframe.locator(`label[for='${radioButtonId}']`);
        await radioButton.check();
        await expect(radioButton).toBeChecked();
    }

    // Checkbox Nested in Label Interaction and Validation
    const checkboxes: string[] = ['checkbox-nested-1', 'checkbox-nested-2', 'checkbox-nested-3', 'checkbox-nested-4'];
    for (const checkboxId of checkboxes) {
        const checkbox: Locator = await radioButtonIframe.locator(`label[for=${checkboxId}]`);
        await checkbox.check();
        await expect(checkbox).toBeChecked();
        await checkbox.uncheck();
        await expect(checkbox).not.toBeChecked();
    }
});
