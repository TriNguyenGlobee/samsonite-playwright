import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers";
import { OurBrandStoryPage } from "./ourbrandstory.page";

export class OurBrandStoryPageJP extends OurBrandStoryPage {

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
            { text: 'Beyond The Design', href: 'https://ssjp.stg.samsonite-asia.com/2025-going-beyond-design/' },
            { text: 'Beyond The Average Test', href: 'https://ssjp.stg.samsonite-asia.com/2025-going-beyond-testing/' },
            { text: '父の日に日々を彩るバッグを', href: 'https://ssjp.stg.samsonite-asia.com/fathers-day-gifts.html' },
            { text: 'ユニークなテストで耐久性を検証', href: 'https://ssjp.stg.samsonite-asia.com/vs-series/' },
            { text: 'スーツケースの選び方', href: 'https://ssjp.stg.samsonite-asia.com/first_suitcase.html' },
            { text: 'スーツケースのパッキング術', href: 'https://ssjp.stg.samsonite-asia.com/category-landing/packing/' },
            { text: '最新おすすめビジネスバッグ', href: 'https://ssjp.stg.samsonite-asia.com/category-landing/business-bags/' },
            { text: '人生を豊かにする旅のスタイル', href: 'https://ssjp.stg.samsonite-asia.com/samsonite-unpack-your-world_mcguffin/unpack-your-world.html' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-articles', articleItems);

        // --- discover-about-Samsonite ---
        const aboutSamsoniteItems = [
            { text: 'サムソナイトブランドストーリー', href: 'https://ssjp.stg.samsonite-asia.com/brand-story.html' },
            { text: 'ハートマンブランドストーリー', href: 'https://ssjp.stg.samsonite-asia.com/about-hartmann.html' },
            { text: 'Our Responsible Journey', href: 'https://ssjp.stg.samsonite-asia.com/sustainability.html' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'dropdown-discover-about-samsonite', aboutSamsoniteItems);
    }
}
