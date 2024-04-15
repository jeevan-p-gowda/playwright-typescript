import { Page, Locator } from "@playwright/test";

export default class ProductPage {
    private readonly page: Page;
    private readonly addToCartButton: Locator;
    private readonly checkoutButton: Locator;
    
constructor(page: Page) {
    this.page = page;
    this.addToCartButton = page.locator("button[class*='product-form__submit']");
    this.checkoutButton = page.locator("button[name='checkout']");
}

async addProductToCart() {
    await this.addToCartButton.click();
}

async proceedToCheckout() {
    await this.checkoutButton.click();
}

}
