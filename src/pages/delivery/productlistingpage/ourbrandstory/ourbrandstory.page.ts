import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export abstract class OurBrandStoryPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly discoverArticle: Locator;
    readonly discoverSamsonite: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator('//div[contains(@id,"category-discover")]');
        this.discoverArticle = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-article")]');
        this.discoverSamsonite = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-about-samsonite")]');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isOurBrandStoryPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.ourbrandstorypage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "our-brand-story/";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking our brand story page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertOurBrandStoryListItems(page: Page): Promise<void>;
}
