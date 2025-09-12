import { test, expect } from "../../../src/fixtures/test-fixture";
import { LoginPage } from "../../../src/pages/implementing/login/login.page";
import { ForgotPasswordPage } from "../../../src/pages/implementing/login/forgot-password.page";
import { RegisterPage } from "../../../src/pages/implementing/login/register.page";
import { MembershipPage } from "../../../src/pages/implementing/login/membership.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { HomePage } from "../../../src/pages/implementing/home/home.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t } from "../../../utils/helpers";

test.describe("Login Screen", () => {
    test(`
        1. Login page is displayed 
        2. Passwordreset screen is displayed
        3. Register page is displayed
        `, async ({ basicAuthPage }) => {
        const loginPage = new LoginPage(basicAuthPage);
        const forgotPasswordPage = new ForgotPasswordPage(basicAuthPage);
        const registerPage = new RegisterPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Assert Login page displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Go to forgot password page", async () => {
            await loginPage.goToForgotPasswordPage();
        });

        await step("Assert Forgot Password page displayed", async () => {
            expect(await forgotPasswordPage.isForgotPasswordpageDisplayed()).toBe(true);
        });

        await step("Goback to Login page", async () => {
            await forgotPasswordPage.goBack("Login");
        });

        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });

        await step("Assert Register page displayed", async () => {
            expect(await registerPage.isRegisterpageDisplayed()).toBe(true);
        });
    });

    test(`4. Membership page is displayed`, async ({ basicAuthPage }) => {
        const loginPage = new LoginPage(basicAuthPage);
        const membershipPage = new MembershipPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Go to membership page", async () => {
            await loginPage.goToMembershipPage();
        });

        await step("Assert transition to  Membership Privilege Page - URL", async () => {
            expect(await membershipPage.isMembershippageDisplayed()).toBe(true);
        });
    });
});

test.describe('Login by normal email', () => {
    test(`1. Login success`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const loginPage = new LoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);

        await step("Go to login page", async () => {
            await homePage.goToLoginRegisterPage();
        });

        await step("Login with valid email and password", async () => {
            await loginPage.login(Config.credentials.username, Config.credentials.password);
        });

        await step("Assert login success by checking mypage displayed", async () => {
            expect(await myPage.isMyPageDisplayed()).toBe(true);
        });
    });

    test(`
        2. Login with invalid email
        3. Login with wrong account
        4. Login with empty email and password
        `, async ({ basicAuthPage }) => {
        const loginPage = new LoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Login with invalid email and password", async () => {
            await loginPage.login("stgglobeetestssjp1009", "Globee@12345");
        });

        await step("Assert login failure by checking login page is still displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Assert error message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.invalidEmailMsg, "Invalid email message is displayed"));
        });

        await step("Reset username and password fields", async () => {
            await loginPage.emailTextbox.fill("");
            await loginPage.passwordTextbox.fill("");
        });

        await step("Login with wrong email and password", async () => {
            await loginPage.login("stgglobeetestssjp1009@yopmail.com", "Globee@1234578");
        });

        await step("Assert login failure by checking login page is still displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Assert error message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.alertMsg, "Alert message is displayed"));
        });

        await step("Reset username and password fields", async () => {
            await loginPage.emailTextbox.fill("");
            await loginPage.passwordTextbox.fill("");
        });

        await step("Login with empty email and password", async () => {
            await loginPage.login("", "");
        });

        await step("Assert login failure by checking login page is still displayed", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });

        await step("Assert error message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.requireemailmsg, "Email is required message is displayed"));
            expect(await loginPage.assertVisible(loginPage.requirepwmsg, "Password is required message is displayed"));
        });
    });
});

test.describe("Login with email link", () => {
    test(`
        1. SIGN IN WITH EMAIL LINK Popup is displayed
        2. Clicking Send Login Link button without inputing anythings
        3. Clicking Send Login Link button with invalid email
        4. Clicking Send Login Link button without checking captcha
        `, async ({ basicAuthPage }) => {
        const loginPage = new LoginPage(basicAuthPage);
        
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Click on SIGN IN WITH EMAIL LINK button", async () => {
            await loginPage.click(loginPage.signinWithEmailButton, "Click on SIGN IN WITH EMAIL LINK button");
        });

        await step("Assert SIGN IN WITH EMAIL LINK Popup is displayed", async () => {
            expect(await loginPage.isSignInWithEmailLinkPopupDisplayed()).toBe(true);
            await step("Popup is displayed", async () => {
                console.log("SIGN IN WITH EMAIL LINK Popup is displayed");
            });
        });

        await step("Click send login link button", async () => {
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
        });

        await step("Assert require email message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.popupRequireEmailMsg, "Require email message is displayed"));
        });

        await step("Input invalid email and click send login link button", async () => {
            await loginPage.popupEmailTextbox.fill("stgglobeetestssjp1009");
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
        });

        await step("Assert invalid email message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.popupInvalidEmailMsg, "Invalid email message is displayed"));
        });

        await step("Input valid email and click send login link button", async () => {
            await loginPage.popupEmailTextbox.fill(Config.credentials.username);
            await loginPage.click(loginPage.popupSendEmailButton, "Click send login link button");
        });

        await step("Assert require captcha message is displayed", async () => {
            expect(await loginPage.assertVisible(loginPage.popupRequireCaptchaMsg, "Require captcha message is displayed"));
        });
    });
});

test.describe("Login by Google login", () => {
    test(`
        1. SIGN IN WITH GOOGLE Popup is displayed
        2. Login success by Google account
        `, async ({ basicAuthPage }) => {
        const loginPage = new LoginPage(basicAuthPage);
        const myPage = new MyPage(basicAuthPage);
        
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Click on SIGN IN WITH GOOGLE button", async () => {
            await loginPage.loginByGoogleAccount(Config.credentials.gg_username, Config.credentials.gg_password);
        });

        await step("Assert login success by checking mypage displayed", async () => {
            expect(await myPage.isMyPageDisplayed()).toBe(true);
        });
    });
});
