import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/delivery/home/home.page";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../utils/data";

test.describe("Banner Activity", () => {
    const { carouselItems } = loadTestData();

    test(`
        1. The number of banners is correct
        2. There is 1 active banner
        3. The href is correct, and each banner contains an image
    `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const carousel = basicAuthPage.locator('//div[contains(@class,"homepage-banner-carouselregion")]');

        await step("Scroll to center banner", async () => {
            await homePage.centerBanner.scrollIntoViewIfNeeded();
        });

        await step("Verify banner items", async () => {
            await homePage.assertCenterBannerDisplayed(carousel, carouselItems);
        });

    });

    test(`4. Click dot button to navigate banner`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const carousel = basicAuthPage.locator('//div[contains(@class,"homepage-banner-carouselregion")]');

        await step("Verify banner active state after clicking dot", async () => {
            await homePage.assertBannerNavigationByDots(basicAuthPage, carousel);
        });
    });

    test(`5. Click banner to navigate to correct URL`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const carousel = '//div[contains(@class,"homepage-banner-carouselregion")]';

        await step("Verify banner navigate to correct URL", async () => {
            await homePage.assertBannerNavigation(basicAuthPage, carousel);
        });
    });
});