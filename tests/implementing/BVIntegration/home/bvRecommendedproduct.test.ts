import { test } from "../../../../src/fixtures/test-fixture";
import { createHomePage } from "../../../../src/factories/home.factory";
import { step } from "allure-js-commons";
import { loadTestData } from "../../../../utils/data";
import { scrollToBottom } from "../../../../utils/helpers/helpers";

test.describe("Recommended Products Section", () => {
    test(`1. Rating stars and review count under products are displayed`, async ({ basicAuthPage }) => {
        const { recommendedProductItems } = loadTestData()

        const homePage = createHomePage(basicAuthPage);

        await scrollToBottom(basicAuthPage);

        await step("Scroll to recommended section", async () => {
            await homePage.recommendedSection.scrollIntoViewIfNeeded();
        });

        
    });
});