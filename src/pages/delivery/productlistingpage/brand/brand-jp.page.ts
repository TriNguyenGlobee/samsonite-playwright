import { Page, Locator } from "@playwright/test";
import { t, delay } from "../../../../../utils/helpers";
import { BrandPage } from "./brand.page";

export class BrandPageJP extends BrandPage {
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
            { text: 'サムソナイト商品一覧', href: '/brand/samsonite/' },
            { text: 'サムソナイト・ブラックレーベル商品一覧', href: '/brand/samsonite-black/' },
            { text: 'サムソナイト・レッド商品一覧', href: '/brand/samsonite-red/' },
            { text: 'ハートマン商品一覧', href: '/brand/hartmann/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, undefined, brandItems);
    }

}
