const { Given, When, Then } = require("@cucumber/cucumber");
const { POManager } = require("../../pageobjects/POManager");
const { expect } = require("@playwright/test");
const playwright = require("@playwright/test");

Given(
  "a login to Ecommerce application with {string} and {string}",
   { timeout: 100 * 1000 },
  async function (username, password) {
    const products = this.page.locator(".card-body");
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username, password);
  },
);
When("Add {string} to Cart", async function (productName) {
  this.dashboardPage = this.poManager.getDashboardPage();
  await this.dashboardPage.searchProductAddCart(productName);
  await this.dashboardPage.navigateToCart();
});
Then("Verify {string} is displayed in the Cart", async function (productName) {
  // Write code here that turns the phrase above into concrete actions
  const cartPage = this.poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(productName);
  await cartPage.Checkout();
});

When("Enter valid details and Place the order", async function () {
  const ordersReviewPage = this.poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(this.orderId);
});
Then("Verify order in present in the OrderHistory", async function () {
  // Write code here that turns the phrase above into concrete actions
  await this.dashboardPage.navigateToOrders();
  const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(this.orderId);
  expect(
    this.orderId.includes(await ordersHistoryPage.getOrderId()),
  ).toBeTruthy();
});

Given(
  "a login to Ecommerce2 application with {string} and {string}",
  { timeout: 100 * 1000 },
  async function (username, password) {

    const userName = this.page.locator("#username");
    const passwordInput = this.page.locator("[type='password']");
    const signIn = this.page.locator("#signInBtn");

    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    await userName.fill(username);
    await passwordInput.fill(password);

    await signIn.click();

    // ✅ wait for either error or successful state
    await this.page.waitForTimeout(1000);
  }
);
Then("Verify Error Message is displayed", async function () {
Then('Verify Error Message is displayed', async function () {
    const errorLocator = this.page.locator(".alert.alert-danger");

    await expect(errorLocator).toBeVisible();
    await expect(errorLocator).toContainText("Incorrect username/password.");
});
});
