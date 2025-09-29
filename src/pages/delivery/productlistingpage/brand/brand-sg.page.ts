import { Page, Locator } from "@playwright/test";
import { t, delay } from "../../../../../utils/helpers";
import { BrandPage } from "./brand.page";

export class BrandPageSG extends BrandPage {
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

    // =========================
    // ✅ Assertions
    // =========================
    async assertBrandItems(page: Page): Promise<void> {
        await delay(3000);

        const brandItems = [
            { text: 'Samsonite BLACK LABEL', href: 'https://sssg.stg.samsonite-asia.com/black/' },
            { text: 'Samsonite', href: 'https://sssg.stg.samsonite-asia.com/samsonite/' },
            { text: 'Samsonite RED', href: 'https://sssg.stg.samsonite-asia.com/red/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, undefined, brandItems);
    }

}
