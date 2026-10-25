Feature: Ecommerce validations

@Regression
Scenario: Placing the order
    Given a login to Ecommerce application with "johnsmith12355@yopmail.com" and "Test@1234"
    When Add "ZARA COAT 4" to Cart
    Then Verify "ZARA COAT 3" is displayed in the Cart
    When Enter valid details and Place the order
    Then Verify order in present in the OrderHistory



@Validation
Scenario Outline: Placing the order2
    Given a login to Ecommerce2 application with "<username>" and "<password>"
    Then Verify Error Message is displayed
    Examples:
    |       username                                  |    password           |
    |       anshika@gmail.com                         |    Iamking@000        |
    |       jamesanderson234@yopmail.com              |    Iamhello@12        |



