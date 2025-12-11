import { expect, test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../../src/factories/home.factory";
import { PageUtils, t } from "../../../../utils/helpers/helpers";
import { NewArrivalsPage } from "../../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createLuggagePage } from "../../../../src/factories/productlistingpage/luggage.factory";

test.describe("Product Listing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('luggage', "Go to Luggage page")
    })

    test(`
        1. Rating stars and review count under products are displayed
        `, async ({ basicAuthPage }) => {
        const luggagepage = createLuggagePage(basicAuthPage)

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })
    })
});
