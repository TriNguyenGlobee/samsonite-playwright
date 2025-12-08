import { expect, test } from "../../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../../src/factories/home.factory";
import { PDPPage } from "../../../../src/pages/delivery/pdp/pdp.page";
import { t, lazyLoad, getDecimalRating, scrollToBottom, scrollToTop, extractNumber, generateSentence, generateReadableTimeBasedId } from "../../../../utils/helpers/helpers";
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
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)

        await pdppage.goto('https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html')

        await scrollToBottom(basicAuthPage)

        let ratingPointValue = await pdppage.getDecialRatingPoint()
        let numberOfReview = await pdppage.getNumberOfReview("Get number of reviews on PDP")

        await step('Verify the rating star and rating point value', async () => {
            await pdppage.assertRating(basicAuthPage, ratingPointValue)
        })

        await step('Verify the review count is displayed', async () => {
            expect(numberOfReview).toBeGreaterThanOrEqual(1)
        })

        await step('Verify tha Bazaarvoice logo is displayed', async () => {
            await pdppage.assertVisible(pdppage.bazaarvoiceLogo)
        })

        await step('Clicking on Bazaarvoice logo', async () => {
            await pdppage.click(pdppage.bazaarvoiceLogo)
        })

        await step('Verify Bazaarvoice trustmark is shown', async () => {
            await pdppage.assertVisible(pdppage.bazaarvoiceTrustmark)
        })

        await step('Closing Bazaarvoice trustmark', async () => {
            await pdppage.click(pdppage.bazaarvoiceTrustmarkCloseButton,
                "Clicking on Close button"
            )
        })

        await step('Verify the bazaarvoice trustmark is hidden', async () => {
            await pdppage.assertHidden(pdppage.bazaarvoiceTrustmark)
        })

        await step('Verify the rating star group is displayed correctly', async () => {
            await pdppage.assertVisible(pdppage.ratingStarGroup,
                "Assert that rating star group is displayed"
            )

            await pdppage.assertRatingStarGroup(basicAuthPage,
                "Assert rating star group contains 5 lines correctly"
            )
        })

        await step('Overall rating is show correctly', async () => {
            const overallPointNumber = extractNumber(await pdppage.overallPoint.innerText())
            const overallNumberofreview = extractNumber(await pdppage.overallNumberofReview.innerText())

            await pdppage.assertEqual(overallPointNumber, ratingPointValue,
                "Assert overall rating point"
            )

            await pdppage.assertEqual(overallNumberofreview, numberOfReview,
                "Assert overall number of review"
            )
        })
    })

    test(`
        8. Write a review button is displayed
        9. BV review modal is displayed when clicking Write a review button
        10. User can select Overall rating stars
        11. Click on review guildelines
        12. Submit review without entering anything
        13. Submit review after entering fully information
        14. User can add Images/Videos
        `, async ({ basicAuthPage }) => {
        const pdppage = new PDPPage(basicAuthPage)
        const ovRatingStar1 = basicAuthPage.locator(`div#bv-ips-star-rating-1`)
        const ovRatingStar2 = basicAuthPage.locator(`div#bv-ips-star-rating-2`)
        const ovRatingStar3 = basicAuthPage.locator(`div#bv-ips-star-rating-3`)
        const ovRatingStar4 = basicAuthPage.locator(`div#bv-ips-star-rating-4`)
        const ovRatingStar5 = basicAuthPage.locator(`div#bv-ips-star-rating-5`)

        await pdppage.goto('https://sssg.dev.samsonite-asia.com/sbl-fanthom/spinner-55/20-tag/ss-132219-1041.html')

        await scrollToBottom(basicAuthPage)

        await pdppage.assertVisible(pdppage.bvWriteReviewBtn,
            "Assert the Write A Reivew button is displayed"
        )

        await step("Clicking on Write A Reivew button", async () => {
            await pdppage.click(pdppage.bvWriteReviewBtn)
        })

        await step('Assert the BV Review Modal is displayed', async () => {
            await pdppage.assertVisible(pdppage.bvReviewModal)
        })

        await step('User can select Overall Rating star', async () => {
            await pdppage.click(ovRatingStar1, "Clicking on 1st start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('1stmsg')}`,
                "1 out of 5 stars selected. Product is Poor.")

            await pdppage.click(ovRatingStar2, "Clicking on 2nd start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('2ndmsg')}`,
                "2 out of 5 stars selected. Product is Fair.")

            await pdppage.click(ovRatingStar3, "Clicking on 3rd start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('3rdmsg')}`,
                "3 out of 5 stars selected. Product is Average.")

            await pdppage.click(ovRatingStar4, "Clicking on 4th start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('4thmsg')}`,
                "4 out of 5 stars selected. Product is Good.")

            await pdppage.click(ovRatingStar5, "Clicking on 5th start")
            await pdppage.assertText(pdppage.bvOverallRatingMSG, `${t.bvintegration('5thmsg')}`,
                "5 out of 5 stars selected. Product is Excellent.")
        })

        await step('Clicking on Review Guidelines button', async () => {
            await pdppage.click(pdppage.bvReivewGuidelinesBtn)
        })

        await step('Verify the Guidelines popup is displayed', async () => {
            await pdppage.assertVisible(pdppage.bvGuidelinesPopup)
        })

        await step('Closing Guidelines popup', async () => {
            await pdppage.click(pdppage.bvGuidelinesPopupCloseBtn,
                "Clicking on close button"
            )

            await pdppage.assertHidden(pdppage.bvGuidelinesPopup,
                "Assert the Guidelines popup is hidden"
            )
        })

        await step('Clicking on submit button withou inputting anything', async () => {
            await pdppage.bvGuidelinesSubmitBtn.scrollIntoViewIfNeeded()
            await pdppage.click(pdppage.bvGuidelinesSubmitBtn,
                "Clicking on submit button without inputting anything"
            )

            await pdppage.assertVisible(pdppage.bvReviewReq,
                "Error message: Required: Review."
            )

            await pdppage.assertVisible(pdppage.bvReviewTitleReq,
                "Error message: Required: Review Title."
            )

            await pdppage.assertVisible(pdppage.bvEmailReq,
                "Error message: Required: Nickname."
            )

            await pdppage.assertVisible(pdppage.bvEmailReq,
                "Error message: Required: Email."
            )
        })

        await step('Fill review information to field', async () => {
            await pdppage.fillReviewForm()
        })
    })
});
