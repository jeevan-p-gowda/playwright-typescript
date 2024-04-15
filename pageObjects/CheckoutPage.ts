import { Page, Locator } from "@playwright/test";
import { UserData } from "../models/UserData";

export default class CheckoutPage {
    private readonly page: Page;
    private readonly addressField: Locator;
    private readonly cityField: Locator;
    private readonly zoneField: Locator;
    private readonly pincodeField: Locator;
    private readonly addOptionalAddress: Locator;

constructor(page: Page) {
    this.page = page;
    this.addressField = page.locator("#shipping-address1");
    this.cityField = page.locator("input[placeholder='City']");
    this.zoneField = page.locator("select[name*='zone']");
    this.pincodeField = page.locator("input[placeholder='PIN code']");
    this.addOptionalAddress = page.getByText("Add apartment, suite, etc.")
}

async fillAddressDetails(data: UserData) {
    await this.addressField.fill(data.address1);
    await this.cityField.fill(data.city);
    await this.zoneField.selectOption(data.zone);
    await this.pincodeField.fill(data.pincode);

    // Clicking on it will make the Standard delivery option visible
    await this.addOptionalAddress.click()

    // Wait for the shipping method to auto-appear
    await this.page.locator("p:has-text('Standard')").waitFor({ state: "visible", timeout: 60000 });
}

}
