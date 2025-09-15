import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers";
import { step } from "allure-js-commons";
import { Config } from "../../../../config/env.config";

export class HomePage extends BasePage {
    readonly logoImg: Locator;
    readonly centerBanner: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.centerBanner = page.locator('//div[@class="category-banner"]//img');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isHomepageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.homepage('title'))) {
                await step(`Check visibility of element: ${title.toString()}`, async () => {
                    console.log(`Element not visible: ${title.toString()}`);
                });
                return false;
            }

            const currentUrl = new URL(await this.page.url());
            const baseUrl = new URL(Config.baseURL);

            if (currentUrl.origin !== baseUrl.origin) {
                await step(`Check Url: ${currentUrl}`, async () => {
                    console.log(`Current URL is: ${currentUrl}`);
                });
                return false;
            }

            const path = currentUrl.pathname.replace(/\/+$/, '');
            if (path !== '' && path !== '/home') {
                await step(`Check path: ${path}`, async () => {
                    console.log(`Current path is: ${path}`);
                });
                return false;
            }

            const elementsToCheck = [
                this.newArrivalsMenuItem,
                this.luggageMenuItem,
                this.backPacksMenuItem,
                this.bagsMenuItem,
                this.labelsMenuItem,
                this.discoverMenuItem,
                this.ginzaFlagshipStore,
                this.saleMenuItem,
                this.friendsOfSamsoniteMenuItem,
                this.searchIcon,
                this.wishlistIcon,
                this.loginIcon,
                this.locationIcon,
                this.cartIcon
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
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
