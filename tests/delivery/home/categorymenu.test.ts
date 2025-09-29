import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/delivery/home/home.page";
import { step } from "allure-js-commons";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createLuggagePage } from "../../../src/factories/productlistingpage/luggage.factory";
import { createBackpacksPage } from "../../../src/factories/productlistingpage/backpacks.factory"
import { createBagsPage } from "../../../src/factories/productlistingpage/bags.factory"
import { createBrandPage } from "../../../src/factories/productlistingpage/brand.factory"
import { createOurBrandStoryPage } from "../../../src/factories/productlistingpage/ourbrandstory.factory";

test.describe("Category Menu", () => {
    test("1. All level 2 categories are displayed", async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const newarrivalspage = new NewArrivalsPage(basicAuthPage);
        const luggagepage = createLuggagePage(basicAuthPage);
        const backpackspage = createBackpacksPage(basicAuthPage);
        const bagspage = createBagsPage(basicAuthPage);
        const brandpage = createBrandPage(basicAuthPage);
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage);

        await step("Hover over 'New Arrivals' menu", async () => {
            await homePage.hover(homePage.newArrivalsMenuItem);
        });

        await step("Verify that all categories under 'New Arrivals' are displayed", async () => {
            await newarrivalspage.assertNewArrivalsListItems(basicAuthPage);
        });

        await step("Hover over 'Luggage' menu", async () => {
            await homePage.hover(homePage.luggageMenuItem);
        });

        await step("Verify that all categories under 'Luggage' are displayed", async () => {
            await luggagepage.assertLuggageListItems(basicAuthPage);
        });

        await step("Hover over 'Backpacks' menu", async () => {
            await homePage.hover(homePage.backPacksMenuItem);
        });

        await step("Verify that all categories under 'Backpacks' are displayed", async () => {
            await backpackspage.assertBackpacksListItems(basicAuthPage);
        });

        await step("Hover over 'Bags' menu", async () => {
            await homePage.hover(homePage.bagsMenuItem);
        });

        await step("Verify that all categories under 'Bags' are displayed", async () => {
            await bagspage.assertBagsListItems(basicAuthPage);
        });

        await step("Hover over 'Brand' menu", async () => {
            await homePage.hover(homePage.labelsMenuItem);
        });

        await step("Verify that all categories under 'Brand' are displayed", async () => {
            await brandpage.assertBrandItems(basicAuthPage);
        });

        await step("Hover over 'Discover' menu", async () => {
            await homePage.hover(homePage.discoverMenuItem);
        });

        await step("Verify that all categories under 'Discover' are displayed", async () => {
            await ourbrandstorypage.assertOurBrandStoryListItems(basicAuthPage);
        });
    });
});
