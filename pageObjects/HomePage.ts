import { Page, Locator } from "@playwright/test";

export default class HomePage {
    private readonly page: Page;
    private readonly loginButton: Locator;
    private readonly searchButton: Locator;
    private readonly searchInputField: Locator;
    private readonly header: Locator;
    
constructor(page: Page) {
    this.page = page;
    this.loginButton = page.locator("a[class*='header__icon--account']");
    this.searchButton = page.locator("details-modal[class='header__search']");
    this.searchInputField = page.locator("input[class*='search__input']");
    this.header = page.locator("h1[class='header__heading']");
}

async visit() {
    await this.page.goto("/");
}

async clickLoginButton() {
    await this.loginButton.click();
}

async waitForHeaderToBeDisplayed() {
    await this.header.waitFor({
       state : "visible" 
    })
}

async navigateToSearchResultsPage(productName: string) {
    await this.searchButton.click();
    await this.searchInputField.fill(`${productName}`);
    await this.searchInputField.press("Enter")
}

}
