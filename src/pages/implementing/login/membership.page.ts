import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers";
import { Config } from "../../../../config/env.config";

export class MembershipPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[contains(@class,"register-banner")]//h2[@class="page-title" and normalize-space(text())="${t.registerpage('pageTitle')}"]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMembershippageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.membershippage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "MembershipPrivilegePage.html";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.pageTitle,
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
