import { expect, Locator, Page } from "@playwright/test";

export class OrdersReviewPage {
  country: Locator;
  dropdown: Locator;
  emailId: Locator;
  submit: Locator;
  orderConfirmationText: Locator;
  orderId: Locator;
  page: Page;

  constructor(page: Page) {
    this.page = page;

    this.country = page.locator("[placeholder*='Country']");
    this.dropdown = page.locator(".ta-results");
    this.emailId = page.locator(".user__name [type='text']").first();
    this.submit = page.locator(".action__submit");
    this.orderConfirmationText = page.locator(".hero-primary");

    // ✔ safer locator (more stable than ng-star-inserted chain)
    this.orderId = page.locator("label.ng-star-inserted").last();
  }

  async searchCountryAndSelect(countryCode: string, countryName: string) {
    await this.dropdown.waitFor();

    const optionsCount = await this.dropdown.locator("button").count();

    for (let i = 0; i < optionsCount; i++) {
      const text = await this.dropdown.locator("button").nth(i).textContent();

      if (text?.trim() === countryName) {
        await this.dropdown.locator("button").nth(i).click();
        break;
      }
    }
  }

  async VerifyEmailId(username: string) {
    await expect(this.emailId).toHaveText(username);
  }

  async SubmitAndGetOrderId() {
    await this.submit.click();

    // ✔ correct locator-based assertion
    await expect(this.orderConfirmationText).toHaveText(
      /Thankyou for the order/i
    );

    // ✔ safe extraction (string only, no expect here)
    const orderIdText = await this.orderId.textContent();

    if (!orderIdText) {
      throw new Error("Order ID not found");
    }

    return orderIdText.trim();
  }
}