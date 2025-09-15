import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export class BackpacksPage extends BasePage {
    readonly logoImg: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isBackpacksPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.backpackspage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "backpacks/";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking backpacks page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
