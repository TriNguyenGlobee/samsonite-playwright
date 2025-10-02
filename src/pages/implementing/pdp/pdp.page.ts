import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";

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
    readonly amazonePayButton: Locator;

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
        this.prodPrice = this.prodInfor.locator(`xpath=.//div[contains(@class,"product-detail-section")]//div[@class="price"]`)
        this.addToCartButton = this.prodInfor.locator(`xpath=.//button[contains(@class,"add-to-cart")]`)
        this.buyNowButton = this.prodInfor.locator(`xpath=.//button[contains(@class,"quick-checkout")]`)
        this.amazonePayButton = page.locator(`//div[@id="product-informations"]//div[contains(@class,"amazon-pay-onetime-button")]`).locator('div.amazonpay-button-view1');
    }

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async isPDPPageDisplayed(): Promise<boolean> {
        try {
            const elementsToCheck = [
                this.prodDetailImg,
                this.prodInfor,
                this.prodBrand,
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
            console.error('Error checking login page:', error);
            return false;
        }
    }

    async getPromotionMessage(description?: string): Promise<string | null> {
        return await step(description || "Get promotion message", async () => {
            const productMsg = this.prodInfor.locator(`xpath=.//div[contains(@class,"product") and contains(@class,"message")]//span`)
            if (await productMsg.count() > 0) {
                return (await this.getText(productMsg, `Get Promotion Msg of Product`))?.trim() ?? null
            } else return null
        });
    }

    // =========================
    // ✅ Assertions
    // =========================

}
