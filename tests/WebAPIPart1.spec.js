const { test, expect, request } = require("@playwright/test");
const { APIUtils } = require("./utils/APIUtils");

const loginPayLoad = {
  userEmail: "johnsmith12355@yopmail.com",
  userPassword: "Test@1234",
};

const orderPayLoad = {
  orders: [{ country: "India", productOrderedId: "67a8dde5c0d3e6622a297cc8" }],
};

let response;

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

  // Wait and click on 'My Orders' button
  await page.locator("button[routerlink*='myorders']").click();

  // Wait for orders table to be visible
  await page.locator("tbody").waitFor({ timeout: 10000 });

  const rows = await page.locator("tbody tr");
  const rowCount = await rows.count();
  console.log("Total order rows found:", rowCount);

  let orderFound = false;

  for (let i = 0; i < rowCount; ++i) {
    const rowOrderId = (await rows.nth(i).locator("th").textContent())?.trim();

    console.log(`Checking row ${i} with Order ID:`, rowOrderId);

    if (response?.orderId?.toString().includes(rowOrderId)) {
      console.log("Order matched! Clicking View...");
      await rows.nth(i).locator("button").first().click();
      orderFound = true;
      break;
    }
  }

  if (!orderFound) {
    throw new Error(
      `Order ID ${response?.orderId} not found in the orders table.`
    );
  }

  // Verify the order details page
  const orderIdDetails = (
    await page.locator(".col-text").textContent()
  )?.trim();
  page.pause();
  console.log("orderIdDetails from UI:", orderIdDetails);
  console.log("API orderId:", response?.orderId);

  expect(response?.orderId?.toString().includes(orderIdDetails)).toBeTruthy();
});
