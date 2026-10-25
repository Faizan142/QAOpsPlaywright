const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");
let response;
const loginPayLoad = {
  userEmail: "johnsmith12355@yopmail.com",
  userPassword: "Test@1234",
};
//  userEmail: "test144@yopmail.com",
//   userPassword: "Test@1234",
const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }],
};
const fakePayLoadOrders = {
  data: [],
  message: "No Orders",
};
// const response = await page.request.fetch(route.request());
let body = fakePayLoadOrders;
// route.fulfill({
//   response,
//   body,
// });

test.beforeAll(async () => {
  const apiContext = await request.newContext();
  const apiUtils = new APIUtils(apiContext, loginPayLoad);
  response = await apiUtils.createOrder(orderPayLoad);
});

test("Place the order", async ({ page }) => {
  // Inject token before page loads
  page.addInitScript((token) => {
    window.localStorage.setItem("token", token);
  }, response.token);

  await page.goto("https://rahulshettyacademy.com/client");
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*",
    async (route) => {
      const response = await page.request.fetch(route.request());
      let body = JSON.stringify(fakePayLoadOrders);
      route.fulfill({
        response,
        body,
      });
      //route.fulfill();

      //intercepting response - API response->{plawyright fake response}-> browser -> render data on frontend
    }
  );

  // (route) => {
  // page.request.fetch(route.request());
  //route.fulfill();

  //intercepting response - API response->{plawyright fake response}-> browser -> render data on frontend

  // );

  // Wait and click on 'My Orders' button
  await page.locator("button[routerlink*='myorders']").click();
  await page.waitForResponse(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/*"
  );
  //await page.pause();

  console.log(await page.locator(".mt-4").textContent());
});
