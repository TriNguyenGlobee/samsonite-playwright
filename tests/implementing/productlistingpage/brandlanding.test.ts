import { expect, test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { NewArrivalsPage } from "../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";
import { PDPPage } from "../../../src/pages/delivery/pdp/pdp.page";
import { t } from "../../../utils/helpers";

test.describe("Breadcrumb", () => {
    const prodIndex = 1
    let prodName: string;
    let prodCollection: string;

    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)

        await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")
        await step('Click on In-stock checkbox', async()=>{
            await homepage.clickCheckboxByLabel(basicAuthPage, `${t.homepage('in-stock')}`)
        })

        prodCollection = (await homepage.getProdCollection(prodIndex)).trim()
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
            expect(breadcrumbProdName).toBe(`${prodCollection} ${prodName}`)
        })
    });
});