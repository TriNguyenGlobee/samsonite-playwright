import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";
import { step } from "allure-js-commons";

export class LuggagePage extends BasePage {
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
    async assertLuggageListItems(page: Page): Promise<void> {
        await delay(3000);
        
        const elementsToCheck = [
            this.luggageType,
            this.luggageSize,
            this.luggageColor,
            this.luggageSmartFeature,
            this.luggageBrand,
            this.luggageDestination,
            this.luggageCollection
        ];
        
        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- luggage-type ---
        const typeItems = [
            { text: 'ハード', href: '/luggage/type/hard/' },
            { text: 'ソフト', href: '/luggage/type/soft/' },
            { text: 'アルミ', href: '/luggage/type/aluminium/' },
            { text: 'トランク', href: '/luggage/type/trunk/' },
            { text: 'すべて見る', href: 'https://ssjp.stg.samsonite-asia.com/luggage/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-type', typeItems, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: true,
            checkPictureTag: true
        });

        // --- luggage-size ---
        const sizeItems = [
            { text: 'キャビン／機内持込 1〜3泊', href: 'https://ssjp.stg.samsonite-asia.com/luggage/機内持込' },
            { text: 'ミディアム（中型）4〜6泊', href: 'https://ssjp.stg.samsonite-asia.com/luggage/ミディアム' },
            { text: 'ラージ（大型）1週間以上', href: 'https://ssjp.stg.samsonite-asia.com/luggage/ラージ' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-size', sizeItems, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: false,
            checkPictureTag: true
        });

        // --- luggage-color ---
        const colorItems = [
            {
                text: 'モノトーン',
                href: 'https://ssjp.stg.samsonite-asia.com/luggage/グレー_シルバー_ブラック_ホワイト'
            },
            {
                text: 'クールトーン',
                href: 'https://ssjp.stg.samsonite-asia.com/luggage/グリーン_ネイビー_パープル_ブルー'
            },
            {
                text: 'ウォームトーン',
                href: 'https://ssjp.stg.samsonite-asia.com/luggage/イエロー_オレンジ_ピンク_レッド'
            },
            {
                text: 'Special',
                href: '/%E3%82%B9%E3%83%BC%E3%83%84%E3%82%B1%E3%83%BC%E3%82%B9/%E3%82%AB%E3%83%A9%E3%83%BC/special/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-color', colorItems);

        // --- luggage-smart-feature ---
        const smartFeatureItems = [
            {
                text: 'サスペンションホイール',
                href: '/luggage/smart-feature/suspension-wheels/'
            },
            {
                text: 'ブレーキシステム',
                href: '/luggage/smart-feature/easy-brake-system/'
            },
            {
                text: 'マグネットファスナー',
                href: '/luggage/smart-feature/magnetic-zippers/'
            },
            {
                text: 'USBポート',
                href: '/luggage/smart-feature/usb-port/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-smart-feature', smartFeatureItems);

        // --- luggage-brand ---
        const brandItems = [
            {
                text: 'サムソナイトのスーツケース',
                href: '/luggage/brand/samsonite/'
            },
            {
                text: 'サムソナイト・ブラックレーベルのスーツケース',
                href: '/luggage/brand/samsonite-black/'
            },
            {
                text: 'サムソナイト・レッドのスーツケース',
                href: '/luggage/brand/samsonite-red/'
            },
            {
                text: 'ハートマンのスーツケース',
                href: '/luggage/brand/hartmann/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-brand', brandItems);

        // --- luggage-destination ---
        const destinationItems = [
            {
                text: '都市',
                href: '/luggage/destination/city/'
            },
            {
                text: 'ビーチ',
                href: '/luggage/destination/beach/'
            },
            {
                text: 'アドベンチャー',
                href: '/luggage/destination/adventure/'
            },
            {
                text: 'ビジネス',
                href: '/luggage/destination/business/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-destination', destinationItems);

        // --- luggage-collection ---
        const collectionItems = [
            {
                text: 'パラリュクス',
                href: 'https://ssjp.stg.samsonite-asia.com/collection/%E3%83%91%E3%83%A9%E3%83%AA%E3%83%A5%E3%82%AF%E3%82%B9/'
            },
            {
                text: 'シーライト',
                href: 'https://ssjp.stg.samsonite-asia.com/collection/%E3%82%B7%E3%83%BC%E3%83%A9%E3%82%A4%E3%83%88/'
            },
            {
                text: 'ミンター',
                href: 'https://ssjp.stg.samsonite-asia.com/search?q=minter&srule=predictive-search-sorting&lang=ja_JP'
            },
            {
                text: 'ジップリックスFT',
                href: 'https://ssjp.stg.samsonite-asia.com/collection/%E3%82%B8%E3%83%83%E3%83%97%E3%83%AA%E3%83%83%E3%82%AF%E3%82%B9ft/'
            },
            {
                text: 'リッチモンド 2',
                href: 'https://ssjp.stg.samsonite-asia.com/collection/%E3%83%AA%E3%83%83%E3%83%81%E3%83%A2%E3%83%B3%E3%83%89-2/'
            },
            {
                text: 'COLLECTIONS',
                href: 'https://ssjp.stg.samsonite-asia.com/search?cid=collection'
            }
        ];

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }
}
