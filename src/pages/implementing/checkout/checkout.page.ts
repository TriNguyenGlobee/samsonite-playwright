import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t, PageUtils } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step, attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export class CheckoutPage extends BasePage {
    readonly logoImg: Locator;
    readonly customerDetailsSection: Locator;
    readonly firstNameTextbox: Locator;
    readonly lastNameTextbox: Locator;
    readonly emailTextbox: Locator;
    readonly phoneTextbox: Locator;
    readonly continueButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.customerDetailsSection = page.locator(`//div[normalize-space(@class)="customer-details-section"]`)
        this.firstNameTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingFirstName"]`)
        this.lastNameTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingLastName"]`)
        this.emailTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingEmail"]`)
        this.phoneTextbox = this.customerDetailsSection.locator(`xpath=.//input[@id="billingPhoneNumber"]`)
        this.continueButton = this.customerDetailsSection.locator(`xpath=.//button[@type="submit"]`)
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillCheckoutYourDetailForm(page: Page, data: CheckoutYourDetailLoad, description?: string): Promise<void> {
        await step(description || "Fill checkout detail", async () => {
            if (data.firstName) {
                await this.type(this.firstNameTextbox, data.firstName,
                    `Fill firstname textbox: ${data.firstName}`
                )
            }

            if (data.lastName) {
                await this.type(this.lastNameTextbox, data.lastName,
                    `Fill firstname textbox: ${data.lastName}`
                )
            }

            if (data.email) {
                await this.type(this.emailTextbox, data.email,
                    `Fill firstname textbox: ${data.email}`
                )
            }

            if (data.phone) {
                await this.type(this.phoneTextbox, data.phone,
                    `Fill firstname textbox: ${data.phone}`
                )
            }

            if (!data.newsletter) {
                await this.clickCheckboxByLabel(page, t.checkoutpage('newsletter'),
                    `Need to click ${t.checkoutpage('newsletter')} checkbox: ${data.newsletter}`
                )
            }

            if (data.terms) {
                await this.clickCheckboxByLabel(page, t.checkoutpage('terms'),
                    `Need to click ${t.checkoutpage('terms')} checkbox: ${data.terms}`
                )
            }
        })
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isCheckoutPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const expectedTitle = t.checkoutpage('title')
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "checkout?stage=shipping#shipping";

            await test.step("Checkout page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", expectedTitle.toString(), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!expectedTitle.includes(title)) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.firstNameTextbox,
                this.lastNameTextbox,
                this.emailTextbox,
                this.phoneTextbox,
                this.continueButton
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
            console.error('Error checking checkout page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertFeedbackMsg(page: Page, label: string, msg: string, description?: string) {
        await step(description || "Assert invalid feedback under fields", async () => {
            const invalid_msg = this.customerDetailsSection.locator(`//label[normalize-space(text())="${label}"]/following-sibling::div[@class="invalid-feedback"]
            |//div[normalize-space(@class)="customer-details-section"]//label[normalize-space(text())="${label}"]/parent::div//div[@class="invalid-feedback"]`)

            await this.assertText(invalid_msg, msg, `Invalid feedback under ${label} field should be: ${msg}`)
        })
    }

}

export type CheckoutYourDetailLoad = {
    firstName?: string;
    lastName?: string;
    email?: string;
    phone?: string;
    newsletter?: boolean;
    terms?: boolean;
};
