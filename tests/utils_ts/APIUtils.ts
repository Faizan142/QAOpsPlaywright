import { APIRequestContext, APIResponse } from "@playwright/test";

interface LoginResponse {
  token: string;
}

interface OrderResponse {
  orders: string[];
}

export class APIUtils {
  private apiContext: APIRequestContext;
  private loginPayload: object;

  constructor(apiContext: APIRequestContext, loginPayload: object) {
    this.apiContext = apiContext;
    this.loginPayload = loginPayload;
  }

  async createOrder(
    orderPayload: object
  ): Promise<{ token: string; orderId: string }> {
    // Login
    const loginResponse: APIResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/auth/login",
      {
        data: this.loginPayload,
      }
    );

    const loginData: LoginResponse = await loginResponse.json();
    const token: string = loginData.token;

    // Create Order
    const orderResponse: APIResponse = await this.apiContext.post(
      "https://rahulshettyacademy.com/api/ecom/order/create-order",
      {
        data: orderPayload,
        headers: {
          Authorization: token,
          "Content-Type": "application/json",
        },
      }
    );

    const orderData: OrderResponse = await orderResponse.json();

    return {
      token,
      orderId: orderData.orders[0],
    };
  }
}
