import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { PDPPage } from "../../../src/pages/implementing/pdp/pdp.page";
import { extractNumber, lazyLoad, scrollToBottom } from "../../../utils/helpers";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { Config } from "../../../config/env.config";
import { t } from "../../../utils/helpers";

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
        3. Product descriptions and detail is shown
        4. User can click on Read more Or Read less
        5. Prod infor tab
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)

        await step("Verify the PDP is displayed", async () => {
            await scrollToBottom(basicAuthPage);
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })

        await step("Verify the main information is correct", async () => {
            await pdppage.assertEqual(pdpPromotionMsg, promotionMsg, "Assert that the Promotion Message is displayed correctly")
            await pdppage.assertEqual(pdpProdName, prodName, "Assert that the Product name is displayed correctly")
            await pdppage.assertEqual(pdpProdCollection, prodCollection, "Assert that the Product collection is displayed correctly")
            await pdppage.assertEqual(pdpProdPrice, prodPrice, "Assert that the Product price is displayed correctly")
        })

        await step("Verify the product descriptions and detail is shown", async () => {
            await pdppage.prodDescriptionsDetail.scrollIntoViewIfNeeded()
            await pdppage.assertVisible(pdppage.prodDescriptionsDetail)
        })

        await step("Verify that users can user Read more and Read less function", async () => {
            const initialState = (await pdppage.getText(pdppage.readMoreLessButton))?.trim()
            await pdppage.assertEqual(initialState, `${t.PDP('readmore')}`, "Assert the initial state is Read more")
            await pdppage.assertHidden(pdppage.longDescription, "Assert long description is hidden")

            await pdppage.click(pdppage.readMoreLessButton, "Click Read more button")

            const currentState = (await pdppage.getText(pdppage.readMoreLessButton))?.trim()
            await pdppage.assertEqual(currentState, `${t.PDP('readless')}`, "Assert the current state is Read less")
            await pdppage.assertVisible(pdppage.longDescription, "Assert long description is visible")
        })

        await step("Verify product information tabs", async () => {
            await pdppage.prodInforTabBar.scrollIntoViewIfNeeded()
            await pdppage.assertInformationTabs(basicAuthPage, "Assert tab is actived when clicking on tabname")
        })
    })

    test(`
        6. Minicart is displayed when clicking on Add to cart button
        7. The number of products increased by one after clicking on Add to cart button
        8. Navigate to checkoutlogin page by clicking on Buy now button
        9. Navigate to Amazone page by clicking on Amazone pay button
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)
        const minicart = createMinicartPage(basicAuthPage)
        const curProdQuantity = await minicart.getNumberOfProducts()

        await step('Verify the minicart is displayed and product quantity', async () => {
            await Promise.all([
                pdppage.click(pdppage.addToCartButton, "Click on Add to cart button"),
                expect(minicart.minicartRender).toBeVisible({ timeout: 5000 }),
            ]);
            await expect(minicart.minicartRender).toBeHidden();
            pdppage.assertEqual(await minicart.getNumberOfProducts(), (curProdQuantity + 1), "Check product quantity after clicking on Add to cart button")
        })

        await step('Verify the checkout login page is displayed when clicking on Buy now button', async () => {
            await pdppage.assertNavigatedURLByClickLocator(basicAuthPage, pdppage.buyNowButton, `${Config.baseURL}checkoutlogin`,
                "Click on Buy now button and check Checkout Login page is displayed", "left"
            )
        })

        if (process.env.LOCALE === 'jp') {
            await step('Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
                await Promise.all([
                    basicAuthPage.waitForURL((newUrl) => newUrl.toString().includes('samsonite'), { timeout: 10000 }),
                    pdppage.goBack("PDP")
                ]);
                await Promise.all([
                    basicAuthPage.waitForURL((newUrl) => newUrl.toString().includes('amazon'), { timeout: 10000 }),
                    pdppage.amazonePayButton.click()
                ]);

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
        2. Breadcrumb-product name
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)
        const breadcrumbFirstItem = pdppage.breadcrumbItem.first()
        const breadcrumbSecondItem = pdppage.breadcrumbItem.nth(1)
        const breadcrumbItemURL = await pdppage.getLocatorURL(breadcrumbFirstItem)
        const breadcrumbProdName = (await pdppage.getText(breadcrumbSecondItem))?.trim()

        await step("Click on breadcrumb item and verify the navigated URL", async () => {
            await pdppage.assertNavigatedURLByClickLocator(basicAuthPage, breadcrumbFirstItem, breadcrumbItemURL!)
        });

        await step("Verify the breadcrumb-product name", async () => {
            expect(breadcrumbProdName).toBe(prodName)
        })
    });
});

test.describe("PDP extra features", () => {
    const prodIndex = 1
    let prodName: string;

    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)

        await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")
        await lazyLoad(basicAuthPage)
        await newarrivalspage.selectRatedProd()
    });

    test(`
        1. User can add product to wishlist
        2. Go to Wishlist page page
        3. User can remove product from wishlist
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)

        await step("Verify that user can add product to wishlist", async () => {
            await Promise.all([
                pdppage.assertAttributeValue(pdppage.wishlistIcon, 'class', 'fa fa-heart',
                    'Assert the wishlist icon status is changed'),
                pdppage.assertText(pdppage.wishlistMsg, `${t.PDP('addedwishlistmsg')}`, 
                    'Assert wishlist modal text'),
                pdppage.click(pdppage.wishlistIcon, "Click on wishlish icon")
            ])
        })

        await step("Verify wishlist page is displayed", async () => {
            await pdppage.click(pdppage.viewWishListButton, "Click on View wishlist button")


        })
    });
});
