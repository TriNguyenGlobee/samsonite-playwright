import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { OffersPage } from "../../../src/pages/delivery/productlistingpage/offers/offers.page"
import { SalePage } from "../../../src/pages/delivery/productlistingpage/sale/sale.page";

test.describe("Offers Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('offers', "Go to Offers page")
    })

    test(`
        1. Assert that the Offers/Sale page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const offerspage = new OffersPage(basicAuthPage)
        const salepage = new SalePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1
        const expectedOffersURL = t.offers('url')
        const expectedSaleURL = t.sale('url')

        await steps(["sg"], "Verity Offers page URL", async () => {
            await offerspage.assertUrl(expectedOffersURL.toString(), "Assert Offers page URL")
        })

        await steps(["jp"], "Verity Sale page URL", async () => {
            await salepage.assertUrl(expectedSaleURL.toString(), "Assert Sale page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await offerspage.productTableShow.isVisible()) {
                await offerspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await offerspage.assertHidden(offerspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await offerspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await offerspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Offers/Sale page");
        }
    })
});

test.describe("Refer a Friend", async () => {
    tests(["sg"],`
        1. Go to Refer a Friend page
        `, async ({ loggedInPage }) => {
        const homepage = createHomePage(loggedInPage)
        const offerspage = new OffersPage(loggedInPage)
        const pdppage = new PDPPage(loggedInPage)
        const cartpage = createCartPage(loggedInPage)
        const minicartpage = createMinicartPage(loggedInPage)
        const amount = 1

        await step("Go to Refer a Friend type", async () => {
            await PageUtils.waitForPageLoad(loggedInPage)
            await homepage.selectSamsoniteMenuItem(loggedInPage, `${t.menuItem('offers')}->${t.lv2MenuItem('referAFriend')}`,
                "Go to Offers -> Refer a Friend"
            )
        })

        await step("Verity Refer a Friend URL", async () => {
            await offerspage.assertUrl(/referralshow\/?$/, "Assert Refer a Friend URL")
        })
    })
})