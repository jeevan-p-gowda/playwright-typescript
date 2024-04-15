import { Page, Locator } from "@playwright/test";
import { UserData } from "../models/UserData";

export default class AccountPage {
    private readonly page: Page;
    private readonly registerButton: Locator;
    private readonly firstNameField: Locator;
    private readonly lastNameField: Locator;
    private readonly emailField: Locator;
    private readonly passwordField: Locator;
    private readonly createButton: Locator;
    private readonly accountButton: Locator;
    private readonly logoutButton: Locator;

constructor(page: Page) {
    this.page = page;
    this.registerButton = page.locator("a[href*='register']");
    this.firstNameField = page.locator("#RegisterForm-FirstName");
    this.lastNameField = page.locator("#RegisterForm-LastName");
    this.emailField = page.locator("#RegisterForm-email");
    this.passwordField = page.locator("#RegisterForm-password");
    this.createButton = page.locator("button", { hasText: "Create" });
    this.accountButton = page.locator("a[class*='header__icon--account']");
    this.logoutButton = page.locator("a[href='/account/logout']");
}

async clickRegisterButton() {
    await this.registerButton.click();
}

async accessAccount() {
    await this.accountButton.click();
}

async logout() {
    await this.logoutButton.click();
}

async enterUserDetailsAndClickCreateButton(data: UserData) {
    await this.firstNameField.type(data.firstName);
    await this.lastNameField.type(data.lastName);
    await this.emailField.type(data.email as string);
    await this.passwordField.type(data.password);
    await this.createButton.click();
}
}
