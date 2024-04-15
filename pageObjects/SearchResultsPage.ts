import { Page, Locator } from "@playwright/test";

export default class SearchResultsPage {
    private readonly page: Page;
    private readonly firstProduct: Locator;
    
constructor(page: Page) {
    this.page = page;
    this.firstProduct = page.locator("div[class*='card-wrapper']").first();
}

async clickOnFirstProduct() {
    await this.firstProduct.click();
}

}
