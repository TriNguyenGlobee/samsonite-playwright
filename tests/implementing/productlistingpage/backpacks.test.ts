import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { lazyLoad, PageUtils, t, delay } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { createBackpacksPage } from "../../../src/factories/productlistingpage/backpacks.factory";

test.describe("Backpacks Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('backpacks', "Go to Backpacks page")
    })

    test(`
        1. Assert that the Backpacks page is displayed
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const backpacksPage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1
        const expectedURL = t.backpackspage('url')

        await step("Verity Backpacks page URL", async () => {
            await backpacksPage.assertUrl(expectedURL.toString(), "Assert Backpacks page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpacksPage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpacksPage.assertHidden(backpacksPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })
        const isInStockProdNotExist = await backpacksPage.noAvailableProdMsg.isVisible()

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
                await backpacksPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Backpacks page");
        }
    })
});

test.describe("Backpacks Type", async () => {
    tests(["sg"], `
        1. Go to Business backpacks Type
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpacksPage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Business Backpacks type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('businessbackpacks')}`,
                "Go to Backpacks -> Type -> Business Backpacks"
            )
        })

        await step("Verity Business Backpacks type URL", async () => {
            await backpacksPage.assertUrl(/backpacks\/(business|businessbackpacks)\/?$/, "Assert Business Backpacks type URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpacksPage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")

            await lazyLoad(basicAuthPage)
        })

        await step("Verify notify me button do not exist", async () => {
            await backpacksPage.assertHidden(backpacksPage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpacksPage.noAvailableProdMsg.isVisible()

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
                await backpacksPage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Business Backpacks type page");
        }
    })

    tests(["sg"], `
        5. Go to Casual Backpacks Type
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Casual Backpacks type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('casualbackpacks')}`,
                "Go to Backpacks -> Type -> Casual Backpacks"
            )
        })

        await step("Verity Casual Backpacks type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(casual|casual-backpacks)\/?$/, "Assert Casual Backpacks type URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Backpacks type page");
        }
    })

    tests(["sg"], `
        9. Go to For Her Type
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to For Her type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('forher')}`,
                "Go to Backpacks -> Type -> For Her"
            )
        })

        await step("Verity For Her type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(for-her)\/?$/, "Assert For Her type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on For Her type page");
        }
    })

    tests(["sg"], `
        13. Go to For Kids Type
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to For Kids type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('forkids')}`,
                "Go to Backpacks -> Type -> For Kids"
            )
        })

        await step("Verity For Kids type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(for-kids)\/?$/, "Assert For Kids type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on For Kids type page");
        }
    })

    test(`
        17. Go to Shop all backpacks
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all backpacks", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('shopallbackpacks')}`,
                "Go to Backpacks -> Type -> Shop all backpacks"
            )
        })

        await step("Verity Shop all backpacks type URL", async () => {
            await backpackspage.assertUrl(`${t.backpackspage('url')}`, "Assert Shop all backpacks URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all backpacks page");
        }
    })

    tests(["jp"], `
        21. Go to Leather Type
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Leather type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('leather')}`,
                "Go to Backpacks -> Type -> Leather"
            )
        })

        await step("Verity Leather type URL", async () => {
            await backpackspage.assertUrl(/backpack\/(type\/leather)\/?$/, "Assert Leather type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Leather type page");
        }
    })

    tests(["jp"], `
        25. Go to Nylon Type
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Nylon type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('nylon')}`,
                "Go to Backpacks -> Type -> Nylon"
            )
        })

        await step("Verity Nylon type URL", async () => {
            await backpackspage.assertUrl(/backpack\/(type\/nylon)\/?$/, "Assert Nylon type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Nylon type page");
        }
    })

    tests(["jp"], `
        29. Go to Polyester Type
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Polyester type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('polyester')}`,
                "Go to Backpacks -> Type -> Polyester"
            )
        })

        await step("Verity Polyester type URL", async () => {
            await backpackspage.assertUrl(/backpack\/(type\/polyester)\/?$/, "Assert Polyester type URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Polyester type page");
        }
    })

    tests(["jp"], `
        33. Go to expandable Type
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Woman type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('type')}->${t.lv2MenuItem('woman')}`,
                "Go to Backpacks -> Type -> Woman"
            )
        })

        await step("Verity Woman type URL", async () => {
            await backpackspage.assertUrl(/backpacks?(?:\/expandable)?\/?(?:\?.*)?$/, "Assert Woman type URL");
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Woman type page");
        }
    })
})

test.describe("Backpacks Colours", async () => {
    test(`
        1. Go to Mono color page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to Mono color page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('mono')}`,
                "Go to Backpacks -> Colours -> Mono"
            )
        })

        await step("Verity Mono color page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(black_grey_silver_white|その他_グレー_ブラック)\/?$/, "Assert Mono colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Mono color page");
        }
    })

    test(`
        5. Go to Cool color page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Cool color", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('cool')}`,
                "Go to Backpacks -> Colours -> Cool"
            )
        })

        await step("Verity Softside type URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(blue_green_navy_purple|グリーン_ネイビー_パープル_ブルー)\/?$/, "Assert Cool Color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Cool colours page");
        }
    })

    test(`
        9. Go to Warm color page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Warm colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('warm')}`,
                "Go to Backpacks -> Colours -> Warm"
            )
        })

        await step("Verity Large size page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(beige_orange_pink_red_yellow|オレンジ_ピンク)\/?$/, "Assert Warm color page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Warm colour page");
        }
    })

    tests(["sg"], `
            13. Go to Shop all colours page
            14. In-stock products are displayed when clicking on in-stock checkbox
            15. User can add product to cart
            16. Go to the PDP
            `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Shop all colours page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('color')}->${t.lv2MenuItem('shopallcolour')}`,
                "Go to Backpacks -> Colours -> Shop all colours"
            )
        })

        await step("Verity Large size page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/colour\/shop-all-colours\/?$/, "Assert Shop all colours page URL")
        })

        await step("Click In-stock checkbox", async () => {
            await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                "Checking the In-stock checkbox")
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Shop all colours page");
        }
    })
})

test.describe("Backpacks Smart feature", async () => {
    tests(["sg"], `
        1. Go to RFID Pocket page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const amount = 1

        await step("Go to RFID Pocket page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('RFIDPocket')}`,
                "Go to Backpacks -> Features -> RFID Pocket"
            )
        })

        await step("Verity RFID Pocket page URL", async () => {
            await backpackspage.assertUrl(/backpack\/rfid-pocket/, "Assert RFID Pocket page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart")
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on RFID Pocket page");
        }
    })

    test(`
        5. Go to USB feature page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to USB port", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('features')}->${t.lv2MenuItem('usbport')[1]}`,
                "Go to Backpacks -> Features -> USB Port"
            )
        })

        await step("Verity USB port page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(usb-port|smart-function\/usb-port)\/?$/, "Assert USB port page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on USB port page");
        }
    })
})

test.describe("Backpacks Labels/Brand", async () => {
    test(`
        1. Go to Samsonite page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonite')}[1]`,
                "Go to Backpacks -> Labels/Brand -> Samsonite"
            )
        })

        await step("Verity Samsonite page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(brand-samsonite|brand\/samsonite)\/?$/, "Assert Samsonite page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

        if (!isInStockProdNotExist) {
            await step("Verify user can add product to cart if In-stock product exist", async () => {
                await lazyLoad(basicAuthPage)
                await delay(500)
                await Promise.all([
                    cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite page");
        }
    })

    test(`
        5. Go to Samsonite black page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite black", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsoniteblack')}[1]`,
                "Go to Backpacks -> Labels/Brand -> Samsonite Black"
            )
        })

        await step("Verity Samsonite Black page URL", async () => {
            await backpackspage.assertUrl(/backpack\/(brand-samsonite-black|brand\/samsonite-black)\/?$/, "Assert Samsonite Black page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Black page");
        }
    })

    test(`
        9. Go to Samsonite Red page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Samsonite Red page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('samsonitered')}[1]`,
                "Go to Backpacks -> Labels/Brand -> Samsonite Red"
            )
        })

        await step("Verity Samsonite Red page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(brand-samsonite-red|brand\/samsonite-red)\/?$/, "Assert Samsonite Red page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Samsonite Red page");
        }
    })

    tests(["jp"], `
        13. Go to Hartmann page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const backpackspage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Hartmann page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('backpacks')}->${t.lv2MenuItem('labels')}->${t.lv2MenuItem('hartmann')}[1]`,
                "Go to Backpacks -> Labels/Brand -> Hartmann"
            )
        })

        await step("Verity Hartmann page URL", async () => {
            await backpackspage.assertUrl(/backpacks\/(brand\/hartmann)\/?$/, "Assert Hartmann page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await backpackspage.productTableShow.isVisible()) {
                await backpackspage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await step("Verify notify me button do not exist", async () => {
            await backpackspage.assertHidden(backpackspage.notifyMebutton,
                "Assert the In-stock products are displayed only"
            )
        })

        const isInStockProdNotExist = await backpackspage.noAvailableProdMsg.isVisible()

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
                await backpackspage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Hartmann page");
        }
    })
})

test.describe("Luggage travel type/destination", async () => {
    tests(["jp"], `
        1. Go to City page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to City page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('city')}`,
                "Go to Luggage -> Travel type/Destination -> City"
            )
        })

        await step("Verity City page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(destination\/city)\/?$/, "Assert City page URL")
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
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on City page");
        }
    })

    tests(["sg,jp"], `
        5. Go to Adventure page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Adventure page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('adventure')}`,
                "Go to Luggage -> Travel type/Destination -> Adventure"
            )
        })

        await step("Verity Adventure page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(adventure|destination\/adventure)\/?$/, "Assert Adventure page URL")
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
            test.skip(true, "No in-stock products found on Adventure page");
        }
    })

    tests(["jp"], `
        9. Go to Beach page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Beach page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('beach')}`,
                "Go to Luggage -> Travel type/Destination -> Beach"
            )
        })

        await step("Verity Beach page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(destination\/beach)\/?$/, "Assert Beach page URL")
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
            test.skip(true, "No in-stock products found on Beach page");
        }
    })

    test(`
        13. Go to Business page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Business page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('traveltype')}->${t.lv2MenuItem('business')}`,
                "Go to Luggage -> Tranvel Type/Destination -> Business"
            )
        })

        await step("Verity Business page URL", async () => {
            await luggagepage.assertUrl(/luggage\/(business|destination\/business)\/?$/, "Assert business page URL")
        })

        await step("Click In-stock checkbox", async () => {
            if (await luggagepage.productTableShow.isVisible()) {
                await luggagepage.clickCheckboxByLabel(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
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
            test.skip(true, "No in-stock products found on Business page");
        }
    })
})

test.describe("Luggage Collection", async () => {
    test(`
        1. Go to Collection C-Lite page
        2. In-stock products are displayed when clicking on in-stock checkbox
        3. User can add product to cart
        4. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Collection C-Lite page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)

            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('C-Lite')}`,
                "Go to Luggage -> Collection -> C-Lite"
            )
        })

        await step("Verity Collection C-Lite page URL", async () => {
            await luggagepage.assertUrl(/(collection\/c-lite|collection\/シーライト)\/?$/, "Assert Collection C-Lite page URL")
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
                    //expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
                ]);

            })

            await step("Verify user can go to PDP", async () => {
                await luggagepage.selectProdByIndex(1, "Select the first product")
                expect(await pdppage.isPDPPageDisplayed()).toBe(true)
            })
        } else {
            test.skip(true, "No in-stock products found on Collection C-Lite page");
        }
    })

    tests(["sg"], `
        5. Go to Unimax page
        6. In-stock products are displayed when clicking on in-stock checkbox
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Unimax page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('Unimax')}`,
                "Go to Luggage -> Collection -> Unimax"
            )
        })

        await step("Verity Adventure page URL", async () => {
            await luggagepage.assertUrl(/(collection\/unimax)\/?$/, "Assert Unimax page URL")
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
            test.skip(true, "No in-stock products found on Unimax page");
        }
    })

    tests(["sg"], `
        9. Go to 73h page
        10. In-stock products are displayed when clicking on in-stock checkbox
        11. User can add product to cart
        12. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to 73h page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('73H')}`,
                "Go to Luggage -> Collection -> 73H"
            )
        })

        await step("Verity Beach page URL", async () => {
            await luggagepage.assertUrl(/(collection\/73h)\/?$/, "Assert 73h page URL")
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
            test.skip(true, "No in-stock products found on 73h page");
        }
    })

    test(`
        13. Go to Richmond II page
        14. In-stock products are displayed when clicking on in-stock checkbox
        15. User can add product to cart
        16. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Richmond II page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('SBL Richmond II')}`,
                "Go to Luggage -> Collection -> Richmond II"
            )
        })

        await step("Verity Richmond II page URL", async () => {
            await luggagepage.assertUrl(/(collection\/sbl-richmond-ii|collection\/richmond2|リッチモンド-2)\/?$/, "Assert Richmond II page URL")
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
            test.skip(true, "No in-stock products found on Richmond II page");
        }
    })

    tests(["sg"], `
        17. Go to Proxis page
        18. In-stock products are displayed when clicking on in-stock checkbox
        19. User can add product to cart
        20. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Proxis page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('proxis')}`,
                "Go to Luggage -> Collection -> Proxis"
            )
        })

        await step("Verity Proxis page URL", async () => {
            await luggagepage.assertUrl(/(collection\/proxis)\/?$/, "Assert Proxis page URL")
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
            test.skip(true, "No in-stock products found on Proxis page");
        }
    })

    tests(["jp"], `
        21. Go to Minter page
        22. In-stock products are displayed when clicking on in-stock checkbox
        23. User can add product to cart
        24. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Minter page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('minter')}`,
                "Go to Luggage -> Collection -> Minter"
            )
        })

        await step("Verity Minter page URL", async () => {
            await luggagepage.assertUrl(/minter/, "Assert Minter page URL")
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
            test.skip(true, "No in-stock products found on Minter page");
        }
    })

    tests([], `
        25. Go to Lite box alu page
        26. In-stock products are displayed when clicking on in-stock checkbox
        27. User can add product to cart
        28. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Lite box alu page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('litebox')}`,
                "Go to Luggage -> Collection -> Lite box alu"
            )
        })

        await step("Verity Lite box alu page URL", async () => {
            await luggagepage.assertUrl(/(collection\/lite-box-alu)\/?$/, "Assert Lite box alu page URL")
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
            test.skip(true, "No in-stock products found on Lite box alu page");
        }
    })

    tests(["jp"], `
        29. Go to Paralux page
        30. In-stock products are displayed when clicking on in-stock checkbox
        31. User can add product to cart
        32. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Paralux page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('paralux')}`,
                "Go to Luggage -> Collection -> Paralux"
            )
        })

        await step("Verity Paralux page URL", async () => {
            await luggagepage.assertUrl(/(collection\/パラリュクス)\/?$/, "Assert Paralux page URL")
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
            test.skip(true, "No in-stock products found on Paralux page");
        }
    })

    tests(["jp"], `
        33. Go to Zipprix page
        34. In-stock products are displayed when clicking on in-stock checkbox
        35. User can add product to cart
        36. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const luggagepage = createBackpacksPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const amount = 1

        await step("Go to Zipprix page", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('luggage')}->${t.lv2MenuItem('collection')}->${t.lv2MenuItem('zipprix')}`,
                "Go to Luggage -> Collection -> Zipprix"
            )
        })

        await step("Verity Zipprix page URL", async () => {
            await luggagepage.assertUrl(/(collection\/ジップリックスft)\/?$/, "Assert Zipprix page URL")
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
            test.skip(true, "No in-stock products found on Zipprix page");
        }
    })
})