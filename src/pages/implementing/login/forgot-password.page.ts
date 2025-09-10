import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers";
import { Config } from "../../../../config/env.config";

export class ForgotPasswordPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;
    readonly instructionMsg: Locator;
    readonly emailTextbox: Locator;
    readonly submitButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[@class="title-contain"][h1[normalize-space(text())="${t.forgotpasswordpage('pageTitle')}"]]`);
        this.instructionMsg = page.locator(`//div[@class="request-password-body"][p[normalize-space(text())="${t.forgotpasswordpage('instructionMsg')}"]]`);
        this.emailTextbox = page.locator(`//div[label[normalize-space(text())="${t.forgotpasswordpage('emailTextbox')}"]]//input`);
        this.submitButton = page.locator(`//button[normalize-space(text())="${t.forgotpasswordpage('submitbutton')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isForgotPasswordpageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.forgotpasswordpage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "passwordreset";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.pageTitle,
                this.instructionMsg,
                this.emailTextbox,
                this.submitButton
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
