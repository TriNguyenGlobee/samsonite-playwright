import { Page, Locator, expect } from "@playwright/test";
import { step } from "allure-js-commons";

export class BasePage {
    protected readonly page: Page;
    readonly shoppingCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartButton = page.locator('//div[@id="shopping_cart_container"]');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async goto(url: string) {
        await step(`Go to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async click(locator: Locator, description?: string) {
        await step(description || "Click on locator", async () => {
            await locator.click();
        });
    }

    async type(locator: Locator, text: string, description?: string) {
        await step(description || `Type text: ${text}`, async () => {
            await locator.fill(text);
        });
    }

    // =========================
    // 📦 Helpers
    // =========================
    async getText(locator: Locator, description?: string): Promise<string | null> {
        return await step(description || "Get text from locator", async () => {
            return locator.textContent();
        });
    }

    async isVisible(locator: Locator, description?: string): Promise<boolean> {
        return await step(description || "Check locator visible", async () => {
            return locator.isVisible();
        });
    }

    async waitFor(locator: Locator, description?: string) {
        await step(description || "Wait for locator visible", async () => {
            await locator.waitFor();
        });
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertVisible(locator: Locator, description?: string) {
        await step(description || "Assert element visible", async () => {
            await expect(locator).toBeVisible();
        });
    }

    async assertUrl(expectedUrl: string | RegExp, description?: string) {
        await expect(this.page, description || "Check current URL").toHaveURL(expectedUrl);
    }

    async assertArraySorted(locator: Locator, expectedOrder: string[], description?: string) {
        await step(description || "Assert array sorted", async () => {
            const items = await locator.allTextContents();
            expect(items).toEqual(expectedOrder);
        });
    }

    async assertShoppingCartBadgeValue(expectedValue: string) {
        await step(`Assert shopping cart badge value: ${expectedValue}`, async () => {
            const badge = this.shoppingCartButton.locator('xpath=.//span[@class="shopping_cart_badge"]');
            const badgeValue = await badge.textContent();
            expect(badgeValue).toBe(expectedValue);
        });
    }

    async assertShoppingCartBadgeRemoved() {
        await step("Assert Shopping Cart Badge Removed", async () => {
            const badge = this.shoppingCartButton.locator('xpath=.//span[@class="shopping_cart_badge"]');
            await expect(badge).toHaveCount(0);
        });
    }
}
