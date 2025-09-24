import { test, expect } from "../../../src/fixtures/test-fixture";
import { CartPage } from "../../../src/pages/implementing/cart/cart.page";
import { MinicartPage } from "../../../src/pages/implementing/cart/minicart.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { getRandomArrayElement, t, clickUntil } from "../../../utils/helpers";
import { HomePage } from "../../../src/pages/delivery/home/home.page";
import { Locator } from "@playwright/test";

test.describe("Empty cart without login", () => {
    test(`
        1. Minicart is displayed correctly
        2. Click shopping cart button to close minicart
        3. Explore by category
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const minicartPage = new MinicartPage(basicAuthPage)

        await step("Click on Cart icon", async () => {
            await homePage.click(homePage.cartIcon)
        })

        await step("Verify that minicart is displayed", async () => {
            expect(await minicartPage.isMinicartShown()).toBe(true)
            expect(minicartPage.emptyCartMsg).toHaveText(t.minicart('emptymsg'))
            expect(minicartPage.startShoppingButton).toBeVisible()
            expect(minicartPage.exploreByCategoryText).toBeVisible()
            expect(await minicartPage.footerCategoryItem.count()).toBe(3)
        })

        await step("Click Shopping Cart button", async () => {
            await minicartPage.click(minicartPage.startShoppingButton)
        })

        await step("Verify that Minicart is closed", async () => {
            expect(await minicartPage.isMinicartShown()).toBe(false)
        })

        await step("Explore by footer category", async () => {
            const expectedURL = await homePage.getLocatorURL(minicartPage.footerCategoryItem.nth(1))

            await clickUntil(basicAuthPage, homePage.cartIcon, minicartPage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicartPage.assertNavigatedURLByClickLocator(basicAuthPage, minicartPage.footerCategoryItem.nth(1), expectedURL!)
        })
    })

    test(`4. Cart page is displayed`, async ({ basicAuthPage }) => {
        const cartpage = new CartPage(basicAuthPage)

        await step('Go to Cart page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        await step('Verify that the cart page is displayed', async () => {
            await cartpage.isCartPageDisplayed()

            expect(cartpage.pageTitle).toHaveText(t.cartpage('pageTitle'))
            expect(cartpage.emptymsg).toHaveText(t.cartpage('emptymsg'))
        })
    })
});

test.describe("Add products to cart without login", () => {
    test(`
        1. Minicart is displayed after adding product to cart
        2. Prodcollection and prodname are displayed correctly in the minicart
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const minicart = new MinicartPage(basicAuthPage)
        const cartpage = new CartPage(basicAuthPage)

        const prodIndex = 1;
        let prodCollection: string, prodName : string

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            prodCollection = await cartpage.getProdCollection(prodIndex)
            prodName = await cartpage.getProdName(prodIndex)
        })

        await step('Add a product to cart', async () => {
            await cartpage.addProductToCartByIndex(prodIndex)
        })

        await step('Verify the minicart is displayed', async () => {
            await minicart.assertVisible(minicart.minicartRender)
        })

        await step('Verify prodcollection and prodname are displayed in the the minicart correctly', async () => {
            const minicartProdName = await minicart.getMinicartProdName(prodIndex)
            const minicartProdCollection = await minicart.getMinicartProdCollection(prodIndex)

            expect(minicartProdCollection).toBe(prodCollection)
            expect(minicartProdName).toBe(prodName)
        })
    })
});