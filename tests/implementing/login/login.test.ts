import { test, expect } from "../../../src/fixtures/test-fixture";
import { LoginPage } from "../../../src/pages/implementing/login/login.page";
import { ForgotPasswordPage } from "../../../src/pages/implementing/login/forgot-password.page";
import { RegisterPage } from "../../../src/pages/implementing/login/register.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";

test.describe("Login Screen", () => {
    test("1. Login page is displayed, 2. Passwordreset screen is displayed", async ({ basicAuthPage }) => {
        const loginPage = new LoginPage(basicAuthPage);
        const forgotPasswordPage = new ForgotPasswordPage(basicAuthPage);
        const registerPage = new RegisterPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Assert Login page displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Go to forgot password page", async()=>{
            await loginPage.goToForgotPasswordPage();
        });

        await step("Assert Forgot Password page displayed", async()=>{
            expect(await forgotPasswordPage.isForgotPasswordpageDisplayed()).toBe(true);
        });

        await step("Goback to Login page", async()=>{
            await forgotPasswordPage.goBack("Login");
        });

        await step("Go to register page", async()=>{
            await loginPage.goToLoginRegisterPage();
        });

        await step("Assert Register page displayed", async()=>{
            expect(await registerPage.isRegisterpageDisplayed()).toBe(true);
        });
    });

    test("", async ({ basicAuthPage }) => {

    });
});
