import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";

export class CartPage extends BasePage {
    readonly removeProductButton: Locator;

    constructor(page: Page) {
        super(page);
        this.removeProductButton = page.locator(`//div[contains(@class,"cart-page")]//div[@class="line-item-header"]//div[not(contains(@class,"hidden"))]//button[span]`)

    }

    // =========================
    // 🚀 Actions
    // =========================
    /**
    * Add product to cart by collection;name list
     * @param page Playwright Page
    * @param items Array with format ['collection1;name1', 'collection2;name2', ...]
    */
    async addProductsToCartByNameType(page: Page, items: string[]) {
        for (const item of items) {
            const [collect, name] = item.split(';').map(s => s.trim());

            const xpath = `//div[@class="tile-group-left"[.//a[text()="${collect}"] and .//a[text()="${name}"]]]//ancestor::div[contains(@class,"product-tile ")]//button[contains(text(),"Add to Cart")]`;
            const addButton = page.locator(`xpath=${xpath}`);

            await this.click(addButton, `Add product: ${collect} - ${name} to cart`);
        }
    }

    /**
     * Add product to cart by index
     */
    async addProductToCartByIndex(index: number | 1) {
        const addButton = this.page.locator(`(//button[normalize-space(text())="Add to Cart"])[${index}]`);
        await this.click(addButton, `Add product at index ${index} to cart`);
    }

    async removeAllProducts() {
        const count = await this.removeProductButton.count();

        for (let i = 0; i < count; i++) {
            await this.removeProductButton.nth(0).click();
        }
    }
    
    // =========================
    // 📦 Helpers
    // =========================
    async getCartBadgeValue() {
        if (!(await this.cartBadge.isVisible())) return 0;

        const text = (await this.cartBadge.textContent())?.trim();
        return parseInt(text || '0', 10);
    }


    // =========================
    // ✅ Assertions
    // =========================

}
