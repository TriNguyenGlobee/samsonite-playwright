import { expect, test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../../src/factories/home.factory";
import { PageUtils, t } from "../../../../utils/helpers/helpers";
import { NewArrivalsPage } from "../../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";

test.describe("Product Listing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")
    })

    test(`
        1. Rating stars and review count under products are displayed
        `, async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const expectedURL = t.newarrivalspage('url')

        await step("Verity new arrival page URL", async () => {
            await newarrivalspage.assertUrl(expectedURL.toString(), "Assert New Arrivals page URL")
        })
    })
});
