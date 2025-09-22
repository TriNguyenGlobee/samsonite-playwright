import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/delivery/home/home.page";
import { step } from "allure-js-commons";
import { recommendedProductItems } from "../../../utils/data";
import { scrollToBottom } from "../../../utils/helpers";

test.describe("Recommended Products Section", () => {
    test(`1. Recommended products are displayed correctly when click side button`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to recommended section", async () => {
            await homePage.recommendedSection.scrollIntoViewIfNeeded();
        });

        await step("Verify recommended products section activity", async () => {
            await homePage.checkRecommendSectionActivity(basicAuthPage, recommendedProductItems);
        });
    });
});