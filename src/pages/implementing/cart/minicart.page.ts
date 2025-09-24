import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";

export class MinicartPage extends BasePage {
    readonly minicartModal: Locator;
    readonly emptyCartMsg: Locator;
    readonly startShoppingButton: Locator;
    readonly exploreByCategoryText: Locator;
    readonly footerCategoryItem: Locator;
    readonly minicartRender: Locator;

    constructor(page: Page) {
        super(page);
        this.minicartModal = page.locator('//div[contains(@class,"minicart-container")]')
        this.emptyCartMsg = this.minicartModal.locator(`xpath=.//div[@class="minicart-empty-message"]`)
        this.startShoppingButton = this.minicartModal.locator(`xpath=.//button[normalize-space(text())="お買い物を続ける"]`)
        this.exploreByCategoryText = this.minicartModal.locator(`xpath=.//span[@class="minicart-empty-footer-title"]`)
        this.footerCategoryItem = this.minicartModal.locator(`xpath=.//li[@class="minicart-empty-footer-item"]`)
        this.minicartRender = page.locator('//div[@class="minicart-container minicart-slide-down"]')
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isMinicartShown(): Promise<boolean>{
        const classAtt = await this.minicartModal.getAttribute('class')
        return classAtt?.includes('slide-down') ?? false
    }

    async getMinicartProdCollection (index: number): Promise<string>{
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])[${index}]//p[contains(@class,"collection-name")]`)

        return (await prod.innerText()).trim()
    }

    async getMinicartProdName (index: number): Promise<string>{
        const prod = this.page.locator(`(//div[contains(@class,"card product-info")])[${index}]//p[contains(@class,"product-name")]`)

        return (await prod.innerText()).trim()
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertFooterCategoryItemShownCorrectly() {
        const count = await this.footerCategoryItem.count();

        expect(count).toBe(3);
    }

}
