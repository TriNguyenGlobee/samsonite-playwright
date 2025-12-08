import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { description, step } from "allure-js-commons";
import { delay, t, extractNumber, getDecimalRating, generateSentence, generateReadableTimeBasedId } from "../../../../utils/helpers/helpers";

export class PDPPage extends BasePage {
    readonly logoImg: Locator;
    readonly breadcrumbRow: Locator;
    readonly breadcrumbItem: Locator;
    readonly prodDetailImg: Locator;
    readonly prodInfor: Locator;
    readonly prodBrand: Locator;
    readonly prodCollecton: Locator;
    readonly prodName: Locator;
    readonly prodSticker: Locator;
    readonly prodStatus: Locator;
    readonly prodPrice: Locator;
    readonly addToCartButton: Locator;
    readonly buyNowButton: Locator;
    readonly prodDescriptionsDetail: Locator;
    readonly longDescription: Locator;
    readonly readMoreLessButton: Locator;
    readonly prodInforTabBar: Locator;
    readonly amazonePayButton: Locator;
    readonly wishlistIcon: Locator;
    readonly wishlistMsg: Locator;
    readonly viewWishListButton: Locator;
    readonly bazaarvoiceLogo: Locator;
    readonly bazaarvoiceTrustmark: Locator;
    readonly bazaarvoiceTrustmarkCloseButton: Locator;
    readonly ratingStarGroup: Locator;
    readonly overallPoint: Locator;
    readonly overallNumberofReview: Locator;
    readonly bvWriteReviewBtn: Locator
    readonly bvReviewModal: Locator
    readonly bvOverallRatingMSG: Locator
    readonly bvReivewGuidelinesBtn: Locator
    readonly bvGuidelinesPopup: Locator
    readonly bvGuidelinesPopupCloseBtn: Locator
    readonly bvGuidelinesSubmitBtn: Locator
    readonly bvReviewReq: Locator
    readonly bvReviewTitleReq: Locator
    readonly bvNicknameReq: Locator
    readonly bvEmailReq: Locator
    readonly reviewField: Locator
    readonly reviewTitleField: Locator
    readonly nicknameField: Locator
    readonly emailField: Locator
    readonly termCheckbox: Locator

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.breadcrumbRow = page.locator(`//ol[contains(@class,"breadcrumb")]`)
        this.breadcrumbItem = this.breadcrumbRow.locator(`xpath=.//li[@class="breadcrumb-item"]`)
        this.prodDetailImg = page.locator(`//div[contains(@class,"product-detail-images")]`)
        this.prodInfor = page.locator(`//div[@id="product-informations"]`)
        this.prodBrand = this.prodInfor.locator(`xpath=.//div[@class="product-brand"]`)
        this.prodCollecton = this.prodInfor.locator(`xpath=.//h2[@class="product-collection"]`)
        this.prodName = this.prodInfor.locator(`xpath=.//h2[@class="product-name"]`)
        this.prodSticker = this.prodInfor.locator(`xpath=.//div[@class="product-sticker-wrapper"]`)
        this.prodStatus = this.prodInfor.locator(`xpath=.//ul[contains(@class,"availability-msg")]`)
        this.prodPrice = this.prodInfor.locator(`xpath=.//div[contains(@class,"product-detail-section")]//div[@class="price"]//span[@class="sales"]`)
        this.addToCartButton = this.prodInfor.locator(`xpath=.//button[contains(@class,"add-to-cart")]`)
        this.buyNowButton = this.prodInfor.locator(`xpath=.//button[contains(@class,"quick-checkout")]`)
        this.prodDescriptionsDetail = this.prodInfor.locator(`xpath=.//div[@class="description-and-detail"]`)
        this.longDescription = this.prodInfor.locator(`xpath=.//div[@class="value content show"]`)
        this.readMoreLessButton = this.prodDescriptionsDetail.locator(`xpath=.//div[contains(@class,"product-description-readmore")]`)
        this.prodInforTabBar = this.prodInfor.locator(`xpath=.//div[@id="product-information-tabs"]`)
        this.amazonePayButton = page.locator(`//div[@id="product-informations"]`).locator('div.amazonpay-button-view1');
        this.wishlistIcon = this.prodInfor.locator(`xpath=.//i[contains(@class,"fa fa-heart")]`)
        this.wishlistMsg = page.locator(`//div[@class="wishlist-message"]//p`)
        this.viewWishListButton = page.locator(`//div[@class="wishlist-message"]//a[text()="${t.PDP('viewwishlistbtn')}"]`)
        this.bazaarvoiceLogo = page.locator(`#bv_review_maincontainer button img`)
        this.bazaarvoiceTrustmark = page.locator(`#bv_review_maincontainer div#bv-popup-47`)
        this.bazaarvoiceTrustmarkCloseButton = page.locator(`#bv_review_maincontainer div#bv-popup-47 button svg`)
        this.ratingStarGroup = page.locator(`section.bv-rnr__rpifwc-0.kZapjS div.table`)
        this.overallPoint = page.locator(`section#bv-reviews-overall-ratings-container div.bv-rnr__sc-157rd1w-1.ljrlPW`)
        this.overallNumberofReview = page.locator(`div.bv-rnr__sc-157rd1w-2.krTpQg`)
        this.bvWriteReviewBtn = page.locator(`button.bv-write-a-review`)
        this.bvReviewModal = page.locator(`div.bv-ips-modal-window`)
        this.bvOverallRatingMSG = page.locator(`label#bv-label-text-undefined`)
        this.bvReivewGuidelinesBtn = page.locator(`//button[text()="Review guidelines"]`)
        this.bvGuidelinesPopup = page.locator(`div[type="popup"] div.bv-ips-modal-window`)
        this.bvGuidelinesPopupCloseBtn = page.locator(`div[type="popup"] div.bv-ips-modal-window button#bv-ips-undefined`)
        this.bvGuidelinesSubmitBtn = page.locator(`button#bv-ips-submit`)
        this.bvReviewReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('reviewreq')}"]`)
        this.bvReviewTitleReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('reviewtitlereq')}"]`)
        this.bvNicknameReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('nicknamereq')}"]`)
        this.bvEmailReq = page.locator(`//label[@type="error"]//span[text()="${t.bvintegration('emailreq')}"]`)
        this.reviewField = page.locator(`//textarea[@name="Review"]`)
        this.reviewTitleField = page.locator(`//input[@name="Review Title"]`)
        this.nicknameField = page.locator(`//input[@name="Nickname"]`)
        this.emailField = page.locator(`//input[@name="Email"]`)
        this.termCheckbox = page.locator(`div#sps-termsAndConditions-styledcheckbox`)
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillReviewForm(data?: {
        review?: string;
        reviewTitle?: string;
        nickname?: string;
        email?: string;
        term: boolean;
    }) {
        const review = data?.review ?? `Review content ${generateSentence(150)}`;
        const reviewTitle = data?.reviewTitle ?? `Title ${generateSentence(15)}`;
        const nickname = data?.nickname ?? `User${generateReadableTimeBasedId()}`;
        const email = data?.email ?? `auto_${generateReadableTimeBasedId()}@yopmail.com`;

        await this.reviewField.fill(review);
        await this.reviewTitleField.fill(reviewTitle);
        await this.nicknameField.fill(nickname);
        await this.emailField.fill(email);

        if (data?.term) {
            await this.termCheckbox.click();
        }
    }

    // =========================
    // 📦 Helpers
    // =========================
    async isPDPPageDisplayed(): Promise<boolean> {
        try {
            const elementsToCheck = [
                this.prodDetailImg,
                this.prodInfor,
                this.prodBrand.first(),
                this.prodCollecton,
                this.prodName,
                this.prodSticker,
                this.prodStatus,
                this.prodPrice
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('Error checking PDP page:', error);
            return false;
        }
    }

    async getPromotionMessage(description?: string): Promise<string | null> {
        return await step(description || "Get promotion message", async () => {
            const productMsg = this.prodInfor.locator(`xpath=.//div[contains(@class,"product") and contains(@class,"message")]//span`)
            if (await productMsg.count() > 0) {
                return (await this.getText(productMsg.first(), `Get Promotion Msg of Product`))?.trim() ?? null
            } else return null
        });
    }

    async getDecialRatingPoint(description?: string): Promise<number> {
        return await step(description || "Get decimal rating point", async () => {
            const decimalRatingPoint = this.page.locator(`//div[@class="bv-inline-rating"]//span[@class="bv-rating-decimal"]`)
            const ratingPoint = extractNumber(await decimalRatingPoint.innerText())
            return ratingPoint
        })
    }

    async getNumberOfReview(description?: string): Promise<number> {
        return await step(description || "Get the number of review", async () => {
            const ratingCount = this.page.locator(`//div[@class="bv-inline-rating"]//span[@class="bv-rating-count"]`)
            const numberOfReview = extractNumber(await ratingCount.innerText())
            return numberOfReview
        })
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertInformationTabs(page: Page, description?: string) {
        const tabBar = page.locator('//div[@id="product-information-tabs"]');
        const tabs = tabBar.locator('xpath=.//button[contains(@class,"nav-link")]');
        const tabCount = await tabs.count();

        for (let i = 1; i < tabCount; i++) {
            await step(`Assert the tab ${i + 1}`, async () => {
                const tab = tabs.nth(i);

                await tab.click();
                await expect(tab).toHaveClass(/active/, { timeout: 3000 });

                await delay(200);
            });
        }

        if (tabCount > 1) {
            await step("Assert the first tab again", async () => {
                const firstTab = tabs.first();

                if (await firstTab.isVisible() == true) {
                    await firstTab.click();
                    await expect(firstTab).toHaveClass(/active/, { timeout: 3000 });

                    await delay(200);
                }
            });
        }
    }

    /**
     * Assert rating star equal rating point
     * Allowable error ~0.1
     */
    async assertRating(page: Page, expectedRating: number, description?: string) {
        await step(description || `Assert rating star to be: ${expectedRating}`, async () => {
            const actualRating = await getDecimalRating(page);

            const tolerance = 0.1;
            const min = expectedRating - tolerance;
            const max = expectedRating + tolerance;

            expect(actualRating).toBeGreaterThanOrEqual(min);
            expect(actualRating).toBeLessThanOrEqual(max);

            console.log(`Expected: ${expectedRating}, Actual: ${actualRating}`);
        })
    }

    async assertRatingStarGroup(page: Page, description?: string) {
        await step(description || "Assert rating group displayed correctly", async () => {
            const lineElement = page.locator(`//section[@class="bv-rnr__rpifwc-0 kZapjS"]//div[@class="table"]//div[@role="button"]//p//span[@aria-hidden="true"]`)

            expect(await lineElement.count()).toBe(5)

            expect(await lineElement.nth(0).innerText()).toEqual("5 stars")
            expect(await lineElement.nth(1).innerText()).toEqual("4 stars")
            expect(await lineElement.nth(2).innerText()).toEqual("3 stars")
            expect(await lineElement.nth(3).innerText()).toEqual("2 stars")
            expect(await lineElement.nth(4).innerText()).toEqual("1 star")
        })
    }
}
