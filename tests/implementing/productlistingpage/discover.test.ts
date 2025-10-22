import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { createOurBrandStoryPage } from "../../../src/factories/productlistingpage/ourbrandstory.factory";

test.describe("Discover/Our Brand Story Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('bags', "Go to Bags page")
    })

    test(`
        1. Assert that the Discover/Our Brand Story page is displayed
        `, async ({ basicAuthPage }) => {
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)
        const expectedURL = t.ourbrandstorypage('url')

        await step("Verity Discover/Our Brand Story page URL", async () => {
            await ourbrandstorypage.assertUrl(expectedURL.toString(), "Assert Discover/Our Brand Story page URL")
        })
    })
});

test.describe("Discover latest", async () => {
    test(`
        1. Go to Fathers day gifts page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Father day gifts type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('fathersday')}`,
                "Discover -> Latest -> Father's day gifts"
            )
        })

        await step("Verity Father day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/fathers-day-gifts/, "Assert Father day gifts URL")
        })
    })

    tests(["sg"],`
        1. Go to Mothers day gifts page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Mothers day gifts type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('mothersday')}`,
                "Discover -> Latest -> Mother's day gifts"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/mothers-day-gifts/, "Assert Mothers day gifts URL")
        })
    })
})