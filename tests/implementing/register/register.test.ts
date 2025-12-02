import { test, expect } from "../../../src/fixtures/test-fixture"
import { step } from "allure-js-commons";
import { createLoginPage } from "../../../src/factories/login.factory";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { t } from "../../../utils/helpers/helpers";

test.describe("Register form is displayed", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`
        1. All fields are displayed
        2. Submit form with blank form`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)

        await step('Verify that all fields are displayed', async () => {
            await registerpage.isRegisterpageDisplayed()
        })

        await step('Clicking on create account button', async () => {
            await registerpage.click(registerpage.createAccountButton,
                "Submit Create Account button"
            )
        })

        await step('Verify that required messages are displayed', async () => {
            await registerpage.assertDropdownFeedbackMsg('registration-form-title', t.registerpage('titlemsg'),
                "Assert feedback msg under title dropdown")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('firstname'), t.registerpage('fnamemsg'),
                "Assert feedback msg under firstname field")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('lastname'), t.registerpage('lnamemsg'),
                "Assert feedback msg under lastname field")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('phonenumber'), t.registerpage('phonemsg'),
                "Assert feedback msg under phonenumber field")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('email'), t.registerpage('emailmsg'),
                "Assert feedback msg under email field")

            await registerpage.assertFieldFeedbackMsg(t.registerpage('password'), t.registerpage('pwmsg'),
                "Assert feedback msg under password field")
        })
    })
})

test.describe("Clicking create account button with invalid information", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step('Register page', async () => {
            await loginPage.goToLoginRegisterPage();
            await loginPage.goToRegisterPage()
        })
    });

    test(`Submit create account button without selecting gender`, async ({ basicAuthPage }) => {
        const registerpage = new RegisterPage(basicAuthPage)

        await step('Fill information to form', async () => {
            await registerpage.fillRegisterForm({
                gender: "",
                firstname: "Tri",
                lastname: "Nguyen",
                phone: "0987654321",
                day: "22",
                month: "8",
                year: "1995",
                email: "tri.test@example.com",
                password: "Test@123",
                confirmPassword: "Test@123",
            })
        })

        await step('Click Create Account button', async () => {
            await registerpage.click(registerpage.createAccountButton)
        })

        await step('Verify that title feedback msg', async () => {
            await registerpage.assertDropdownFeedbackMsg('registration-form-title', t.registerpage('titlemsg'),
                "Assert feedback msg under title dropdown")
        })
    })
})