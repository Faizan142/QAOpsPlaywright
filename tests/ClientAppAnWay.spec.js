const { test, expect } = require("@playwright/test");

test("Sign Up Ecommerce", async ({ browser }) => {
  //chrome - plugins/cookies

  const context = await browser.newContext();
  const page = await context.newPage();
  const fName = page.locator("#firstName");
  const lName = page.locator("#lastName");
  const email = page.locator("#userEmail");
  const pNumber = page.locator("#userMobile");
  const password = page.locator("#userPassword");
  const confirmPassword = page.locator("#confirmPassword");
  //const occupation = page.locator("custom-select ng-pristine ng-valid ng-touched")
  await page.goto("https://rahulshettyacademy.com/client");
  await page.click(".text-reset");
  await fName.fill("jamessmith");
  await lName.fill("smith");
  await email.fill("johnsmith12355@yopmail.com");
  await pNumber.fill("1234567890");
  await page.selectOption('select[formcontrolname="occupation"]', { index: 2 });
  await page.check('[value="Male"]');
  await password.fill("Test@1234");
  await confirmPassword.fill("Test@1234");
  await page.check('input[type="checkbox"]');
  await page.click("#login");
  await page.click(".btn.btn-primary");
  await page.waitForURL("https://rahulshettyacademy.com/client/auth/login");
  await page.fill("#userEmail", "johnsmith12355@yopmail.com");
  await page.fill("#userPassword", "Test@1234");
  await page.click("#login");
  await page.waitForURL("https://rahulshettyacademy.com/client/dashboard/dash");
  const productTitleAgain = page.locator(".card-body b").first();
  await expect(productTitleAgain).toBeVisible();
  await expect(productTitleAgain).not.toHaveText("");
  await expect(productTitleAgain).toHaveText("ZARA COAT 3");
  const titleText = await productTitleAgain.textContent();
  console.log("First product title:", titleText);
  // await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash');
  // // Log out
  // await page.click('button[routerlink="/auth/login"]');
});

test.only("Sign In Ecommerce", async ({ page }) => {
  const email = "johnsmith12355@yopmail.com";
  const productName = "ZARA COAT 3";
  const products = page.locator(".card-body");
  await page.goto("https://rahulshettyacademy.com/client");
  await page.getByPlaceholder("email@example.com").fill(email);
  await page.getByPlaceholder("enter your passsword").fill("Test@1234");
  await page.getByRole("button", { name: "Login" }).click();
  await page.waitForLoadState("networkidle");
  //await page.locator("[value= 'Login']").click()
  //await page.click('#login')
  //await page.waitForLoadState('networkidle')
  await page.locator(".card-body b").first().waitFor();
  await page
    .locator(".card-body")
    .filter({ hasText: "ZARA COAT 3" })
    .getByRole("button", { name: "Add to Cart" })
    .click();
  // await page.waitForURL('https://rahulshettyacademy.com/client/dashboard/dash')
  //  const titles = await page.locator('.card-body b').allTextContents();
  // console.log(titles)
  //  await page.getByRole("button",{name: "Cart"}).click()
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
  //  const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()

  // console.log(orderId)

  //const dropdown = page.locator(".ta-results")
  //   await dropdown.waitFor();
  //   const optionsCount  = await dropdown.locator("button").count();
  //   for(let i =0;i < optionsCount;++i)
  //   {
  //   const  text = await dropdown.locator("button").nth(i).textContent()
  //     if(text === " India"){
  //            await dropdown.locator("button").nth(i).click()
  //            break;
  //   }
  // }
  //   const count = await products.count()
  //   for(let i =0; i <count ;++i){
  //     if(await products.nth(i).locator("b").textContent()=== productName){
  //       // add to cart
  //       await products.nth(i).locator("text= Add To Cart").click()
  //       break;
  //     }
  //   }
  //   await page.locator("[routerLink*='cart']").click()
  //   await page.locator("div li").first().waitFor()
  //   const bool =await page.locator("h3:has-text('ZARA COAT 3')").isVisible()
  //   expect(bool).toBeTruthy()
  //   await page.locator("text=Checkout").click()
  //   await page.locator("input[placeholder*='Select Country']").pressSequentially("ind", { delay: 200 });
  //   const dropdown = page.locator(".ta-results")
  //   await dropdown.waitFor();
  //   const optionsCount  = await dropdown.locator("button").count();
  //   for(let i =0;i < optionsCount;++i)
  //   {
  //   const  text = await dropdown.locator("button").nth(i).textContent()
  //     if(text === " India"){
  //            await dropdown.locator("button").nth(i).click()
  //            break;
  //   }
  // }
  //       expect(page.locator(".user__name [type='text']").first()).toHaveText(email)
  //       await page.locator(".action__submit").click()
  //       expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ")
  //       const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent()
  //       console.log(orderId)
  //       await page.locator("button[routerLink*='myorders']").click()
  //       await page.locator('tbody').waitFor()
  //       const rows = await page.locator("tbody tr")
  //       for(let i =0;i< await rows.count();++i){
  //         const rowOrderId = await rows.nth(i).locator("th").textContent()
  //         if(orderId.includes(rowOrderId)){
  //           await rows.nth(i).locator("button").first().click()
  //           break;
  //         }

  //       }
  //       const orderIdDetails = await page.locator(".col-text").textContent();
  //       expect(orderId.includes(orderIdDetails)).toBeTruthy()

  // My Code for View in Table of Orders
  //Step 1: Click on the order button
  //                   await page.click("button:has-text('  ORDERS')");
  //                   const orders = page.locator('table tbody tr'); // adjust selector if needed
  //                   const count1 = await orders.count();
  //                   for(let i = 0; i < count1;i++){
  //                     const orderRow = orders.nth(i)
  //                  // const orderId2 = await orderRow.locator('td').nth(0).textContent();
  //                  // console.log('Found Order ID:',orderId2)

  //                   if (orderId?.includes(orderId)) { // Replace with actual condition
  //                       await orderRow.locator('button:has-text("View")').click();
  //                   break;
  //   }
  // }

  //await page.pause()
});
//email
