import { test, expect } from "../../../src/fixtures/test-fixture";
import { LoginPage } from "../../../src/pages/delivery/login/login.page";
import { ForgotPasswordPage } from "../../../src/pages/delivery/login/forgot-password.page";
import { RegisterPage } from "../../../src/pages/delivery/login/register.page";
import { MembershipPage } from "../../../src/pages/delivery/login/membership.page";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { HomePage } from "../../../src/pages/delivery/home/home.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t } from "../../../utils/helpers";

test.describe("Logout Completion Screen", () => {
    test(`1. Logout success`, async ({ loggedInPage }) => {
        const myPage = new MyPage(loggedInPage);
        const loginPage = new LoginPage(loggedInPage);

        await step("Logout", async () => {
            await myPage.logout();
        });

        await step("Verify Logout success", async () => {
            expect(await loginPage.isLoginPageDisplayed()).toBe(true);
        });
    });
});
