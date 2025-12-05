import { expect, test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../../src/factories/home.factory";
import { PDPPage } from "../../../../src/pages/delivery/pdp/pdp.page";
import { t, lazyLoad } from "../../../../utils/helpers/helpers";
import { steps } from "../../../../utils/helpers/localeStep"
import { NewArrivalsPage } from "../../../../src/pages/delivery/productlistingpage/newarrivals/newarrivals.page";

test.describe("PDP is shown correctly", async () => {
    /*test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const newarrivalspage = new NewArrivalsPage(basicAuthPage)

        await step("Go to New Arrivals Page", async () => {
            await homepage.clickMenuItem('newarrivals', "Go to New Arrivals page")
        })

        await step("Click In-stock checkbox", async () => {
            if (await homepage.productTableShow.isVisible()) {
                await homepage.clickCheckbox(basicAuthPage, t.homepage('in-stock'),
                    "Checking the In-stock checkbox")
            } else {
                test.skip(true, "Product table not visible, skipping the test.");
            }
        })

        await lazyLoad(basicAuthPage)
        await newarrivalspage.selectRatedProd()
    });*/

    test(`
        1. Rating star is shown exactly
        2. Review count is displayed
        3. Bazaarvoice logo is displayed
        4. Bazaarvoice trustmark is shown when clicking Bazaarvoice logo
        5. Close Bazaarvoice trustmark
        6. Rating stars groups is displayed
        7. Overall rating is shown correctly
        8. Write a review button is displayed
        9. BV review modal is displayed when clicking Write a review button
        10. User can select Overall rating stars
        11. Click on review guildelines
        12. Submit review without entering anything
        13. Submit review after entering fully information
        14. User can add Images/Videos
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)

        await pdppage.goto('https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html')


    })
});
