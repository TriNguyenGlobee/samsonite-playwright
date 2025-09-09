import { test, expect } from "../../src/fixtures/test-fixture";
import { HomePage } from "../../src/pages/home/home.page";
import { Config } from "../../config/env.config";
import { step } from "allure-js-commons";

test.describe("Home Tests", () => {
    test("home page is displayed", async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);

        await step("Verify that the Home page is displayed", async () => {
            expect(await homePage.isHomepageDisplayed()).toBe(true);
        });
    });

    test("go to New Arrivals page", async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);

        await step("Go to New Arrivals Page", async ()=>{
            await homePage.clickMenuItem("newArrivals");
        });

    });
});
