import { BackpacksPage } from "./backpacks.page";
import { Page, expect } from "@playwright/test";
import { delay, t } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export class BackpacksPageSG extends BackpacksPage {

    // =========================
    // ✅ Assertions
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
    async assertBackpacksListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.backpackType,
            this.backpackColor,
            this.backpackSmartFunction,
            this.backpackBrand,
            this.backpackLaptop,
            this.backpackCollection
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- backpack-type ---
        const typeItems = [
            { text: 'Business Backpacks', href: '/backpacks/business/' },
            { text: 'Casual Backpacks', href: '/backpacks/casual-backpacks/' },
            { text: 'For Her', href: '/backpacks/for-her/' },
            { text: 'For Kids', href: '/backpacks/for-kids/' },
            { text: 'Shop all backpacks', href: 'https://sssg.stg.samsonite-asia.com/backpacks/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-type', typeItems, {
            lastItemIsTextOnly: true
        });

        // --- backpack-color ---
        const colorItems = [
            { text: 'Mono', href: 'https://sssg.stg.samsonite-asia.com/backpacks/black_grey_silver_white' },
            { text: 'Cool', href: 'https://sssg.stg.samsonite-asia.com/backpacks/blue_green_navy_purple' },
            { text: 'Warm', href: 'https://sssg.stg.samsonite-asia.com/backpacks/beige_orange_pink_red_yellow' },
            { text: 'Shop all colours', href: '/backpacks/colour/shop-all-colours/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-color', colorItems, {
            lastItemIsTextOnly: true
        });

        // --- backpack-smart-function ---
        const smartFunctionItems = [
            { text: 'RFID Pocket', href: '/backpack/rfid-pocket/' },
            { text: 'USB Port', href: '/backpack/usb-port/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-smart-function', smartFunctionItems);

        // --- backpack-brand ---
        const brandItems = [
            { text: 'Samsonite', href: '/backpack/brand-samsonite/' },
            { text: 'Samsonite Black', href: '/backpack/brand-samsonite-black/' },
            { text: 'Samsonite Red', href: '/backpack/brand-samsonite-red/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-brand', brandItems);

        // --- backpack-laptop ---
        const laptopItems = [
            { text: 'Fit up to 13" laptop', href: '/backpacks/fit-up-to-13%22-laptop/' },
            { text: 'Fit up to 15" laptop', href: '/backpacks/fit-up-to-15%22-laptop/' },
            { text: 'Fit up to 17" laptop', href: '/backpacks/fit-up-to-17%22-laptop/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-laptop', laptopItems);

        // --- backpack-collection ---
        const collectionItems = [
            { text: 'Sefton', href: '/backpacks/collection/sefton/' },
            { text: 'Pro-Dlx 6', href: '/backpacks/collection/pro-dlx-6/' },
            { text: 'Ecodiver', href: '/backpacks/collection/ecodiver/' },
            { text: 'Sammies Dream', href: '/backpacks/collection/sammies-dream/' },
            { text: 'Prudence Eco', href: '/backpacks/collection/prudence-eco/' },
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}