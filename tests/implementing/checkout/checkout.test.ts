import { test, expect } from "../../../src/fixtures/test-fixture"
import { t, clickUntil } from "../../../utils/helpers/helpers";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { createHomePage } from "../../../src/factories/home.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { createCartPage } from "../../../src/factories/cart.factory";
import { CheckoutLoginPage } from "../../../src/pages/implementing/checkout/checkoutlogin.page";
import { step } from "allure-js-commons";
import { CheckoutPage } from "../../../src/pages/implementing/checkout/checkout.page";

test.describe("Guest checkout", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)
        const homepage = createHomePage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)
        const checkoutloginpage = new CheckoutLoginPage(basicAuthPage)

        await step('Go to New Arrivals', async () => {
            await homepage.clickMenuItem('newarrivals')
            await newarrivalspage.logoImg.hover()

            await step('Click on In-stock checkbox', async () => {
                await homepage.clickCheckboxByLabel(basicAuthPage, `${t.homepage('in-stock')}`)
            })
        })

        await step("Add a product to cart", async () => {
            await Promise.all([
                cartpage.addMultipleProductsToCart(1, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);

        })

        await step('Go to checkout login page', async () => {
            await clickUntil(basicAuthPage, homepage.cartIcon, minicartpage.minicartRender, 'visible', {
                delayMs: 500,
                maxTries: 3,
                timeoutMs: 3000
            })

            await minicartpage.click(minicartpage.checkoutButton,
                "Click on Checkout button"
            )
        })

        await step("Go to guest checkout page", async () => {
            await checkoutloginpage.click(checkoutloginpage.guestcheckoutButton,
                "Clicking on Guest checkout button"
            )
        })
    });

    test("1. Guest checkout screen is displayed", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Verify the checkout page is displayed", async () => {
            expect(await checkoutpage.isCheckoutPageDisplayed()).toBe(true)
        })
    })

    test("2. Click Continue button without firstname", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Fill your detail without firstname", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, withoutFirstName)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('firstname'), t.checkoutpage('firstnameinvalidmsg'),
            "Assert invalid msg under Firstname field should be: Please complete this field."
        )
    })

    test("3. Click Continue button without lastname", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Fill your detail without lastname", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, withoutLastName)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('lastname'), t.checkoutpage('lastnameinvalidmsg'),
            "Assert invalid msg under Lastname field should be: Please complete this field."
        )
    })

    test("4. Click Continue button without email", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Fill your detail without email", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, withoutEmail)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('email'), t.checkoutpage('emailinvalidmsg'),
            "Assert invalid msg under Email field should be: Please complete this field."
        )
    })

    test("5. Click Continue button without phonenumber", async ({ basicAuthPage }) => {
        const checkoutpage = new CheckoutPage(basicAuthPage)

        await step("Fill your detail without phonenumber", async () => {
            await checkoutpage.fillCheckoutYourDetailForm(basicAuthPage, withoutEmail)
        })

        await checkoutpage.click(checkoutpage.continueButton, "Click on Continue button")

        await checkoutpage.assertFeedbackMsg(basicAuthPage, t.checkoutpage('phone'), t.checkoutpage('phoneinvalidmsg'),
            "Assert invalid msg under phonenumber field should be: Please complete this field."
        )
    })
});

const withoutFirstName = {
    lastName: "globeeLastName",
    email: "globeetest@mailinator.com",
    phone: "335595668",
    newsletter: true,
    terms: true
};

const withoutLastName = {
    firstName: "globeeFirstName",
    email: "globeetest@mailinator.com",
    phone: "335595668",
    newsletter: true,
    terms: true
};

const withoutEmail = {
    firstName: "globeeFirstName",
    lastName: "globeeLastName",
    phone: "335595668",
    newsletter: true,
    terms: true
};