import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";

export class GlobalNavFooterPage extends BasePage {
    readonly navFooter: Locator;
    readonly emailTextbox: Locator;
    readonly subscribeButton: Locator;

    constructor(page: Page) {
        super(page);
        this.navFooter = page.locator('//footer[@id="footer"]');
        this.emailTextbox = this.navFooter.locator('xpath=.//input[@id="newsletter_email"]')
        this.subscribeButton = this.navFooter.locator(`xpath=.//button[@type="submit"]`)
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMembershipPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.membershippage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "MembershipPrivilegePage.html";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking membership page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================

}
