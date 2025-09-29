import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export abstract class LuggagePage extends BasePage {
    readonly logoImg: Locator;
    readonly baseLocator: Locator;
    readonly luggageType: Locator;
    readonly luggageSize: Locator;
    readonly luggageColor: Locator;
    readonly luggageSmartFeature: Locator;
    readonly luggageBrand: Locator;
    readonly luggageDestination: Locator;
    readonly luggageCollection: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.baseLocator = page.locator(`xpath=.//div[@id="category-luggage"]`);
        this.luggageType = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-type")]`);
        this.luggageSize = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-size")]`);
        this.luggageColor = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-color")]`);
        this.luggageSmartFeature = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-smart-feature")]`);
        this.luggageBrand = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-brand")]`);
        this.luggageDestination = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-destination")]`);
        this.luggageCollection = this.baseLocator.locator(`xpath=.//ul[contains(@class,"dropdown-luggage-collection")]`);
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isLuggagePageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.luggagepage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "luggage/";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking luggage page:', error);
            return false;
        }
    }

    // =========================
    // ✅ Assertions
    // =========================
    abstract assertLuggageListItems(page: Page): Promise<void>;
}
