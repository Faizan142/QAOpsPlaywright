import { test as baseTest } from "@playwright/test";
interface TestDataForOrder {
  username: string;
  password: string;
  productName: string;
}
export const customtest = baseTest.extend<{
  testDataForOrder: TestDataForOrder;
}>({
  testDataForOrder: {
    username: "johnsmith12355@yopmail.com",
    password: "Test@1234",
    productName: "ZARA COAT 3",
  },
});
