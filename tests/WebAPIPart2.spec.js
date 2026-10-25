//Login UI -> .json
//test browser -> .json , cart-,order,orderdetails,order history
const { test, expect } = require("@playwright/test");
let webContext;
test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  const email = "";
  await page.goto("https://rahulshettyacademy.com/client");
  await page.fill("#userEmail", "johnsmith12355@yopmail.com");
  await page.fill("#userPassword", "Test@1234");
  await page.click("#login");
  await page.waitForLoadState("networkidle");
  await context.storageState({ path: "state.json" });
  // await browser.newContext({ storageState: "state.json" });
  webContext = await browser.newContext({ storageState: "state.json" });
});
test("Sign In Ecommerce", async () => {
  const productName = "ZARA COAT 3";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");

  await page.locator(".card-body b").first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();
  await page
    .getByRole("listitem")
    .getByRole("button", { name: "Cart" })
    .click();
  await page.locator("div li").first().waitFor();
  await expect(page.getByText("ZARA COAT 3")).toBeVisible();
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByPlaceholder("Select Country").pressSequentially("ind");
  await page.getByRole("button", { name: "India" }).nth(1).click();
  await page.getByText("PLACE ORDER").click();
  //Thankyou for the order.
  await expect(page.getByText("Thankyou for the order.")).toBeVisible();
});

test("@API Test Case 2", async () => {
  const productName = "ZARA COAT 3";
  const page = await webContext.newPage();
  await page.goto("https://rahulshettyacademy.com/client");
  const products = page.locator(".card-body");

  await page.locator(".card-body b").first().waitFor();
  // await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash')
  const titles = await page.locator(".card-body b").allTextContents();
  console.log(titles);
});
//email
