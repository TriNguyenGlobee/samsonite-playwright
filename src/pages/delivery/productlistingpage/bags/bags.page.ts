import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export abstract class BagsPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly bagType: Locator;
    readonly bagColor: Locator;
    readonly bagBrand: Locator;
    readonly bagLaptop: Locator;
    readonly bagCollection: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-bag"]`);
        this.bagType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-type")]`);
        this.bagColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-color")]`);
        this.bagBrand = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-brand")]`);
        this.bagLaptop = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-laptop")]`);
        this.bagCollection = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-bag-collection")]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isBagsPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.bagspage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "bags/";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking bags page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertBagsListItems(page: Page): Promise<void>;

}
