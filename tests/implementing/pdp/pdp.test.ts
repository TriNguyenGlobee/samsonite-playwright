import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { PDPPage } from "../../../src/pages/implementing/pdp/pdp.page";
import { extractNumber } from "../../../utils/helpers";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { Config } from "../../../config/env.config";

test.describe("PDP is shown correctly", async () => {
    const prodIndex = 1
    let prodName: string | null, pdpProdName: string | null
    let prodCollection: string | null, pdpProdCollection: string | null
    let prodPrice: any, pdpProdPrice: any
    let promotionMsg: string | null, pdpPromotionMsg: string | null

    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)

        await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")

        prodName = await homepage.getProdName(prodIndex)
        prodCollection = await homepage.getProdCollection(prodIndex)
        prodPrice = await extractNumber(await homepage.getProdPrice(prodIndex))
        promotionMsg = await newarrivalspage.getPromotionMessage(prodIndex)

        await newarrivalspage.selectProdByIndex(prodIndex, "Click on first-product on New Arrivals page")
        pdpProdName = await newarrivalspage.getText(pdppage.prodName)
        pdpProdCollection = await newarrivalspage.getText(pdppage.prodCollecton)
        pdpProdPrice = await extractNumber((await newarrivalspage.getText(pdppage.prodPrice)) as string)
        pdpPromotionMsg = await pdppage.getPromotionMessage()
    });

    test(`
        1. PDP is displayed
        2. Product main information
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)

        await step("Verify the PDP is displayed", async () => {
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })

        await step("Verify the main information is correct", async () => {
            await pdppage.assertEqual(pdpPromotionMsg, promotionMsg, "Assert that the Promotion Message is displayed correctly")
            await pdppage.assertEqual(pdpProdName, prodName, "Assert that the Product name is displayed correctly")
            await pdppage.assertEqual(pdpProdCollection, prodCollection, "Assert that the Product collection is displayed correctly")
            await pdppage.assertEqual(pdpProdPrice, prodPrice, "Assert that the Product price is displayed correctly")
        })
    })

    test(`
        1. Minicart is displayed when clicking on Add to cart button
        2. Navigate to checkoutlogin page by clicking on Buy now button
        3. Navigate to Amazone page by clicking on Amazone pay button
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)
        const minicart = createMinicartPage(basicAuthPage)

        await step('Verify the minicart is displayed after clicking on Add to cart button', async () => {
            await Promise.all([
                pdppage.click(pdppage.addToCartButton, "Click on Add to cart button"),
                expect(minicart.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step('Verify the checkout login page is displayed when clicking on Buy now button', async () => {
            await pdppage.assertNavigatedURLByClickLocator(basicAuthPage, pdppage.buyNowButton, `${Config.baseURL}checkoutlogin`,
                "Click on Buy now button and check Checkout Login page is displayed"
            )
        })

        if (process.env.LOCALE === 'jp') {
            await step('Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
                await pdppage.click(pdppage.amazonePayButton, "Click on Amazone pay button")
                await pdppage.assertUrl(/amazon\.co\.jp/)
            })
        }
    })
})

test.describe("Breadcrumb", () => {
    const prodIndex = 1
    let prodName: string;

    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)

        await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")

        prodName = (await homepage.getProdName(prodIndex)).trim()

        await newarrivalspage.selectProdByIndex(prodIndex, "Click on first-product on New Arrivals page")
    });

    test(`
        1. Breadcrumb navigation
        2. Breadcrumb product name
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)
        const breadcrumbFirstItem = pdppage.breadcrumbItem.first()
        const breadcrumbSecondItem = pdppage.breadcrumbItem.nth(1)
        const breadcrumbItemURL = await pdppage.getLocatorURL(breadcrumbFirstItem)
        const breadcrumbProdName = (await pdppage.getText(breadcrumbSecondItem))?.trim()

        await step("Click on breadcrumb item and verify the navigated URL", async () => {
            await pdppage.assertNavigatedURLByClickLocator(basicAuthPage, breadcrumbFirstItem, breadcrumbItemURL!)
        });

        await step("Verify the breadcrumb product name", async () => {
            expect(breadcrumbProdName).toBe(prodName)
        })
    });
});
