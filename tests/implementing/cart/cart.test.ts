import { test, expect } from "../../../src/fixtures/test-fixture";
import { CartPage } from "../../../src/pages/implementing/cart/cart.page";
import { MinicartPage } from "../../../src/pages/implementing/cart/minicart.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { getRandomArrayElement, t, clickUntil, extractNumber } from "../../../utils/helpers";
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
        3. Viewcart button and Checkout button are displayed in the minicart
        4. Amazon pay button is displayed in the minicart
        5. Cart page is displayed when clicking on view car button
        6. Checkout login page is displayed when clicking on checkout button
        7. Amazone pay page is displayed when clicking on Amanazon pay button
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const minicart = new MinicartPage(basicAuthPage)
        const cartpage = new CartPage(basicAuthPage)

        const prodIndex = 1;
        let prodCollection: string, prodName: string

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

        await step('Verify view cart button and checkout button are displayed', async () => {
            await minicart.assertVisible(minicart.viewCartButton)
            await minicart.assertVisible(minicart.checkoutButton)
        })

        await step('Verify amazone pay button is displayed', async () => {
            await minicart.assertVisible(minicart.amazonePayButton)
        })

        await step('Verify the cart page is displayed when clicking on view cart button', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.assertNavigatedURLByClickLocator(basicAuthPage, minicart.viewCartButton, `${Config.baseURL}cart`,
                "Click on View Cart button and check Cart page is displayed"
            )
        })

        await step('Verify the checkout login page is displayed when clicking on checkout button', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.assertNavigatedURLByClickLocator(basicAuthPage, minicart.checkoutButton, `${Config.baseURL}checkoutlogin`,
                "Click on Checkout button and check Checkout Login page is displayed"
            )
        })

        await step('Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await homePage.click(minicart.amazonePayButton, "Click on Amazone pay button")

            await homePage.assertUrl("https://www.amazon.co.jp/")
        })
    })

    test(`
        8. Add multiple products to cart
        9. Verify the number of products in the minicart
        10. Verify the total amount payable is correct
        11. Remove product modal is displayed when remmoving a product in the minicart
        12. Remove product modal can be closed by close button and cancel button
        13. Remove all products in the cart
        `, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);
        const minicart = new MinicartPage(basicAuthPage)
        const cartpage = new CartPage(basicAuthPage)

        const prodIndexes = [1, 2, 3];

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
        })

        await step('Add a product to cart', async () => {
            await cartpage.addProductToCartByIndex(prodIndexes)
        })

        await step('Assert number of products in the minicart', async () => {
            expect(await minicart.getNumberOfProducts()).toBe(3)
        })

        const firstProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[0]));
        const secorndProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[1]));
        const thirdProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[2]));
        const firstMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[0]));
        const secondMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[1]));
        const thirdMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[2]));
        const shippingCost = await extractNumber(await minicart.getShippingCost());
        const totalPrice = await extractNumber(await minicart.getTotalPrice());

        await step('Assert total amount payable is correct', async () => {
            expect(firstProductPrice).toBe(firstMinicartProductPrice)
            expect(secorndProductPrice).toBe(secondMinicartProductPrice)
            expect(thirdProductPrice).toBe(thirdMinicartProductPrice)
            expect(totalPrice).toBe(firstProductPrice + secorndProductPrice + thirdProductPrice + shippingCost)
        })

        await step('Verify remove product modal is displayed when removing a product in the minicart', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.click(minicart.minicartRemoveProdButton, 'Click remove product button in the minicart')

            await minicart.assertVisible(minicart.removeProductModal, 'Assert remove product modal is displayed')
        })

        await step('Verify remove product modal can be closed by close button and cancel button', async () => {
            await minicart.click(minicart.removeProdModalCloseButton, 'Close remove product modal')

            await minicart.assertHidden(minicart.removeProductModal, 'Assert remove product modal is closed')

            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.click(minicart.minicartRemoveProdButton, 'Click remove product button in the minicart')

            await minicart.click(minicart.removeProdModalCancelButton, 'Cancel remove product')

            await minicart.assertHidden(minicart.removeProductModal, 'Assert remove product modal is closed')
        })

        await step('Remove all products in minicart', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicart.removeAllProducts()

            await minicart.assertHidden(minicart.minicartRender, 'Assert minicart is closed after removing all products')

            const numberOfProd = await minicart.getNumberOfProducts()

            expect(numberOfProd).toBe(0)
        })
    })
});