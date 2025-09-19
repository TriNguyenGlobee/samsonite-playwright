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

        await step("Verify Product Review swiper activity", async () => {
            await homePage.assertProductReviewActivity(basicAuthPage)
        })

        await step("Verify navigate to correct URL when clicking on product", async()=>{
            const prodURL = (await homePage.getReviewedProductURL(basicAuthPage)).url

            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodImg, prodURL)
            await homePage.assertNavigatedURLByClickLocator(basicAuthPage, prodViewButton, prodURL)
        })
    });
});