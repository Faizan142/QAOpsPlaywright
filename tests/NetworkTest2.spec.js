const { test, expect } = require("@playwright/test");
test("Security test request intercept", async ({ page }) => {
  const email = "johnsmith12355@yopmail.com";

  await page.goto("https://rahulshettyacademy.com/client");
  await page.fill("#userEmail", email);
  await page.fill("#userPassword", "Test@1234");
  await page.click("#login");

  await page.locator(".card-body b").first().waitFor();

  await page.locator("button[routerLink*='myorders']").click();

  //login and reach orders page
  await page.route(
    "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
    (route) =>
      route.continue({
        url: "https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=68920c106f585eb60s5aa634",
      })
  );
  await page.locator("button:has-text('View')").first().click();
  await expect(page.locator("p").last()).toHaveText(
    "You are not authorize to view this order"
  );
  await page.pause();
});

//intercept request calls
//route.continue('headers')
// route  => route.continue({headers: ,url: 'http://www.google.com'})
