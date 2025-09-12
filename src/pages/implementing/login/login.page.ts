import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { t } from "../../../../utils/helpers";
import { Config } from "../../../../config/env.config";
import { PageUtils } from "../../../../utils/helpers";

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
    readonly memberLink: Locator;
    readonly invalidEmailMsg: Locator;
    readonly alertMsg: Locator;
    readonly requireemailmsg: Locator;
    readonly requirepwmsg: Locator;
    readonly signInByEmailLinkPopup: Locator;
    readonly popupTitle: Locator;
    readonly popupEmailTextbox: Locator;
    readonly popupSendEmailButton: Locator;
    readonly popupCloseButton: Locator;
    readonly popupRequireEmailMsg: Locator;
    readonly popupInvalidEmailMsg: Locator;
    readonly popupRequireCaptchaMsg: Locator;
    readonly gogleEmailTextbox: Locator;
    readonly gogleNextButton: Locator;
    readonly goglePasswordTextbox: Locator;
    readonly goglePasswordNextButton: Locator;

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
        this.signinWithGGButton = page.locator(`//div[@class="login-oauth-container d-none d-sm-block"]//a[normalize-space(text())="${t.loginpage('signinwithgoogle')}"]`);
        this.orSignInLabel = page.locator(`//div[@class="or-sign-in" and normalize-space(text())="${t.loginpage('orsigninlabel')}"]`);
        this.newCustomerLabel = page.locator(`//form[@class="login-oauth"][p[normalize-space(text())="${t.loginpage('newcustomerlabel')}"]]`);
        this.emailSignUpButton = page.locator(`//div[contains(@class,"email-login")][a[normalize-space(text())="${t.loginpage('emailsignup')}"]]`);
        this.memberNotifyMsg = page.locator(`//div[@class="member-notify-message" and contains(., "新規会員登録し") and contains(., "サムソナイト") and contains(., "エクスプローラープログラム") and contains(., "のメンバーになると送料無料")]`);
        this.memberLink = page.locator(`//u[contains(text(),"サムソナイト") and contains(text(),"エクスプローラープログラム")]/parent::a`);
        this.invalidEmailMsg = page.locator(`//div[label[normalize-space(text())="${t.loginpage('usernamelabel')}"]]//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('invalidEmailMsg')}"]`);
        this.alertMsg = page.locator(`//div[@class="alert alert-danger" and text()="${t.loginpage('alertMsg')}"]`);
        this.requireemailmsg = page.locator(`//div[label[normalize-space(text())="${t.loginpage('usernamelabel')}"]]//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('requireemailmsg')}"]`);
        this.requirepwmsg = page.locator(`//div[label[normalize-space(text())="${t.loginpage('pwlabel')}"]]//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('requirepwmsg')}"]`);
        this.signInByEmailLinkPopup = page.locator(`//div[@class="modal-content"]`);
        this.popupTitle = this.signInByEmailLinkPopup.locator(`xpath=.//h2[text()="${t.loginpage('popuptitle')}"]`);
        this.popupEmailTextbox = this.signInByEmailLinkPopup.locator(`xpath=.//div[label[normalize-space(text())="${t.loginpage('popupemailLabel')}"]]//input`);
        this.popupSendEmailButton = this.signInByEmailLinkPopup.locator(`xpath=.//button[normalize-space(text())="${t.loginpage('popupsendemailbtn')}"]`);
        this.popupCloseButton = this.signInByEmailLinkPopup.locator(`xpath=.//button[@aria-label="Close" and not(@class="close")]//span`);
        this.popupRequireEmailMsg = this.signInByEmailLinkPopup.locator(`xpath=.//div[@class="invalid-feedback" and normalize-space(text())="${t.loginpage('popupRequireEmailMsg')}"]`);
        this.popupInvalidEmailMsg = this.signInByEmailLinkPopup.locator(`xpath=.//div[@class="invalid-feedback" and text()="${t.loginpage('popupInvalidEmailMsg')}"]`);
        this.popupRequireCaptchaMsg = this.signInByEmailLinkPopup.locator(`xpath=.//div[@class="recaptcha-section"]//p[text()="${t.loginpage('popupRequireCaptchaMsg')}"]`);
        this.gogleEmailTextbox = page.locator('//input[@type="email" and @aria-label="Email or phone"]');
        this.gogleNextButton = page.locator('//div[@id="identifierNext"]//button');
        this.goglePasswordTextbox = page.locator('//input[@type="password" and @aria-label="Enter your password"]');
        this.goglePasswordNextButton = page.locator('//div[@id="passwordNext"]//button');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async login(username: string, password: string) {
        await step(`Type username: ${username}`, async () => {
            await this.type(this.emailTextbox, username, "Type username");
        });

        await step(`Type password: ${password}`, async () => {
            await this.type(this.passwordTextbox, password, "Type password");
        });

        await step(`Click login button`, async () => {
            await this.click(this.signInButton, "Click login button");
        });

        await PageUtils.waitForPageLoadComplete(this.page);
    }

    async loginByGoogleAccount(googleUsername: string, googlePassword: string) {
        const [googlePage] = await Promise.all([
            this.page.context().waitForEvent('page'),
            this.signinWithGGButton.click(),
        ]);
        await googlePage.waitForLoadState();

        await step(`Type google username: ${googleUsername}`, async () => {
            await this.type(this.gogleEmailTextbox, googleUsername, "Type google username");
        });

        await step("Click google next button after input email", async () => {
            await this.click(this.gogleNextButton, "Click google next button after input email");
        });

        await googlePage.waitForLoadState();

        await step(`Type google password: ${'*'.repeat(googlePassword.length)}`, async () => {
            await this.type(this.goglePasswordTextbox, googlePassword, "Type google password");
        });

        await step("Click google next button after input password", async () => {
            await this.click(this.goglePasswordNextButton, "Click google next button after input password");
        });

        await googlePage.waitForLoadState();
        await PageUtils.waitForPageLoadComplete(this.page);
        await googlePage.close();
    }    

    async goToForgotPasswordPage(): Promise<void> {
        await this.click(this.forgotPWLink, "Click forgot password link");
    }
    /*
    async goToRegisterPage(): Promise<void> {
        await this.click(this.emailSignUpButton, "Click email sign up button");
    }*/

    async goToRegisterPage(): Promise<void> {
        await Promise.all([
            this.page.waitForURL('**/register'),
            this.click(this.emailSignUpButton, "Click email sign up button"),
        ]);
    }

    async goToMembershipPage(): Promise<void> {
        await this.click(this.memberLink, "Click membership link");
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
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking login page:', error);
            return false;
        }
    }

    async isSignInWithEmailLinkPopupDisplayed(): Promise<boolean> {
        try {
            const elementsToCheck = [
                this.popupTitle,
                this.popupEmailTextbox,
                this.popupSendEmailButton,
                this.popupCloseButton
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }

            return true;
        } catch (error) {
            console.error('Error checking sign in with email link popup:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
}
