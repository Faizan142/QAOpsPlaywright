class APIUtils {
  constructor(apiContext, loginPayload) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async createOrder(orderPayload) {
    // Login first
    const loginResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );

    const loginData = await loginResponse.json();
    const token = loginData.token;

    // Create order
    const orderResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const orderData = await orderResponse.json();

    return {
      token,
      orderId: orderData.orders[0], // ✅ THIS is what your test needs
    };
  }
}

module.exports = { APIUtils };
