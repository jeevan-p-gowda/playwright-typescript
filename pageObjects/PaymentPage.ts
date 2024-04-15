import { Page, Locator } from "@playwright/test";

export default class PaymentPage {
    private readonly page: Page;
    private readonly cashOnDeliveryOption: Locator;
    private readonly completeOrderButton: Locator;
    
constructor(page: Page) {
    this.page = page;
    this.cashOnDeliveryOption = page.locator("#basic-paymentOnDelivery");
    this.completeOrderButton = page.locator("div[id='pay-button-container'] button");
}

async selectCashOnDelivery() {
    await this.cashOnDeliveryOption.click();
}

async completeOrder() {
    await this.completeOrderButton.click();
}

}
