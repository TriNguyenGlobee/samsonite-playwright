import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, PageUtils } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment } from "allure-js-commons";
import { test } from "@playwright/test";

export abstract class OurBrandStoryPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly discoverArticle: Locator;
    readonly discoverSamsonite: Locator;
    readonly discoverLatest: Locator;
    readonly discoverCollection: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator('//div[contains(@id,"category-discover")]');
        this.discoverArticle = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-article")]');
        this.discoverLatest = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-latest")]');
        this.discoverSamsonite = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-about-samsonite")]');
        this.discoverCollection = this.baseLocator.locator('//ul[contains(@class,"dropdown-discover-collection")]');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isOurBrandStoryPageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "our-brand-story/";

            await test.step("Our Brand Story page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.ourbrandstorypage('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.ourbrandstorypage('title'))) {
                return false;
            }

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
