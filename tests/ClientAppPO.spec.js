const { expect, test } = require("@playwright/test");
const { customtest } = require("../tests/utils/test-base");
const { POManager } = require("../pageobjects/POManager");
const dataset = JSON.parse(
  JSON.stringify(require("../tests/utils/placeorderTestData.json"))
);

test("Sign Up Ecommerce", async ({ browser }) => {
  //chrome - plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();
  const fName = page.locator("#firstName");
  const lName = page.locator("#lastName");
  const email = page.locator("#userEmail");
  const pNumber = page.locator("#userMobile");
  const password = page.locator("#userPassword");
  const confirmPassword = page.locator("#confirmPassword");
  //const occupation = page.locator("custom-select ng-pristine ng-valid ng-touched")
  await page.goto("https://rahulshettyacademy.com/client");
  await page.click(".text-reset");
  await fName.fill("jamessmith");
  await lName.fill("smith");
  await email.fill("johnsmith12355@yopmail.com");
  await pNumber.fill("1234567890");
  await page.selectOption('select[formcontrolname="occupation"]', { index: 2 });
  await page.check('[value="Male"]');
  await password.fill("Test@1234");
  await confirmPassword.fill("Test@1234");
  await page.check('input[type="checkbox"]');
  await page.click("#login");
  await page.click(".btn.btn-primary");
  await page.waitForURL("https://rahulshettyacademy.com/client/auth/login");
  await page.fill("#userEmail", "johnsmith12355@yopmail.com");
  await page.fill("#userPassword", "Test@1234");
  await page.click("#login");
  await page.waitForURL("https://rahulshettyacademy.com/client/dashboard/dash");
  const productTitleAgain = page.locator(".card-body b").first();
  await expect(productTitleAgain).toBeVisible();
  await expect(productTitleAgain).not.toHaveText("");
  await expect(productTitleAgain).toHaveText("ZARA COAT 3");
  const titleText = await productTitleAgain.textContent();
  console.log("First product title:", titleText);
});
for (const data of dataset) {
  test(`Client App Login ${data.productName}`, async ({ page }) => {
    const poManager = new POManager(page);
    const username = "johnsmith12355@yopmail.com";
    const password = "Test@1234";
    const productName = "ZARA COAT 3";
    const products = page.locator(".card-body");
    const loginPage = poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(data.username, data.password);
    const dashboardPage = poManager.getDashboardPage();
    await dashboardPage.searchProductAddCart(data.productName);
    await dashboardPage.navigateToCart();
    const cartPage = poManager.getCartPage();
    await cartPage.VerifyProductIsDisplayed(data.productName);
    await cartPage.Checkout();

    const ordersReviewPage = poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind", "India");
    const orderId = await ordersReviewPage.SubmitAndGetOrderId();
    console.log(orderId);
    await dashboardPage.navigateToOrders();
    const ordersHistoryPage = poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(orderId);
    expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
  });
}
customtest.only(`Client App Login `, async ({ page, testDataForOrder }) => {
  const poManager = new POManager(page);
  const username = "johnsmith12355@yopmail.com";
  const password = "Test@1234";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  const loginPage = poManager.getLoginPage();
  await loginPage.goTo();
  await loginPage.validLogin(
    testDataForOrder.username,
    testDataForOrder.password
  );
  const dashboardPage = poManager.getDashboardPage();
  await dashboardPage.searchProductAddCart(testDataForOrder.productName);
  await dashboardPage.navigateToCart();
  const cartPage = poManager.getCartPage();
  await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
  await cartPage.Checkout();

  const ordersReviewPage = poManager.getOrdersReviewPage();
  await ordersReviewPage.searchCountryAndSelect("ind", "India");
  const orderId = await ordersReviewPage.SubmitAndGetOrderId();
  console.log(orderId);
  await dashboardPage.navigateToOrders();
  const ordersHistoryPage = poManager.getOrdersHistoryPage();
  await ordersHistoryPage.searchOrderAndSelect(orderId);
  expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});
