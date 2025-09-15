import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/implementing/home/home.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { NewArrivalsPage } from "../../../src/pages/implementing/productlistingpage/newarrivals/newarrivals.page";
import { LuggagePage } from "../../../src/pages/implementing/productlistingpage/luggage/luggage.page";
import { BackpacksPage } from "../../../src/pages/implementing/productlistingpage/backpacks/backpacks.page";
import { BagsPage } from "../../../src/pages/implementing/productlistingpage/bags/bags.page";
import { BrandPage } from "../../../src/pages/implementing/productlistingpage/brand/brand.page";
import { OurBrandStoryPage } from "../../../src/pages/implementing/productlistingpage/ourbrandstory/ourbrandstory.page";
import { GinzaFlagshipStorePage } from "../../../src/pages/implementing/productlistingpage/ginzaflashipstore/ginzaflagshipstore.page";

test.describe("Home Tests", () => {
    test("Home page is displayed", async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);

        await step("Verify that the Home page is displayed", async () => {
            expect(await homePage.isHomepageDisplayed()).toBe(true);
        });
    });

    test(`
        1. Go to New Arrivals Page
        2. Go to Luggage Page
        3. Go to Back Packs Page
        4. Go to Bags Page
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const newArrivalsPage = new NewArrivalsPage(basicAuthPage);
        const luggagepage = new LuggagePage(basicAuthPage);
        const backpacks = new BackpacksPage(basicAuthPage);
        const bags = new BagsPage(basicAuthPage);

        await step("Go to New Arrivals Page", async ()=>{
            await homePage.clickMenuItem("newarrivals");
        });

        await step("Verify that the New Arrivals page is displayed", async()=>{
            expect(await newArrivalsPage.isNewArrivalspageDisplayed()).toBe(true);
        })

        await step("Go to Luggage Page", async ()=>{
            await homePage.clickMenuItem("luggage");
        });

        await step("Verify that the Luggage page is displayed", async()=>{
            expect(await luggagepage.isLuggagePageDisplayed()).toBe(true);
        })

        await step("Go to Back Packs Page", async ()=>{
            await homePage.clickMenuItem("backpacks");
        });

        await step("Verify that the Back Packs page is displayed", async()=>{
            expect(await backpacks.isBackpacksPageDisplayed()).toBe(true);
        })

        await step("Go to Bags Page", async ()=>{
            await homePage.clickMenuItem("bags");
        });

        await step("Verify that the Bags page is displayed", async()=>{
            expect(await bags.isBagsPageDisplayed()).toBe(true);
        })
    });

    test(`
        5. Go to Brand Page
        6. Go to Our Brand Story Page
        7. Go to Ginza Flagship Store Page
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const brandpage = new BrandPage(basicAuthPage);
        const ourbrandstorypage = new OurBrandStoryPage(basicAuthPage);
        const ginzaflagshipstorepage = new GinzaFlagshipStorePage(basicAuthPage);

        await step("Go to Labels Page", async ()=>{
            await homePage.clickMenuItem("label");
        });

        await step("Verify that the Labels page is displayed", async()=>{
            expect(await brandpage.isBrandPageDisplayed()).toBe(true);
        })
        
        await step("Go to Discover Page", async ()=>{
            await homePage.clickMenuItem("discover");
        });

        await step("Verify that the Discover page is displayed", async()=>{
            expect(await ourbrandstorypage.isOurBrandStoryPageDisplayed()).toBe(true);
        })

        await step("Go to Ginza Flagship Store Page", async ()=>{
            await homePage.clickMenuItem("ginzaflagshipstore");
        });

        await step("Verify that the Ginza Flagship Store page is displayed", async()=>{
            expect(await ginzaflagshipstorepage.isGinzaFlagshipStorePageDisplayed()).toBe(true);
        })
    });
});
