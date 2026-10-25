const { test, expect } = require("@playwright/test");
//const {expect} = require('../playwright.config')

test("@Web Browser Context Playwright Test", async ({ browser }) => {
  //chrome - plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();
  // page.route("**/*.{jpg,png,jpeg}", (route) => route.abort());
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const cardTitles = page.locator(".card-body a");
  page.on("request", (request) => console.log(request.url()));
  page.on("response", (response) =>
    console.log(response.url(), response.status())
  );
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

  console.log(await page.title());
  //css, xpath
  await userName.fill("rahulshettyacademy");
  await page.locator("[type= 'password']").fill("learning");
  await signIn.click();
  //web driver wait
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText("Incorrect");
  //type- fill
  await userName.fill("");
  await userName.fill("rahulshettyacademy");
  await signIn.click();
  //console.log(await cardTitles.nth(1).textContent())
  //console.log(await cardTitles.first().textContent())
  const allTitles = await cardTitles.allTextContents();
  console.log(allTitles);
});
test("@Web UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const documentLink = page.locator("[href*='documents-request']");
  const dropdown = page.locator("select.form-control");
  await dropdown.selectOption("Consultant");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  // expect(page.locator('.radiotextsty').last()).toBeChecked()
  console.log(await page.locator(".radiotextsty").last().isChecked());
  await expect(page.locator(".radiotextsty").last()).toBeChecked();
  await page.locator("#terms").click();
  await expect(page.locator("#terms")).toBeChecked();
  await page.locator("#terms").uncheck();
  expect(await page.locator("#terms").isChecked()).toBeFalsy();
  await expect(documentLink).toHaveAttribute("class", "blinkingText");
  //assertion
  //  await page.pause()
});

test.only("@Child Windows Handle", async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const userName = page.locator("#username");
  const documentLink = page.locator("[href*='documents-request']");

  const [newPage] = await Promise.all([
    context.waitForEvent("page"), //listen for any new page pending,rejected,fullfilled
    documentLink.click(),
  ]);
  const text = await newPage.locator(".red").textContent();
  const arrayText = text.split("@");
  const domain = arrayText[1].split(" ")[0];
  console.log(domain);
  page.locator("#username").fill(domain);
  //  await page.pause()
  console.log(await page.locator("#username").inputValue());
});

//playwright code-
//step 1 - open browser
//step 2 - enter u/p 2 seconds
//step 3 - Click
