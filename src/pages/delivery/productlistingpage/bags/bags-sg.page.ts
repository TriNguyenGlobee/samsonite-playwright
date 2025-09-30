import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers";
import { BagsPage } from "./bags.page";

export class BagsPageSG extends BagsPage {

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertBagsListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.bagType,
            this.bagColor,
            this.bagBrand,
            this.bagLaptop,
            this.bagCollection
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- bag-type ---
        const typeItems = [
            { text: 'Briefcase', href: '/bags/briefcase/' },
            { text: 'Cross Body Bags', href: '/bags/cross-body-bags/' },
            { text: 'Duffles', href: '/bags/duffle/' },
            { text: 'Totes', href: '/bags/totes/' },
            { text: 'For Her', href: '/bags/for-her/' },
            { text: 'Shop all bags', href: 'https://sssg.stg.samsonite-asia.com/bags/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-type', typeItems, {
            lastItemIsTextOnly: true
        });

        // --- bag-color ---
        const colorItems = [
            { text: 'Mono', href: 'https://sssg.stg.samsonite-asia.com/bags/black_grey_white' },
            { text: 'Cool', href: 'https://sssg.stg.samsonite-asia.com/bags/blue_green_navy' },
            { text: 'Warm', href: 'https://sssg.stg.samsonite-asia.com/bags/beige_orange_pink_red_yellow' },
            { text: 'Shop all colours', href: '/bags/bags-all-color/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-color', colorItems, {
            lastItemIsTextOnly: true
        });

        // --- bag-brand ---
        const brandItems = [
            { text: 'Samsonite', href: '/bags/brand-samsonite/' },
            { text: 'Samsonite Black', href: '/bags/brand-samsonite-black/' },
            { text: 'Samsonite Red', href: '/bags/brand-samsonite-red/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-brand', brandItems);

        // --- bag-laptop ---
        const laptopItems = [
            { text: 'Fit up to 13" laptop', href: '/bags/fit-up-to-13%22-laptop/' },
            { text: 'Fit up to 15" laptop', href: '/bags/fit-up-to-15%22-laptop/' },
            { text: 'Fit up to 17" laptop', href: '/bags/fit-up-to-17%22-laptop/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-laptop', laptopItems);

        // --- bag-collection ---
        const collectionItems = [
            { text: 'Prudence Eco', href: '/bags/collection/prudence-eco/' },
            { text: 'Pro-Dlx 6', href: '/bags/collection/pro-dlx-6/' },
            { text: 'Sammies Dream', href: '/bags/collection/sammies-dream/' },
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}
