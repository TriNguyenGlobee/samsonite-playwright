import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { PageUtils, t } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { BrandLandingPage } from "../../../src/pages/implementing/productlistingpage/brandlanding.page";
import { createCartPage } from "../../../src/factories/cart.factory";
import { createMinicartPage } from "../../../src/factories/minicart.factory";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";

test.describe("Samsonite Brand Landing Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('label')}->${t.lv2MenuItem('brand-samsonite')}`, "Go to Brand -> Samnonite")
    })

    tests(["jp"],
        `1. Center Banner is displayed
        2. Navigate to correct URL when clicking on a banner
        3. Sub-menu (Hardcase, softcase) are displayed
        4. Verify URL when clicking on the sub-menu
        5. The Brand Information section is shown
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)

        await step("Verify center banner is displayed", async () => {
            await brandlandingpage.assertCenterBannerDisplayed(basicAuthPage, "Assert the number of banners, href, image")
        })

        await step("Verify URL when clicking on a banner", async () => {
            const activeBannerURL = await brandlandingpage.getLocatorURL(brandlandingpage.activeBanner)
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.activeBanner, activeBannerURL!,
                "Assert the URL after clicking on active banner"
            )
        })

        await step("Verify sub-mnenu are displayed", async () => {
            await brandlandingpage.hardcaseMenu.scrollIntoViewIfNeeded()

            await brandlandingpage.assertLocatorInside(brandlandingpage.hardcaseMenu, subMenuData[0])
            await brandlandingpage.assertLocatorInside(brandlandingpage.softcaseMenu, subMenuData[1])
        })

        await step("Verify URL when clicking on the sub-menu", async () => {
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.hardcaseMenu, subMenuData[0].href,
                "Verify URL after clicking on Hardcase menu"
            )
            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.softcaseMenu, subMenuData[1].href,
                "Verify URL after clicking on Softcase menu"
            )
        })

        await step("Verify brand information section is shown correctly", async () => {
            await brandlandingpage.brandInforSection.scrollIntoViewIfNeeded()

            await brandlandingpage.assertText(brandlandingpage.brInforToptitle, brandInfo.toptile,
                "Assert brand information top title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforTitle, brandInfo.title,
                "Assert brand information title"
            )

            await brandlandingpage.assertText(brandlandingpage.brInforContent, brandInfo.content,
                "Assert brand information content"
            )

            await brandlandingpage.assertNavigatedURLByClickLocator(basicAuthPage, brandlandingpage.brInforButton, brandInfo.href,
                "Verify URL after clicking on Brand Information section button"
            )
        })
    });

    test(`
        6. Products list table is displayed
        7. User can add product to cart
        8. Go to the PDP
        `, async ({ basicAuthPage }) => {
        const brandlandingpage = new BrandLandingPage(basicAuthPage)
        const pdppage = new PDPPage(basicAuthPage)
        const cartpage = createCartPage(basicAuthPage)
        const minicartpage = createMinicartPage(basicAuthPage)

        const amount = 1

        await step("Verify products list table is shown", async()=>{
            await brandlandingpage.assertVisible(brandlandingpage.productTableShow,
                "Assert the products list table is shown"
            )
        })

        await step("Verify user can add product to cart", async()=>{
            await Promise.all([
                cartpage.addMultipleProductsToCart(amount, "Add a in-stock product to cart"),
                expect(minicartpage.minicartRender).toBeVisible({ timeout: 5000 })
            ]);
        })

        await step("Verify user can go to PDP", async()=>{
            await brandlandingpage.selectProdByIndex(1, "Select the first product")
            expect(await pdppage.isPDPPageDisplayed()).toBe(true)
        })
    })
});

const subMenuData = [
    {
        hasImage: true,
        href: "https://ssjp.dev.samsonite-asia.com/luggage/type/hard/?prefn1=brand&prefv1=Samsonite%20Black%20Label%7CSamsonite",
        text: "Hardcase"
    },
    {
        hasImage: true,
        href: "https://ssjp.dev.samsonite-asia.com/luggage/type/soft/",
        text: "Softcase"
    }
]

const brandInfo = {
    toptile: "All-time favourite",
    title: "The world’s first luggage choice for 100 years",
    content: "サムソナイトは100年の長きにわたり、変わりゆく人々のライフスタイルや旅行者のニーズに応え、機能的でありながらもデザイン性の高い製品を開発しています。",
    href: "#product-list-campaign"
}