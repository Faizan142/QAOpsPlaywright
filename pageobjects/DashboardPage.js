class DashboardPage {
  constructor(page) {
    this.page = page;
    this.products = page.locator(".card-body");
    this.productsText = page.locator(".card-body b");
    this.cart = page.locator("[routerLink*='cart']");
    this.orders = page.locator("button[routerlink*='myorders']");
  }

  async searchProductAddCart(productName) {
    // ✅ Wait until products load
    await this.products.first().waitFor({ state: "visible" });

    const count = await this.products.count();

    for (let i = 0; i < count; i++) {
      const productText = await this.products.nth(i).locator("b").innerText();

      if (productText.trim() === productName) {
        // ✅ Stable button locator
        await this.products
          .nth(i)
          .locator("button:has-text('Add To Cart')")
          .click();

        break;
      }
    }
  }

  async navigateToCart() {
    await this.cart.click();
  }

  async navigateToOrders() {
    await this.orders.click();
  }
}

module.exports = { DashboardPage };
