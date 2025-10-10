import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { PageUtils, t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";

export class BrandLandingPage extends BasePage {
    readonly logoImg: Locator;
    readonly activeBanner: Locator;
    readonly hardcaseMenu: Locator;
    readonly softcaseMenu: Locator;
    readonly brandInforSection: Locator;
    readonly brInforToptitle: Locator;
    readonly brInforTitle: Locator;
    readonly brInforContent: Locator;
    readonly brInforButton: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.activeBanner = page.locator(`//div[@class="firstly-content"]//div[@class="owl-stage"]//div[@class="owl-item active"]`)
        this.hardcaseMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-4"]//div[@class="row no-gutters" and .//a[text()="Hardcase"]]`)
        this.softcaseMenu = page.locator(`//div[@class="secondary-content"]//div[@class="col-4"]//div[@class="row no-gutters" and .//a[text()="Softcase"]]`)
        this.brandInforSection = page.locator(`//div[@class="secondary-content"]//div[@class="brand-info"]`)
        this.brInforToptitle = this.brandInforSection.locator(`xpath=.//h4`)
        this.brInforTitle = this.brandInforSection.locator(`xpath=.//h2`)
        this.brInforContent = this.brandInforSection.locator(`xpath=.//p`)
        this.brInforButton = this.brandInforSection.locator(`xpath=.//a[@class="btn"]`)
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================

    // =========================
    // ✅ Assertions
    // =========================

    // Verify the number of banners, href, image
    async assertCenterBannerDisplayed(page: Page, description?: string) {
        await step(description || "Assert center banner is displayed correctly", async () => {
            await PageUtils.waitForPageLoad(page)

            const banners = page.locator('//div[@class="firstly-content"]//div[@class="owl-stage"]//div[contains(@class,"owl-item") and not(contains(@class,"cloned"))]');
            const bannerCount = await banners.count();
            expect(bannerCount).toBeGreaterThan(0);

            await expect(this.activeBanner).toHaveCount(1);

            for (let i = 0; i < bannerCount; i++) {
                const banner = banners.nth(i);
                const img = banner.locator('img');
                await expect(img).toHaveCount(1);
                await expect(img.first()).toHaveAttribute('src', /.+/);
            }

            console.log(`Assert ${bannerCount} banners, with 1 active and all containing images.`);
        })
    }

}
