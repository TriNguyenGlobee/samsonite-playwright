import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { t } from "../../../../utils/helpers";
import { Config } from "../../../../config/env.config";

export class LoginPage extends BasePage {
    readonly signinTitle: Locator;
    readonly loginmsg: Locator;
    readonly emailTextbox: Locator;
    readonly passwordTextbox: Locator;
    readonly signInButton: Locator;
    readonly forgotPWLink: Locator;
    readonly signinWithEmailButton: Locator;
    readonly signinWithFbButton: Locator;
    readonly signinWithGGButton: Locator;
    readonly orSignInLabel: Locator;
    readonly newCustomerLabel: Locator;
    readonly emailSignUpButton: Locator;
    readonly memberNotifyMsg: Locator;

    constructor(page: Page) {
        super(page);
        this.signinTitle = page.locator(`//div[@class="title-contain"]//h2[normalize-space(text())="${t.loginpage('singinTitle')}"]`);
        this.loginmsg = page.locator(`//div[@class="login-msg" and text()="${t.loginpage('loginmsg')}"]`);
        this.emailTextbox = page.locator(`//div[label[normalize-space(.)="${t.loginpage('usernamelabel')}"]]//input[@id="login-form-email"]`);
        this.passwordTextbox = page.locator(`//div[label[normalize-space(.)="${t.loginpage('pwlabel')}"]]//input[@id="login-form-password"]`);
        this.signInButton = page.locator(`//button[@type="submit" and normalize-space(text())="${t.loginpage('signinbtn')}"]`);
        this.forgotPWLink = page.locator(`//a[@title="${t.loginpage('forgotPW')}"]`);
        this.signinWithEmailButton = page.locator(`//a[normalize-space(text())="${t.loginpage('signinwithemail')}"]`);
        this.signinWithFbButton = page.locator(`//a[normalize-space(text())="SIGN IN WITH FACEBOOK"]`);
        this.signinWithGGButton = page.locator(`//a[normalize-space(text())="${t.loginpage('signinwithgoogle')}"]`);
        this.orSignInLabel = page.locator(`//div[@class="or-sign-in" and normalize-space(text())="${t.loginpage('orsigninlabel')}"]`);
        this.newCustomerLabel = page.locator(`//form[@class="login-oauth"][p[normalize-space(text())="${t.loginpage('newcustomerlabel')}"]]`);
        this.emailSignUpButton = page.locator(`//div[contains(@class,"email-login")][a[normalize-space(text())="${t.loginpage('emailsignup')}"]]`);
        this.memberNotifyMsg = page.locator(`//div[@class="member-notify-message" and contains(., "新規会員登録し") and contains(., "サムソナイト") and contains(., "エクスプローラープログラム") and contains(., "のメンバーになると送料無料")]`);
    }

    // =========================
    // 🚀 Actions
    // =========================
    async login(username: string, password: string) {
        await step(`Type username: ${username}`, async () => {
            await this.type(this.emailTextbox, username, "Type username");
        });

        await step(`Type password`, async () => {
            await this.type(this.passwordTextbox, password, "Type password");
        });

        await step(`Click login button`, async () => {
            await this.click(this.signInButton, "Click login button");
        });
    }

    async goToForgotPasswordPage(): Promise<void> {
        await this.click(this.forgotPWLink, "Click forgot password link");
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isLoginPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.loginpage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "login";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.signinTitle,
                this.loginmsg,
                this.emailTextbox,
                this.passwordTextbox,
                this.signInButton,
                this.forgotPWLink,
                this.signinWithEmailButton,
                this.signinWithGGButton,
                this.orSignInLabel,
                this.newCustomerLabel,
                this.emailSignUpButton,
                this.memberNotifyMsg,
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) return false;
            }

            return true;
        } catch (error) {
            console.error('Error checking homepage:', error);
            return false;
        }
    }
    // =========================
    // ✅ Assertions
    // =========================
}
