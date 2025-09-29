import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export abstract class BackpacksPage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly backpackType: Locator;
    readonly backpackColor: Locator;
    readonly backpackSmartFunction: Locator;
    readonly backpackBrand: Locator;
    readonly backpackLaptop: Locator;
    readonly backpackCollection: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-backpack"]`);
        this.backpackType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-type")]`);
        this.backpackColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-color")]`);
        this.backpackSmartFunction = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-smart-function")]`);
        this.backpackBrand = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-brand")]`);
        this.backpackLaptop = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-laptop")]`);
        this.backpackCollection = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-backpack-collection")]`);
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
    abstract assertBackpacksListItems(page: Page): Promise<void>;

}
