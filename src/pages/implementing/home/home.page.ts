import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t, PageUtils } from "../../../../utils/helpers";
import { step } from "allure-js-commons";
import { Config } from "../../../../config/env.config";
import { test } from "../../../fixtures/test-fixture";
import { assert } from "console";

export class HomePage extends BasePage {
    readonly logoImg: Locator;
    readonly centerBanner: Locator;
    readonly highlightSection: Locator;
    readonly recommendedSection: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.centerBanner = page.locator('//div[contains(@class,"homepage-banner-carouselregion")]');
        this.highlightSection = page.locator('//div[@class="container category-highlight"]');
        this.recommendedSection = page.locator('//div[contains(@class,"category-product initialized-component")]');
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
    // Center banner carousel
    // Verify the number of banners, href, image and text
    async assertCenterBannerDisplayed(
        carouselLocator: Locator,
        expectedItems: CarouselItem[]
    ) {
        await PageUtils.waitForDomAvailable(this.page);
        const realItems = carouselLocator.locator(
            'xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]'
        );

        await test.step(`Verify correct number of real banners, xpath=${realItems.toString()}`, async () => {
            await expect(realItems).toHaveCount(expectedItems.length);
        });

        for (let i = 0; i < expectedItems.length; i++) {
            const item = realItems.nth(i);
            const expected = expectedItems[i];

            if (expected.text) {
                await expect(item, `Banner ${i + 1} does not contain text "${expected.text}"`).toContainText(expected.text);
            }

            if (expected.href) {
                const link = item.locator('xpath=.//a');
                await test.step(`Verify banner ${i + 1} has correct href`, async () => {
                    await expect(link).toHaveAttribute('href', expected.href!);
                });
            }

            if (expected.hasImage) {
                const pic = item.locator('xpath=.//picture//img');
                await test.step(`Verify banner ${i + 1} contains an image`, async () => {
                    await expect(pic).toHaveCount(1);
                });
            }
        }

        const activeItems = this.page.locator(
            '//div[contains(@class,"homepage-banner-carouselregion")]//div[contains(@class,"owl-item") and not(contains(@class,"cloned")) and contains(@class,"active")]'
        );

        const activeCount = await activeItems.count();
        expect(activeCount).toEqual(1);
    }

    // Click dot button to navigate banner
    // Verify dot and banner active state after clicking
    async assertBannerNavigationByDots(
        page: Page,
        carouselRootLocator: Locator
    ) {
        await PageUtils.waitForDomAvailable(this.page);
        await page.waitForTimeout(500);
        const dotButtons = this.page.locator('//button[contains(@class,"owl-dot") and contains(@class,"custom-tracking-onetag-element")]');
        const dotCount = await dotButtons.count();

        const banners = carouselRootLocator.locator(
            'xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]'
        );

        await test.step(`Verify correct number of banners and dots, banner-xpath=${banners.toString()} (${await banners.count()}) and dotbutton-xpath=${dotButtons.toString()} (${dotCount})`, async () => {
            await expect(await banners.count()).toEqual(dotCount);
        });

        for (let i = 0; i < dotCount; i++) {
            const dot = dotButtons.nth(i);

            await dot.click();

            await page.waitForTimeout(500);

            await test.step(`Verify Dot ${i + 1} should be active`, async () => {
                await expect(dot).toHaveClass(/active/);
            });

            const banner = banners.nth(i);
            await test.step(`Verify Banner ${i + 1} should be active`, async () => {
                await expect(banner).toHaveClass(/active/);
            });
        }
    }

    // Click each banner to open link in new tab
    // Verify the link is correct
    async assertBannerNavigation(
        page: Page,
        carouselRootSelector: string
    ) {
        const carousel = page.locator(carouselRootSelector);
        const dotButtons = carousel.locator('//button[contains(@class,"owl-dot") and contains(@class,"custom-tracking-onetag-element")]');
        const banners = carousel.locator('xpath=.//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]');

        const dotCount = await dotButtons.count();
        const bannerCount = await banners.count();

        expect(dotCount).toBe(bannerCount);

        for (let i = 0; i < dotCount; i++) {
            const dot = dotButtons.nth(i);
            const expectedBanner = banners.nth(i);

            await dot.click();

            await expect(expectedBanner).toHaveClass(/active/);

            const link = expectedBanner.locator('a[href]');
            await expect(link).toHaveCount(1);

            const href = await link.getAttribute('href');
            if (!href) {
                console.warn(`Banner ${i + 1} has no href`);
                continue;
            }

            const [newPage] = await Promise.all([
                page.context().waitForEvent('page'),
                link.click({ button: 'middle' }),
            ]);

            await newPage.waitForLoadState('domcontentloaded');
            const currentUrl = newPage.url();

            await expect(currentUrl).toContain(href);

            await newPage.close();
        }
    }

    // Category highlight section
    // Verify the number of items, href, image, English text and Japanese text
    async assertHighlightCategoryItems(page: Page, data: HighlightCategoryItem[]) {
        const cards: Locator = page.locator('//div[contains(@class,"category-hightlight-column")]');

        await expect(cards).toHaveCount(data.length);

        for (let i = 0; i < data.length; i++) {
            const card = cards.nth(i);
            const item = data[i];

            const link = card.locator('a.card-link');
            await expect(link).toHaveAttribute('href', item.href);

            if (item.hasImage) {
                const img = card.locator('xpath=.//picture//img');
                await expect(img).toHaveCount(1);
                const srcAttr = await img.getAttribute('src') || await img.getAttribute('data-src');
                expect(srcAttr).toMatch(/.+\.(jpg|jpeg|png|webp)/);
            }

            const enText = card.locator('p.card-text');
            await expect(enText).toHaveText(item.enText);

            const jaText = card.locator('span');
            await expect(jaText).toHaveText(item.jaText);
        }
    }

    // Click each highlight category item to navigate to correct URL
    // Verify the URL is correct
    async assertHighlightCategoryItemNavigation(
        page: Page,
        data: HighlightCategoryItem[],
        baseUrl: string
    ) {
        for (let i = 0; i < data.length; i++) {
            await page.goto(baseUrl);

            const card = page.locator('//div[contains(@class,"category-hightlight-column")]').nth(i);
            const link = card.locator('a.card-link');

            await Promise.all([
                page.waitForURL(data[i].href, { timeout: 10000 }),
                link.click(),
            ]);

            expect(page.url()).toBe(data[i].href);
        }
    }
}

type CarouselItem = {
    text?: string;
    href?: string;
    hasImage?: boolean;
};

interface HighlightCategoryItem {
    href: string;
    hasImage: boolean;
    enText: string;
    jaText: string;
}
