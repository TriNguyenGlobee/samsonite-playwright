import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";

export class BackpacksPage extends BasePage {
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
            { text: 'レザー', href: '/backpack/type/leather/' },
            { text: 'ナイロン', href: '/backpack/type/nylon/' },
            { text: 'ポリエステル', href: '/backpack/type/polyester/' },
            { text: 'すべて見る', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-type', typeItems, {
            lastItemIsTextOnly: true
        });

        // --- backpack-color ---
        const colorItems = [
            { text: 'モノトーン', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/その他_グレー_ブラック' },
            { text: 'クールトーン', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/グリーン_ネイビー_パープル_ブルー' },
            { text: 'ウォームトーン', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/オレンジ_ピンク' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-color', colorItems);

        // --- backpack-smart-function ---
        const smartFunctionItems = [
            { text: 'USBポート', href: '/backpack/smart-function/usb-port/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-smart-function', smartFunctionItems);

        // --- backpack-brand ---
        const brandItems = [
            { text: 'サムソナイトのバックパック', href: '/backpack/brand/samsonite/' },
            { text: 'サムソナイト・ブラックレーベルのバックパック', href: '/backpack/brand/samsonite-black/' },
            { text: 'サムソナイト・レッドのバックパック', href: '/backpack/brand/samsonite-red/' },
            { text: 'ハートマンのバックパック', href: '/backpack/brand/hartmann/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-brand', brandItems);

        // --- backpack-laptop ---
        const laptopItems = [
            { text: 'Fit up to 13" laptop', href: '/backpacks/fit-up-to-13-laptop/' },
            { text: 'Fit up to 15" laptop', href: '/backpacks/fit-up-to-15-laptop/' },
            { text: 'Fit up to 17" laptop', href: '/backpacks/fit-up-to-17-laptop/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-laptop', laptopItems);

        // --- backpack-collection ---
        const collectionItems = [
            { text: 'サブリム', href: 'https://ssjp.stg.samsonite-asia.com/backpack/collection/sub-lim/' },
            { text: 'テクノス コンボ', href: 'https://ssjp.stg.samsonite-asia.com/collection/%E3%83%86%E3%82%AF%E3%83%8E%E3%82%B9-%E3%82%B3%E3%83%B3%E3%83%9C/' },
            { text: 'アルヴァーノ', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/?cgid=backpack&expandable=false&instock=false&page=0&prefn1=collection&prefv1=アルヴァーノ&start=0&sz=18&useNewPLP=true' },
            { text: 'オードリナ', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/?cgid=backpack&expandable=false&instock=false&page=0&prefn1=collection&prefv1=オードリナ&start=0&sz=18&useNewPLP=true' },
            { text: 'ゼットジップ', href: 'https://ssjp.stg.samsonite-asia.com/backpacks/?cgid=backpack&expandable=false&instock=false&page=0&prefn1=collection&prefv1=ゼットジップ&start=0&sz=18&useNewPLP=true' },
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'backpack-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}
