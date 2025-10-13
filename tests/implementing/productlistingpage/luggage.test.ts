import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { LuggagePage } from "../../../src/pages/implementing/productlistingpage/luggage.page";

test.describe("Luggage Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('luggage', "Go to Luggage page")
    })

    test(`
        1. Assert that the Luggage page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const luggagepage = new LuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Verity Luggage page URL", async () => {
            await luggagepage.assertUrl(t.luggagepage('url'), "Assert Luggage page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })
        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Luggage page");
        }
    })
});

test.describe("Luggage Type", async () => {
    test(`
        1. Go to Hardside Type
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = new LuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hardside type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('hardside')}`,
                "Go to Luggage -> Type -> Hardside"
            )
        })

        await step("Verity Hardside type URL", async () => {
            await luggagepage.assertUrl(/luggage\/(?:type\/hard|hardside)\/?$/, "Assert Hardside type URL")
        })

        await step("Click In-stock checkbox", async () => {
            await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hardside type page");
        }
    })

    test(`
        5. Go to Softside Type
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = new LuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Softside type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('softside')}`,
                "Go to Luggage -> Type -> Softside"
            )
        })

        await step("Verity Softside type URL", async () => {
            await luggagepage.assertUrl(/luggage\/(?:type\/soft|softside)\/?$/, "Assert Softside type URL")
        })

        await step("Click In-stock checkbox", async () => {
            await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Softside type page");
        }
    })

    test(`
        9. Go to Aluminium Type
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = new LuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Aluminium type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('aluminium')}`,
                "Go to Luggage -> Type -> Aluminium"
            )
        })

        await step("Verity Aluminium type URL", async () => {
            await luggagepage.assertUrl(/luggage\/(?:type\/aluminium)\/?$/, "Assert Aluminium type URL")
        })

        await step("Click In-stock checkbox", async () => {
            await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Aluminium type page");
        }
    })

    tests(["jp"], `
        13. Go to Trunk Type
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = new LuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Trunk type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('trunk')}`,
                "Go to Luggage -> Type -> Trunk"
            )
        })

        await step("Verity Trunk type URL", async () => {
            await luggagepage.assertUrl(/luggage\/(?:type\/trunk)\/?$/, "Assert Trunk type URL")
        })

        await step("Click In-stock checkbox", async () => {
            await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on trunk type page");
        }
    })

    test(`
        17. Go to Shop all luggage
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = new LuggagePage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all luggage", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('shopallluggage')}`,
                "Go to Luggage -> Type -> Shop all luggage"
            )
        })

        await step("Verity Shop all luggage type URL", async () => {
            await luggagepage.assertUrl(`${t.luggagepage('url')}`, "Assert Shop all luggage URL")
        })

        await step("Click In-stock checkbox", async () => {
            await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await luggagepage.assertHidden(luggagepage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await luggagepage.noAvailableProdMsg.isVisible()

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
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all luggage page");
        }
    })
})