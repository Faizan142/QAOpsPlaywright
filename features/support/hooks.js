// const playwright = require("@playwright/test");
const playwright = require("playwright");
const { POManager } = require("../../pageobjects/POManager");
const {
  Before,
  After,
  AfterStep,
  Status,
} = require("@cucumber/cucumber");

Before(async function () {
  const browser = await playwright.chromium.launch({
    headless: false,
  });

  const context = await browser.newContext();
  this.page = await context.newPage();
  this.poManager = new POManager(this.page);
});

After(async function () {
  console.log("I am last to execute");

  if (this.browser) {
    await this.browser.close();
  }
});