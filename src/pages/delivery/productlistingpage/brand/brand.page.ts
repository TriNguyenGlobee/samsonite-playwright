import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";
import { step } from "allure-js-commons";

export abstract class BrandPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-brand"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isBrandPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.brandpage('title'))) {
                await step(`Check title: ${title}`, async () => {
                    console.log(`Element not visible: ${title}`);
                });
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "brand/";
            if (!currentUrl.startsWith(expectedUrl)) {
                await step(`Current URL: ${currentUrl}`, async () => {
                    console.log(`Current: ${currentUrl}` + ` Expected: ${expectedUrl}`);
                });
                return false;
            }
            return true;
        } catch (error) {
            console.error('Error checking brand page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertBrandItems(page: Page): Promise<void>;

}
