import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/implementing/home/home.page";
import { step } from "allure-js-commons";
import { scrollToBottom } from "../../../utils/helpers";

test.describe("Product Review Section", () => {
    test(`
        1. Click swiper button to navigate review
        2. Navigate to correct URL when clicking on product
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const prodRoot = basicAuthPage.locator(`//div[contains(@class,"AddProductReviews")]//div[contains(@class,"swiper-slide-active")]`)
        const prodImg = prodRoot.locator(`xpath=.//img`)
        const prodViewButton = prodRoot.locator(`xpath=.//button`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.productReviewSection.scrollIntoViewIfNeeded();
        });

        await step("Assert Product Review swiper activity", async () => {
            await homePage.assertProductReviewActivity(basicAuthPage)
        })

        await step("Get product URL", async()=>{
            const proURL = (await homePage.getReviewedProductURL(basicAuthPage)).url

            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodImg, proURL)
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodViewButton, proURL)
        })
    });
});