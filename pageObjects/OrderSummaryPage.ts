import { Page, Locator, expect } from "@playwright/test";

export default class OrderSummaryPage {
    private readonly page: Page;
    private readonly thankYouMessage: Locator;
    private readonly continueShoppingButton: Locator;

    constructor(page: Page) {
    this.page = page;
    this.thankYouMessage = page.locator("h2:has-text('Thank you')");
    this.continueShoppingButton = page.locator("a[href='https://web-playground.ultralesson.com/']");
}

async validateOrderConfirmation() {
    await expect(this.thankYouMessage).toBeVisible();
}

async continueShopping() {
    await this.continueShoppingButton.click();
}

}
