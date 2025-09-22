import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/delivery/home/home.page";
import { step } from "allure-js-commons";
import { hightlightCategoryItems } from "../../../utils/data";

test.describe("Highlight category", () => {
    test(`1. Highlight category section is displayed with full information`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);

        await step("Scroll to highlight section", async () => {
            await homePage.highlightSection.scrollIntoViewIfNeeded();
        });

        await step("Verify highlight category items displayed correctly", async () => {
            await homePage.assertHighlightCategoryItems(basicAuthPage, hightlightCategoryItems);
        });
    });

    test(`2. Click highlight category item to navigate to correct URL`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const baseUrl = basicAuthPage.url();

        await step("Verify highlight category item navigation", async () => {
            await homePage.assertHighlightCategoryItemNavigation(basicAuthPage, hightlightCategoryItems, baseUrl);
        });
    });
});