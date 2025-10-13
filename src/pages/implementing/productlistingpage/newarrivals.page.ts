import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";

export class NewArrivalsPage extends BasePage {
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

    // =========================
    // ✅ Assertions
    // =========================

}
