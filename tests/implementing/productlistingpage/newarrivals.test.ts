import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";

test.describe("New Arrivals Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('newarrivals')
    })

    test(`
        1. Assert that the New Arrivals page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Verity new arrival page URL", async () => {
            await newarrivalspage.assertUrl(t.newarrivalspage('url'), "Assert New Arrivals page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })

    })
});

test.describe("New Arrivals Level 2 category", async () => {
    tests(["sg"],`
        1. Go to C-Lite Colourburst page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to C-Lite Colourburst page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('C-Lite-Colourburst')}`,
                "Go to New Arrivals -> C-Lite Colourburst"
            )
        })

        await step("Verity C-Lite Colourburst page URL", async () => {
            await newarrivalspage.assertUrl(/c-lite-colourburst/, "Assert C-Lite Colourburst page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })

    tests(["sg"], `
        1. Go to Relyon page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Relyon page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('Relyon')}`,
                "Go to New Arrivals -> Relyon"
            )
        })

        await step("Verity Relyon page URL", async () => {
            await newarrivalspage.assertUrl(/relyon/, "Assert Relyon page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })

    tests(["sg"], `
        1. Go to SBL Signature page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to SBL Signature page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('SBL-Signature')}`,
                "Go to New Arrivals -> SBL Signature"
            )
        })

        await step("Verity SBL Signature page URL", async () => {
            await newarrivalspage.assertUrl(/sbl-signature/, "Assert SBL Signature page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })

    tests(["sg"], `
        1. Go to Audrina page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Audrina page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('Audrina')}`,
                "Go to New Arrivals -> Audrina"
            )
        })

        await step("Verity Audrina page URL", async () => {
            await newarrivalspage.assertUrl(/audrina/, "Assert Audrina page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })

    tests(["sg"], `
        1. Go to SS25 page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to SS25 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('SS25')}`,
                "Go to New Arrivals -> SS25"
            )
        })

        await step("Verity SS25 page URL", async () => {
            await newarrivalspage.assertUrl(/ss25/, "Assert SS25 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })

    tests(["sg"], `
        1. Go to Shop all new arrivals page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all new arrivals page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('showall')}`,
                "Go to New Arrivals -> Shop all new arrivals"
            )
        })

        await step("Verity Shop all new arrivals page URL", async () => {
            await newarrivalspage.assertUrl(/new-arrivals/, "Assert SS25 Shop all new arrivals URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        await step("Verify user can add product to cart", async () => {
            await delay(500)
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async () => {
            await newarrivalspage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })
})