import { Page, Locator, expect } from "@playwright/test";
import { t, delay } from "../../../../../utils/helpers";
import { OurBrandStoryPage } from "./ourbrandstory.page";

export class OurBrandStoryPageSG extends OurBrandStoryPage {
    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================
    async assertOurBrandStoryListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.discoverArticle,
            this.discoverSamsonite
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- discover-article ---
        const articleItems = [
            { text: `Father's Day Gifts`, href: 'https://sssg.stg.samsonite-asia.com/fathers-day-gifts.html' },
            { text: `Mother's Day Gifts`, href: 'https://sssg.stg.samsonite-asia.com/mothers-day-gifts.html' },
            { text: 'Wedding and Honeymoon', href: 'https://sssg.stg.samsonite-asia.com/wedding-and-honeymoon.html' },
            { text: 'Your Business Look', href: 'https://sssg.stg.samsonite-asia.com/your-business-look.html' },
            { text: 'Your Backpack Look', href: 'https://sssg.stg.samsonite-asia.com/your-backpack-look.html' },
            { text: 'Lavish Travels', href: 'https://sssg.stg.samsonite-asia.com/lavish-travels.html' },
            { text: 'The Art of Packing', href: 'https://sssg.stg.samsonite-asia.com/art-of-packing.html' },
            { text: 'The Best Bags for every Travel Need', href: 'https://sssg.stg.samsonite-asia.com/best-bags.html' },
            { text: 'Discover All', href: 'https://sssg.stg.samsonite-asia.com/discover-all' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-latest', articleItems, {
            lastItemIsTextOnly: true
        });

        // --- discover-about-Samsonite ---
        const aboutSamsoniteItems = [
            { text: 'Beyond The Design', href: 'https://sssg.stg.samsonite-asia.com/2025-going-beyond-design/' },
            { text: 'Beyond The Average Test', href: 'https://sssg.stg.samsonite-asia.com/2025-going-beyond-testing/' },
            { text: 'Our Brand Story - Celebrating 115 Years of Heritage', href: 'https://sssg.stg.samsonite-asia.com/brand-story.html' },
            { text: 'Friends of Samsonite', href: 'https://sssg.stg.samsonite-asia.com/2021-friends-of-samsonite.html' },
            { text: 'Our Responsible Journey', href: 'https://sssg.stg.samsonite-asia.com/sustainability.html' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-about-samsonite', aboutSamsoniteItems);

        // --- collections ---
        const collections = [
            { text: 'Browse Our Collections', href: 'https://sssg.stg.samsonite-asia.com/collection/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-collection', collections);
    }
}
