import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { t, PageUtils, delay } from "../../../../utils/helpers";

export class CartPage extends BasePage {
    readonly removeProductButton: Locator;
    readonly pageTitle: Locator;
    readonly emptymsg: Locator;
    readonly minicartRender: Locator;

    constructor(page: Page) {
        super(page);
        this.removeProductButton = page.locator(`//div[contains(@class,"cart-page")]//div[@class="line-item-header"]//div[not(contains(@class,"hidden"))]//button[span]`)
        this.pageTitle = page.locator('//div[contains(@class,"title")]//h1');
        this.emptymsg = page.locator('//div[contains(@class,"cart-empty")]//h2')
        this.minicartRender = page.locator('//div[@class="minicart-container minicart-slide-down"]')
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
    async addProductToCartByIndex(index: number | number[]) {
        const indices = Array.isArray(index) ? index : [index];

        for (const i of indices) {
            const addButton = this.page.locator(`(//button[normalize-space(text())="${t.homepage('addtocart')}"])[${i}]`);

            await this.click(addButton, `Add product at index ${i} to cart`)
            //await delay(5000)

            await this.waitFor(this.minicartRender)

            await expect(this.minicartRender).toBeHidden();
        }
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
    async isCartPageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.cartpage('title'))) {
                return false;
            }

            const elementsToCheck = [
                this.pageTitle,
                this.emptymsg,
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

    async getCartBadgeValue() {
        if (!(await this.cartBadge.isVisible())) return 0;

        const text = (await this.cartBadge.textContent())?.trim();
        return parseInt(text || '0', 10);
    }


    // =========================
    // ✅ Assertions
    // =========================

}
