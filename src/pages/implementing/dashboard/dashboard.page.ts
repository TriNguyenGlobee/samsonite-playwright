import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { isSorted } from "../../../../utils/helpers";

export class DashboardPage extends BasePage {
    readonly pageTitle: Locator;
    readonly shoppingCartButton: Locator;
    readonly cartIcon: Locator;
    readonly productsSortComboBox: Locator;

    constructor(page: Page) {
        super(page);
        this.pageTitle = page.locator('//div[@class="app_logo"]');
        this.shoppingCartButton = page.locator('//div[@id="shopping_cart_container"]');
        this.cartIcon = page.locator('//div[@id="shopping_cart_container"]');
        this.productsSortComboBox = page.locator('//select[@class="product_sort_container"]');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async addToCart(productName: string) {
        const productLocator = this.page.locator(`//div[contains(@class, "inventory_item") and .//div[contains(text(), "${productName}")]]`);
        const addToCartButton = productLocator.locator('xpath=.//button[text()="Add to cart"]');
        await step(`Click "Add to cart" button for product: ${productName}`, async () => {
            await this.click(addToCartButton, `Click "Add to cart" button for product: ${productName}`);
        });
    }

    async addToCartByIndex(index: number) {
        const productLocator = this.page.locator(`//div[@class="inventory_list"]//div[@class="inventory_item"][${index}]`);
        const addToCartButton = productLocator.locator('xpath=.//button[text()="Add to cart"]');
        await step(`Click "Add to cart" button for product at: ${index}`, async () => {
            await this.click(addToCartButton, `Click "Add to cart" button for product at: ${index}`);
        });
    }

    async goToCart() {
        await step("Go to cart", async () => {
            await this.click(this.shoppingCartButton, "Click cart button");
        });
    }

    async selectProductSortOption(option: string) {
        await step(`Select product sort option: ${option}`, async () => {
            await this.productsSortComboBox.selectOption(option);
        });
    }

    // =========================
    // 📦 Helpers
    // =========================
    async getProductNames(): Promise<(string | null)[]> {
        return await step("Get product names list", async () => {
            const productNames = [];
            const products = this.page.locator('//div[normalize-space(@class) = "inventory_item_name"]');
            for (let i = 0; i < await products.count(); i++) {
                productNames.push(await products.nth(i).textContent());
            }
            return productNames;
        });
    }

    async getProductPrices(): Promise<(number | null)[]> {
        return await step("Get product prices list", async () => {
            const productPrices = [];
            const prices = this.page.locator('//div[normalize-space(@class) = "inventory_item_price"]');
            for (let i = 0; i < await prices.count(); i++) {
                const priceStr = await prices.nth(i).textContent();
                const priceNum = priceStr ? parseFloat(priceStr.slice(1)) : null;
                productPrices.push(priceNum);
            }
            return productPrices;
        });
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertRemovebuttonVisible(productName: string) {
        const productLocator = this.page.locator(`//div[contains(@class,"inventory_item") and .//div[contains(text(), "${productName}")]]`);
        const removeButton = productLocator.locator('xpath=.//button[text()="Remove"]');
        await step(`Assert "Remove" button displayed for product: ${productName}`, async () => {
            await this.assertVisible(removeButton, `"Remove" button for product: ${productName} displayed`);
        });
    }

    async assertAddToCartButtonInvisible(productName: string) {
        const productLocator = this.page.locator(`//div[contains(@class,"inventory_item") and .//div[contains(text(), "${productName}")]]`);
        const addToCartButton = productLocator.locator('xpath=.//button[text()="Add to cart"]');
        await step(`Assert "Add to cart" button do not displayed for product: ${productName}`, async () => {
            await expect(addToCartButton).toBeHidden(); 
        });
    }

    async assertProductsSortedByName(order: "asc" | "desc") {
        const productNamesWithNull = await this.getProductNames();
        const productNames = productNamesWithNull.filter(
            (name): name is string => name !== null
        );

        await step(`Assert products sorted by name (${order})`, async () => {
            expect(isSorted(productNames, order)).toBe(true);
        });
    }

    async assertProductsSortedByPrice(order: "asc" | "desc") {
        const productPricesWithNull = await this.getProductPrices();
        const productPrices = productPricesWithNull.filter(
            (price): price is number => price !== null
        );

        await step(`Assert products sorted by price (${order})`, async () => {
            expect(isSorted(productPrices, order)).toBe(true);
        });
    }
}
