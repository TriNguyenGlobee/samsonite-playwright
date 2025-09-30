import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { clickUntil } from "../../../../utils/helpers";

export class MinicartPage extends BasePage {
    readonly minicartModal: Locator;
    readonly emptyCartMsg: Locator;
    readonly startShoppingButton: Locator;
    readonly exploreByCategoryText: Locator;
    readonly footerCategoryItem: Locator;
    readonly minicartRender: Locator;
    readonly viewCartButton: Locator;
    readonly checkoutButton: Locator;
    readonly amazonePayButton: Locator;
    readonly removeProductModal: Locator;
    readonly removeProdModalCloseButton: Locator;
    readonly removeProdModalConfirmButton: Locator;
    readonly removeProdModalCancelButton: Locator;
    readonly minicartRemoveProdButton: Locator;

    constructor(page: Page) {
        super(page);
        this.minicartModal = page.locator('//div[contains(@class,"minicart-container")]')
        this.emptyCartMsg = this.minicartModal.locator(`xpath=.//div[@class="minicart-empty-message"]`)
        this.startShoppingButton = this.minicartModal.locator(`xpath=.//button[normalize-space(text())="お買い物を続ける"]`)
        this.exploreByCategoryText = this.minicartModal.locator(`xpath=.//span[@class="minicart-empty-footer-title"]`)
        this.footerCategoryItem = this.minicartModal.locator(`xpath=.//li[@class="minicart-empty-footer-item"]`)
        this.minicartRender = page.locator('//div[@class="minicart-container minicart-slide-down"]')
        this.viewCartButton = page.locator(`//div[@class="minicart-footer"]//a[normalize-space(text())="カートを見る"]`)
        this.checkoutButton = page.locator(`//div[@class="minicart-footer"]//a[normalize-space(text())="注文手続きへ"]`)
        this.amazonePayButton = page.locator('div.amazon-pay-onetime-button').locator('div.amazonpay-button-view1');
        this.removeProductModal = page.locator(`//div[@class="modal-content" and .//h4[normalize-space(text())="商品を削除しますか?"]]`)
        this.removeProdModalCloseButton = this.removeProductModal.locator(`xpath=.//button[span]`)
        this.removeProdModalConfirmButton = this.removeProductModal.locator(`xpath=.//button[normalize-space(text())="はい"]`)
        this.removeProdModalCancelButton = this.removeProductModal.locator(`xpath=.//button[normalize-space(text())="キャンセル"]`)
        this.minicartRemoveProdButton = page.locator(`(//div[contains(@class,"card product-info")])[1]//button[not(@data-price)]//span`)
    }

    // =========================
    // 🚀 Actions
    // =========================
    async removeAllProducts() {
        const count = await this.getNumberOfProducts();
        const removeButton = this.page.locator(`(//div[contains(@class,"card product-info")])[1]//button[not(@data-price)]//span`)
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])`)

        for (let i = 0; i < count; i++) {
            await step(`Remove product ${i + 1} in the minicart`, async () => {
                await clickUntil(this.page, this.cartIcon, this.minicartRender, 'visible', {
                    delayMs: 300,
                    maxTries: 3,
                    timeoutMs: 3000
                })

                await clickUntil(this.page, removeButton, this.removeProductModal, 'visible', {
                    delayMs: 300,
                    maxTries: 3,
                    timeoutMs: 3000
                })
                await this.click(this.removeProdModalConfirmButton, 'Confirm remove product')
                await this.waitFor(this.removeProductModal, 'hidden')
            })
        }

        await this.assertHidden(prod, 'Assert no products in the minicart')
    }
    // =========================
    // 📦 Helpers
    // =========================
    async isMinicartShown(): Promise<boolean> {
        const classAtt = await this.minicartModal.getAttribute('class')
        return classAtt?.includes('slide-down') ?? false
    }

    async getMinicartProdCollection(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])[${index}]//p[contains(@class,"collection-name")]`)

        return (await prod.innerText()).trim()
    }

    async getMinicartProdName(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])[${index}]//p[contains(@class,"product-name")]`)

        return (await prod.innerText()).trim()
    }

    async getMinicartProdPrice(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])[${index}]//span[@class="regular-price"]`)

        return (await prod.innerText()).trim()
    }

    async getNumberOfProducts(): Promise<number> {
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])`)

        return (await prod.count())
    }

    async getShippingCost(): Promise<string> {
        const shipping = this.page.locator(`//div[@class="shipping-cost"]`)

        return (await shipping.innerText()).trim()
    }

    async getTotalPrice(): Promise<string> {
        const total = this.page.locator(`//span[@class="grand-total"]`)

        return (await total.innerText()).trim()
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertFooterCategoryItemShownCorrectly() {
        const count = await this.footerCategoryItem.count();

        expect(count).toBe(3);
    }

}
