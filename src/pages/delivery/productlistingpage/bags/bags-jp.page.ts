import { Page, Locator, expect } from "@playwright/test";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";
import { BagsPage } from "./bags.page";

export class BagsPageJP extends BagsPage {

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
            { text: 'ブリーフケース', href: '/bags/type/briefcase/' },
            { text: '2WAY／3WAY', href: '/bags/type/2-way/' },
            { text: 'レザー', href: '/bags/type/leather/' },
            { text: 'トート', href: '/bags/type/tote/' },
            { text: 'ショルダーバッグ', href: '/bags/type/shoulder-bag/' },
            { text: 'ダッフル', href: '/bags/type/duffles/' },
            { text: 'すべて見る', href: 'https://ssjp.stg.samsonite-asia.com/bags/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-type', typeItems, {
            lastItemIsTextOnly: true
        });

        // --- bag-color ---
        const colorItems = [
            { text: 'モノトーン', href: 'https://ssjp.stg.samsonite-asia.com/bags/グレー_ブラック_ホワイト' },
            { text: 'クールトーン', href: 'https://ssjp.stg.samsonite-asia.com/bags/グリーン_ネイビー_ブルー' },
            { text: 'ウォームトーン', href: 'https://ssjp.stg.samsonite-asia.com/bags/オレンジ_ピンク_レッド' },
            { text: 'すべて見る', href: '/bags/color/all/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-color', colorItems, {
            lastItemIsTextOnly: true
        });

        // --- bag-brand ---
        const brandItems = [
            { text: 'サムソナイトのバッグ', href: '/bags/brand/samsonite/' },
            { text: 'サムソナイト・ブラックレーベルのバッグ', href: '/bags/brand/samsonite-black/' },
            { text: 'サムソナイト・レッドのバッグ', href: '/bags/brand/samsonite-red/' },
            { text: 'ハートマンのバッグ', href: '/bags/brand/hartmann/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-brand', brandItems);

        // --- bag-laptop ---
        const laptopItems = [
            { text: 'Fit up to 13" laptop', href: '/bags/fit-up-to-13-laptop/' },
            { text: 'Fit up to 15" laptop', href: '/bags/fit-up-to-15-laptop/' },
            { text: 'Fit up to 17" laptop', href: '/bags/fit-up-to-17-laptop/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-laptop', laptopItems);

        // --- bag-collection ---
        const collectionItems = [
            { text: 'サブリム', href: 'https://ssjp.stg.samsonite-asia.com/samsonite-business/sub-lim/' },
            { text: 'エピッド 4', href: '/bags/collection/epid-4/' },
            { text: 'デボネア 5', href: 'https://ssjp.stg.samsonite-asia.com/bags/?cgid=bag&expandable=false&instock=false&page=3&prefn1=collection&prefv1=デボネア+5&sz=18&useNewPLP=true' },
            { text: 'ホクストン', href: 'https://ssjp.stg.samsonite-asia.com/bags/?cgid=bag&expandable=false&instock=false&page=1&prefn1=collection&prefv1=ホクストン&start=0&sz=18&useNewPLP=true' },
            { text: 'グレンデール', href: '/bags/collection/glendale/' },
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'bag-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}
