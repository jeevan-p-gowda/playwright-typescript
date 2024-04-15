import { test } from "@playwright/test";
import HomePage from "../pageObjects/HomePage";
import AccountPage from "../pageObjects/AccountPage";
import SearchResultsPage from "../pageObjects/SearchResultsPage";
import ProductPage from "../pageObjects/ProductPage";
import CheckoutPage from "../pageObjects/CheckoutPage";
import PaymentPage from "../pageObjects/PaymentPage";
import OrderSummaryPage from "../pageObjects/OrderSummaryPage";
import { UserData } from '../models/UserData';
import testData from "../resources/testData.json"; 

test.describe("Place order successfully", () => {
    test("should complete the shopping process", async ({ page }) => {
        const data: UserData = { ...testData, email: generateRandomEmail() };
        const homePage = new HomePage(page);
        const accountPage = new AccountPage(page);
        const searchResultsPage = new SearchResultsPage(page);
        const productPage = new ProductPage(page);
        const checkoutPage = new CheckoutPage(page);
        const paymentPage = new PaymentPage(page);
        const orderSummaryPage = new OrderSummaryPage(page);
   
        await homePage.visit();
        
        await homePage.clickLoginButton();
        await accountPage.clickRegisterButton();
        await accountPage.enterUserDetailsAndClickCreateButton(data);
        await homePage.waitForHeaderToBeDisplayed();
        await homePage.navigateToSearchResultsPage(data.productName);
        await searchResultsPage.clickOnFirstProduct();
        await productPage.addProductToCart();
        await productPage.proceedToCheckout();
        await checkoutPage.fillAddressDetails(data);
        await paymentPage.selectCashOnDelivery();
        await paymentPage.completeOrder();
        await orderSummaryPage.validateOrderConfirmation();
        await orderSummaryPage.continueShopping();
        await accountPage.accessAccount();
        await accountPage.logout();
});

});

function generateRandomEmail(): string {
    const randomPart: string = Math.random().toString(36).substring(2, 15);
    return randomPart + "@email.com";
}
