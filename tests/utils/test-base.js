const base = require("@playwright/test");

exports.customtest = base.test.extend({
  testDataForOrder: {
    username: "johnsmith12355@yopmail.com",
    password: "Test@1234",
    productName: "ZARA COAT 3",
  },
});
