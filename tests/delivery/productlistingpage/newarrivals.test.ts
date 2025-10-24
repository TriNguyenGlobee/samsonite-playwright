import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";

test.describe("New Arrivals Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")
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
        const expectedURL = t.newarrivalspage('url')
        const amount = 1

        await step("Verity new arrival page URL", async () => {
            await newarrivalspage.assertUrl(expectedURL.toString(), "Assert New Arrivals page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })
        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on New Arrivals page");
        }
    })
});

test.describe("New Arrivals Level 2 category", async () => {
    tests(["sg"], `
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
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on C-Lite Colourburst page");
        }
    })

    tests(["sg"], `
        5. Go to Relyon page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
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
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on Relyon page");
        }
    })

    tests(["sg"], `
        9. Go to SBL Signature page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
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
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on SBL Signature page");
        }
    })

    tests(["sg"], `
        13. Go to Audrina page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
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
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on Audrina page");
        }
    })

    tests(["sg"], `
        17. Go to FW25 page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to FW25 page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('fw25')}`,
                "Go to New Arrivals -> FW25"
            )
        })

        await step("Verity FW25 page URL", async () => {
            await newarrivalspage.assertUrl(/fw25/, "Assert FW25 page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on FW25 page");
        }
    })

    tests(["sg","jp"], `
        21. Go to Shop all new arrivals page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all new arrivals page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)

            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('showallnewarrivals')}`,
                "Go to New Arrivals -> Shop all new arrivals"
            )
        })

        await step("Verity Shop all new arrivals page URL", async () => {
            await newarrivalspage.assertUrl(/new-arrivals/, "Assert SS25 Shop all new arrivals URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on all new arrivals page");
        }
    })

    tests(["jp"], `
        25. Go to Espulme page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Espulme page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('espulme')}`,
                "Go to New Arrivals -> Espulme"
            )
        })

        await step("Verity Espulme page URL", async () => {
            await newarrivalspage.assertUrl(/esplum/, "Assert Espulme page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on esplum page");
        }
    })

    tests(["jp"], `
        29. Go to Hartmann tweed page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hartmann tweed page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('hartmann-tweed')}`,
                "Go to New Arrivals -> Hartmann tweed"
            )
        })

        await step("Verity Hartmann tweed page URL", async () => {
            await newarrivalspage.assertUrl(/hartmann-tweed/, "Assert Hartmann tweed page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on Hartmann tweed page");
        }
    })

    tests(["jp"], `
        33. Go to Richmond Ginza page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Richmond Ginza page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('richmondginza')}`,
                "Go to New Arrivals -> Richmond Ginza"
            )
        })

        await step("Verity Richmond Ginza page URL", async () => {
            await newarrivalspage.assertUrl(/richmond2/, "Assert Richmond Ginza page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on Richmond Ginza page");
        }
    })

    tests(["jp"], `
        37. Go to Sub-lim page
        38. In-stock products are displayed when clicking on in-stock checkbox
        39. User can add product to cart
        40. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Sub-lim page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('newarrivals')}->${t.lv2MenuItem('sub-lim')}`,
                "Go to New Arrivals -> Sub-lim"
            )
        })

        await step("Verity Sub-lim page URL", async () => {
            await newarrivalspage.assertUrl(/sub-lim115/, "Assert Sub-lim page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await newarrivalspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await newarrivalspage.assertHidden(newarrivalspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdExist = await newarrivalspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
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
        } else {
            test.skip(true, "No in-stock products found on Sub-lim page");
        }
    })
})