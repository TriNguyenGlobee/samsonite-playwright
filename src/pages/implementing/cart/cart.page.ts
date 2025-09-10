import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";

export class CartPage extends BasePage {

    constructor(page: Page) {
        super(page);

    }

    // =========================
    // 🚀 Actions
    // =========================
    async removeFromCart(productName: string) {
        const productLocator = this.page.locator(`//div[@class="cart_item" and .//div[contains(text(), "${productName}")]]`);
        const removeButton = productLocator.locator('xpath=.//button[text()="Remove"]');
        await step(`Click "Remove" button for product: ${productName}`, async () => {
            await this.click(removeButton, `Click "Remove" button for product: ${productName}`);
        });
    }

    // =========================
    // 📦 Helpers
    // =========================


    // =========================
    // ✅ Assertions
    // =========================
    async assertProductRemoved(productName: string) {
        const productLocator = this.page.locator(`//div[@class="cart_item" and .//div[contains(text(), "${productName}")]]`);
        await step(`Assert the product "${productName}" removed`, async () => {
            await expect(productLocator).toHaveCount(0);
        });
    }

    async assertProductExists(productName: string) {
        const productLocator = this.page.locator(`//div[@class="cart_item" and .//div[contains(text(), "${productName}")]]`);
        await step(`Assert the product "${productName}" exist`, async () => {
            await expect(productLocator).toHaveCount(1);
        });
    }
}
