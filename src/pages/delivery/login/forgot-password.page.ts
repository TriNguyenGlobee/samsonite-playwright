import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";

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
            const expectedTitle = t.forgotpasswordpage('title');
            await this.page.waitForFunction(
                (expected) => document.title.includes(expected),
                expectedTitle
            );
            const title = await this.page.title();
            if (!title.includes(t.forgotpasswordpage('title'))) {
                await step(`Received title: ${title} - Expected title: ${t.forgotpasswordpage('title')}`, async () => {}); 
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "passwordreset";
            if (!currentUrl.startsWith(expectedUrl)) {
                await step(`Received URL: ${currentUrl} - Expected URL: ${expectedUrl}`, async () => {}); 
                return false;
            }

            const elementsToCheck = [
                this.pageTitle,
                this.instructionMsg,
                this.emailTextbox,
                this.submitButton
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
            console.error('Error checking forgot password page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
