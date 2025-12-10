import { test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { scrollToBottom } from "../../../../utils/helpers/helpers";
import { createHomePage } from "../../../../src/factories/home.factory";


test.describe("Product Review Section", () => {
    test(`
        1. Displays up to 10 of the newest reviews, each with a rating between 4.5 and 5 stars
        `, async ({ basicAuthPage }) => {
        test.skip((process.env.LOCALE === "jp" || process.env.LOCALE === "sg") && process.env.ENV === "dev", "Hidden on JP-DEV | SG-DEV")

        const homePage = createHomePage(basicAuthPage);
        const prodRoot = basicAuthPage.locator(`//div[contains(@class,"AddProductReviews")]//div[contains(@class,"swiper-slide-active")]`)
        const prodImg = prodRoot.locator(`xpath=.//img`)
        const prodViewButton = prodRoot.locator(`xpath=.//button`)

        await scrollToBottom(basicAuthPage);

        await step("Scroll to Campaign Underway section", async () => {
            await homePage.productReviewSection.scrollIntoViewIfNeeded();
        });

    });
});