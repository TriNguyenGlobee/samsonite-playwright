import { test, expect } from "../../../src/fixtures/test-fixture";
import { CartPage } from "../../../src/pages/delivery/cart/cart.page";
import { MinicartPage } from "../../../src/pages/delivery/cart/minicart.page";
import { Config } from "../../../config/env.config";
import { step } from "allure-js-commons";
import { t, clickUntil, extractNumber } from "../../../utils/helpers";
import { createHomePage } from "../../../src/factories/home.factory"

test.describe("Empty cart without login", () => {
    test(`
        1. Minicart is displayed correctly
        2. Click shopping cart button to close minicart
        3. Explore by category
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicartPage = new MinicartPage(basicAuthPage)

        await step("Click on Cart icon", async () => {
            await homePage.click(homePage.cartIcon)
        })

        await step("Verify that minicart is displayed", async () => {
            expect(await minicartPage.isMinicartShown()).toBe(true)
            await expect(minicartPage.emptyCartMsg).toHaveText(t.minicart('emptymsg'))
            await expect(minicartPage.startShoppingButton).toBeVisible()
            await expect(minicartPage.exploreByCategoryText).toBeVisible()
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

            await expect(cartpage.pageTitle).toHaveText(t.cartpage('pageTitle'))
            await expect(cartpage.emptymsg).toHaveText(t.cartpage('emptymsg'))
        })
    })
});

test.describe("Add products to cart without login", () => {
    test(`
        1. Minicart is displayed after adding product to cart
        2. Prodcollection and prodname are displayed correctly in the minicart
        3. Viewcart button and Checkout button are displayed in the minicart
        4. Amazon pay button is displayed in the minicart
        5. Cart page is displayed when clicking on view cart button
        6. Checkout login page is displayed when clicking on checkout button
        7. Amazone pay page is displayed when clicking on Amanazon pay button
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicart = new MinicartPage(basicAuthPage)
        const cartpage = new CartPage(basicAuthPage)

        const prodIndex = 1;
        let prodCollection: string, prodName: string

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            prodCollection = await cartpage.getProdCollection(prodIndex)
            prodName = await cartpage.getProdName(prodIndex)
        })

        await step('Verify the minicart is displayed after adding product to cart', async () => {
            await Promise.all([
                cartpage.addProductToCartByIndex(prodIndex),
                expect(minicart.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step('Verify prodcollection and prodname are displayed in the the minicart correctly', async () => {
            const minicartProdName = await minicart.getMinicartProdName(prodIndex)
            const minicartProdCollection = await minicart.getMinicartProdCollection(prodIndex)

            expect(minicartProdCollection).toBe(prodCollection)
            expect(minicartProdName).toBe(prodName)
        })

        await step('Verify view cart button and checkout button are displayed', async () => {
            await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                delayMs: 300,
                maxTries: 3,
                timeoutMs: 5000
            })
            await minicart.assertVisible(minicart.viewCartButton)
            await minicart.assertVisible(minicart.checkoutButton)
        })

        if (process.env.LOCALE === 'jp') {
            await step('Verify amazone pay button is displayed', async () => {
                await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                    delayMs: 300,
                    maxTries: 3,
                    timeoutMs: 5000
                })
                await minicart.assertVisible(minicart.amazonePayButton)
            })

            await step('Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
                await clickUntil(basicAuthPage, homePage.cartIcon, minicart.minicartRender, 'visible', {
                    delayMs: 500,
                    maxTries: 3,
                    timeoutMs: 3000
                })

                await homePage.click(minicart.amazonePayButton, "Click on Amazone pay button")
                await homePage.assertUrl(/amazon\.co\.jp/)
            })
        }

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
    })

    test(`
        8. Add multiple products to cart
        9. Verify the number of products in the minicart
        10. Verify the total amount payable is correct
        11. Remove product modal is displayed when remmoving a product in the minicart
        12. Remove product modal can be closed by close button and cancel button
        13. Remove all products in the cart
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const minicart = new MinicartPage(basicAuthPage)
        const cartpage = new CartPage(basicAuthPage)

        const prodIndexes = [1, 2, 3];

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
        })

        await step('Add multi products to cart', async () => {
            await cartpage.addProductToCartByIndex(prodIndexes)
        })

        await step('Verify number of products in the minicart', async () => {
            expect(await minicart.getNumberOfProducts()).toBe(3)
        })

        const firstProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[0]));
        const secondProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[1]));
        const thirdProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[2]));

        console.log(`Prod price on page: 1: ${firstProductPrice}, 2: ${secondProductPrice}, 3: ${thirdProductPrice}` )

        const firstMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[0]));
        const secondMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[1]));
        const thirdMinicartProductPrice = await extractNumber(await minicart.getMinicartProdPrice(prodIndexes[2]));

        console.log(`Prod price on minicart: 1: ${firstMinicartProductPrice}, 2: ${secondMinicartProductPrice}, 3: ${thirdMinicartProductPrice}` )

        const shippingCost = await extractNumber(await minicart.getShippingCost());
        const totalPrice = await extractNumber(await minicart.getTotalPrice());

        console.log(`Shipping cost: ${shippingCost}, and total price: ${totalPrice}` )

        await step('Verify total amount payable is correct', async () => {
            expect(firstProductPrice).toBe(firstMinicartProductPrice)
            expect(secondProductPrice).toBe(secondMinicartProductPrice)
            expect(thirdProductPrice).toBe(thirdMinicartProductPrice)
            expect(totalPrice).toBe(firstProductPrice + secondProductPrice + thirdProductPrice + shippingCost)
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

        await step('Verify that all products in minicart are removed', async () => {
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

    test(`
        14. Prodcollection and prodname are displayed correctly in Cart page
        15. Verify the number of products in the Cart page
        16. Checkout login page is displayed when clicking on checkout button
        17. Amazone pay page is displayed when clicking on Amanazon pay button
        18. Verify the total amount payable is correct
        19. Remove product modal is displayed when remmoving a product in Cart page
        20. Remove product modal can be closed by close button and cancel button
        21. Remove all products in the Cart page
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const cartpage = new CartPage(basicAuthPage)

        const prodIndexes = [1, 2, 3];
        const prodIndex = 1;
        let prodCollection: string, prodName: string

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
            prodCollection = await cartpage.getProdCollection(prodIndex)
            prodName = await cartpage.getProdName(prodIndex)
        })

        await step('Add multi products to cart', async () => {
            await cartpage.addProductToCartByIndex(prodIndexes)
        })

        const firstProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[0]));
        const secondProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[1]));
        const thirdProductPrice = await extractNumber(await cartpage.getProdPrice(prodIndexes[2]));

        await step('Go to Cart page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        await step('Verify prodcollection and prodname are displayed in the the minicart correctly', async () => {
            const cartPageProdName = await cartpage.getCartPageProdName(prodIndex)
            const cartPageProdCollection = await cartpage.getCartPageProdCollection(prodIndex)

            expect(cartPageProdCollection).toBe(prodCollection)
            expect(cartPageProdName).toBe(prodName)
        })

        await step('Verify number of products in Cart page', async () => {
            expect(await cartpage.getNumberOfProducts()).toBe(3)
        })

        await step('Verify the checkout login page is displayed when clicking on checkout button', async () => {
            await cartpage.assertNavigatedURLByClickLocator(basicAuthPage, cartpage.checkoutButton, `${Config.baseURL}checkoutlogin`,
                "Click on Checkout button and check Checkout Login page is displayed"
            )
        })

        await step('Verify the Amazone pay page is displayed when clicking on Amazone pay button', async () => {
            await homePage.click(cartpage.amazonePayButton, "Click on Amazone pay button")

            await homePage.assertUrl(/amazon\.co\.jp/)
        })

        await step('Go to Cart page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        const firstMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[0]));
        const secondMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[1]));
        const thirdMinicartProductPrice = await extractNumber(await cartpage.getCartPageProdPrice(prodIndexes[2]));
        const shippingCost = await extractNumber(await cartpage.getShippingCost());
        const totalPrice = await extractNumber(await cartpage.getTotalPrice());

        await step('Verify total amount payable is correct', async () => {
            expect(firstProductPrice).toBe(firstMinicartProductPrice)
            expect(secondProductPrice).toBe(secondMinicartProductPrice)
            expect(thirdProductPrice).toBe(thirdMinicartProductPrice)
            expect(totalPrice).toBe(firstProductPrice + secondProductPrice + thirdProductPrice + shippingCost)
        })

        await step('Verify remove product modal is displayed when removing a product in Cart page', async () => {
            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.assertVisible(cartpage.removeProductModal, 'Assert remove product modal is displayed')
        })

        await step('Verify remove product modal can be closed by close button and cancel button', async () => {
            await cartpage.click(cartpage.removeProdModalCloseButton, 'Close remove product modal')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')

            await cartpage.click(cartpage.removeProductButton.first(), 'Click remove product button in Cart page')

            await cartpage.click(cartpage.removeProdModalCancelButton, 'Cancel remove product')

            await cartpage.assertHidden(cartpage.removeProductModal, 'Assert remove product modal is closed')
        })

        await step('Verify that all products in minicart are removed', async () => {
            await cartpage.removeAllProducts()

            const numberOfProd = await cartpage.getNumberOfProducts()

            expect(numberOfProd).toBe(0)
        })
    })

    test(`
        22. Add gift service
        23. Remove gift service
        `, async ({ basicAuthPage }) => {
        const homePage = createHomePage(basicAuthPage);
        const cartpage = new CartPage(basicAuthPage)

        const prodIndex = 1;

        await step('Go to New Arrivals', async () => {
            await homePage.clickMenuItem('newarrivals')
        })

        await step('Add a product to cart', async () => {
            await cartpage.addProductToCartByIndex(prodIndex)
        })

        await step('Go to Cart page by URL', async () => {
            await basicAuthPage.goto(`${Config.baseURL}cart`)
        })

        await step('Add a gift service', async () => {
            await cartpage.addGiftService(prodIndex)
        })

        await step('Verify that gift service is added', async () => {
            await expect(cartpage.prodGiftRow).toBeVisible()
        })

        await step('Remove a gift service', async () => {
            await cartpage.click(cartpage.removeGiftServiceButton, "Click gift service button")
        })

        await step('Verify that gift service is removed', async () => {
            await expect(cartpage.prodGiftRow).not.toBeVisible()
        })
    })
});