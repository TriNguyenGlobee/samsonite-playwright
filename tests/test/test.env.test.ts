import { test, expect } from "../../src/fixtures/test-fixture";
import { MyPage } from "../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../src/factories/login.factory";
import { tests } from "../../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue, t } from "../../utils/helpers/helpers";
import { registerCustomerDetailLoad } from "../../utils/data";
import { RegisterPage } from "../../src/pages/delivery/login/register.page";
import { checkoutWithInValidPassword, checkoutWithoutConfirmPassword, checkoutWithoutEmail, checkoutWithoutFirstName, checkoutWithoutLastName, checkoutWithoutPassword, checkoutWithoutPhone } from "../../utils/data/stg/sg/data";

test.describe("Register with negative case", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
    });
    test("1. Register screen is displayed", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)

        await step("Verify the checkout page is displayed", async () => {
            expect(await registerPage.isRegisterpageDisplayed()).toBe(true)
        })
    });
    test("2. Click Create account button without required fields", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutData } = registerCustomerDetailLoad();
        await step("Fill your detail without data", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutData)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('email'), t.registerpage('requireemailmsg'),
            "Assert invalid msg under email field should be: Please fill out this field.")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('firstname'), t.registerpage('requirefirstnamemsg'),
            "Assert invalid msg under firstname field should be: Please fill out this field.")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('lastname'), t.registerpage('requirelastnamemsg'),
            "Assert invalid msg under lastname field should be: Please fill out this field.")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('phonenumber'), t.registerpage('requirephonemsg'),
            "Assert invalid msg under phone field should be: Please fill out this field.")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('password'), t.registerpage('requirepwmsg'),
            "Assert invalid msg under password field should be: Please fill out this field.")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('confirmpassword'), t.registerpage('requireconfirmpwmsg'),
            "Assert invalid msg under confirmpassword field should be: Please fill out this field.")
    });
    test("3. Click Create account button without first name", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutFirstName } = registerCustomerDetailLoad();
        await step("Fill your detail without first name", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutFirstName)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('firstname'), t.registerpage('requirefirstnamemsg'),
            "Assert invalid msg under firstname field should be: Please fill out this field.")
    });
    test("4. Click Create account button without last name", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutLastName } = registerCustomerDetailLoad();
        await step("Fill your detail without last name", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutLastName)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('lastname'), t.registerpage('requirelastnamemsg'),
            "Assert invalid msg under lastname field should be: Please fill out this field.")
    });
    test("5. Click Create account button without phone number", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutPhone } = registerCustomerDetailLoad();
        await step("Fill your detail without phone number", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutPhone)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('phonenumber'), t.registerpage('requirephonemsg'),
            "Assert invalid msg under phone field should be: Please fill out this field.")
    });
    test("6. Click Create account button without email", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutEmail } = registerCustomerDetailLoad();
        await step("Fill your detail without email", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutEmail)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('email'), t.registerpage('requireemailmsg'),
            "Assert invalid msg under email field should be: Please fill out this field.")
    });
    test("7. Click Create account button without password", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutPassword } = registerCustomerDetailLoad();
        await step("Fill your detail without password", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutPassword)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('password'), t.registerpage('requirepwmsg'),
            "Assert invalid msg under password field should be: Please fill out this field.")
    });
    test("8. Click Create account button without confirm password", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithoutConfirmPassword } = registerCustomerDetailLoad();
        await step("Fill your detail without confirm password", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithoutConfirmPassword)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('confirmpassword'), t.registerpage('requireconfirmpwmsg'),
            "Assert invalid msg under confirm password field should be: Please fill out this field.")
    });
    test("9. Click Create account button with invalid password", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const { checkoutWithInValidPassword } = registerCustomerDetailLoad();
        await step("Fill your detail with invalid password", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithInValidPassword)
        })
        await registerPage.click(registerPage.createAccountButton, "Click on Create Account button")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('password'), t.registerpage('invalidpasswordlimitMsg'),
            "Assert invalid limit msg under password field should be: Min. 8 characters")
        await registerPage.assertFeedbackMsg(basicAuthPage, t.registerpage('confirmpassword'), t.registerpage('invalidconfirmpasswordlimitMsg'),
            "Assert invalid limit msg under confirm password field should be: Min. 8 characters")
    });
});
test.describe("Register account successfullly", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
    });
    test("1. Click Create account button with full required fields", async ({ basicAuthPage }) => {
        const registerPage = new RegisterPage(basicAuthPage)
        const myPage = new MyPage(basicAuthPage);
        const { checkoutWithFullData } = registerCustomerDetailLoad();
        await step("Fill your detail with full data", async () => {
            await registerPage.fillCustomerDetailsForm(basicAuthPage, checkoutWithFullData)
        })
        await step("Verify register success by checking mypage displayed", async () => {
            expect(await myPage.isMyPageDisplayed()).toBe(true);
        });
    });
});   