Feature: Ecommerce validations
@Validation
@foo
Scenario Outline: Placing the order
Given a login to Ecommerce2 application with "<username>" and "<password>"
Then Verify Error Message is dispayed

Examples:
    |username                   |password|
    |rahulshettyacademy         |Learning@830$3mK2|
    |hello@123.com              |Iamhello@12|



#Parameterization,parallel,html,rerun failed tests