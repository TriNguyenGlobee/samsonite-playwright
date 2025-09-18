import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/implementing/home/home.page";
import { step } from "allure-js-commons";
import { scrollToBottom } from "../../../utils/helpers";

test.describe("Campaign Underway Section", () => {
    test(`
        1. Left side column displayed
        2. Click left side Image to navigate to correct URL
        3. Right side title is displayed
        4. Click swiper button to navigate the right side product
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const leftSideColumn = basicAuthPage.locator('//div[contains(@class,"magazine-carousel-column-desktop")]//div[contains(@class,"magazine-main-image placeholder-glow")]')
        const href = "/newsdetail?id=news-samsonite-jp-2025-08-13-evoaz-campaign"
        const hasImage = true
        const rightSideTitleText = "EVOA Zキャンペーン開催中。限定色と新モデルが登場"
        const rightSideTitle = basicAuthPage.locator(`//div[@class="magazine-title"]`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.campaignUnderwaysection.scrollIntoViewIfNeeded();
        });

        await step("Verify Left Side Column Info", async () => {
            await homePage.assertLocatorInside(leftSideColumn, { href, hasImage })
        });

        await step("Assert banner navigate to correct URL", async () => {
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, leftSideColumn, href)
        })

        await step(`Assert right side title`, async () => {
            await expect(rightSideTitle).toHaveText(rightSideTitleText)
        })

        await step(`Assert right side swiper activity`, async()=>{
            await homePage.assertRightSideColumnActivity(basicAuthPage)
        })
    });
});