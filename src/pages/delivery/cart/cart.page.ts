import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../base.page";
import { step } from "allure-js-commons";
import { t, PageUtils, clickUntil, delay } from "../../../../utils/helpers";

export class CartPage extends BasePage {
    readonly removeProductButton: Locator;
    readonly pageTitle: Locator;
    readonly emptymsg: Locator;
    readonly minicartRender: Locator;
    readonly removeProductModal: Locator;
    readonly removeProdModalCloseButton: Locator;
    readonly removeProdModalConfirmButton: Locator;
    readonly removeProdModalCancelButton: Locator;
    readonly checkoutButton: Locator;
    readonly amazonePayButton: Locator;
    readonly prodRow: Locator;
    readonly giftserviceButton: Locator;
    readonly prodGiftRow: Locator;
    readonly giftPopup: Locator;
    readonly giftCheckbox: Locator;
    readonly addGiftButton: Locator;
    readonly removeGiftServiceButton: Locator;

    constructor(page: Page) {
        super(page);
        this.removeProductButton = page.locator(`//div[contains(@class,"cart-page")]//div[@class="line-item-header"]//div[not(contains(@class,"hidden"))]//button[span]`)
        this.pageTitle = page.locator('//div[contains(@class,"title")]//h1');
        this.emptymsg = page.locator('//div[contains(@class,"cart-empty")]//h2')
        this.minicartRender = page.locator('//div[@class="minicart-container minicart-slide-down"]')
        this.removeProductModal = page.locator(`//div[@class="modal-content" and .//h4[normalize-space(text())="商品を削除しますか?"]]`)
        this.removeProdModalCloseButton = this.removeProductModal.locator(`xpath=.//button[span]`)
        this.removeProdModalConfirmButton = this.removeProductModal.locator(`xpath=.//button[normalize-space(text())="はい"]`)
        this.removeProdModalCancelButton = this.removeProductModal.locator(`xpath=.//button[normalize-space(text())="キャンセル"]`)
        this.checkoutButton = page.locator(`//div[contains(@class,"cart-page")]//a[normalize-space(text())="注文手続きへ"]`)
        this.amazonePayButton = page.locator(`//div[contains(@class,"cart-page")]//div[contains(@class,"amazon-pay-onetime-button")]`).locator('div.amazonpay-button-view1');
        this.prodRow = page.locator(`//div[contains(@class,"cart-page")]//div[contains(@class,"card product-info")]`)
        this.giftserviceButton = this.prodRow.locator(`xpath=.//button[contains(@class,"add-gift")]`)
        this.prodGiftRow = this.prodRow.locator(`xpath=.//div[contains(@class,"row product-gift-card")]`)
        this.giftPopup = page.locator(`//nav[@class="gift-popup active"]//div[@class="popup-content"]`)
        this.giftCheckbox = this.giftPopup.locator(`xpath=.//label[@for="isGift"]`)
        this.addGiftButton = this.giftPopup.locator(`xpath=.//button[contains(@class,"add-gift")]`)
        this.removeGiftServiceButton = this.prodGiftRow.locator(`xpath=.//button[contains(@class,"remove-gift")]`)
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

    async addGiftService(index: number) {
        await this.click(this.giftserviceButton.nth(index - 1), `Click gift service button at index ${index}`)
        await this.giftPopup.waitFor({ state: 'visible' })

        await this.giftCheckbox.click();
        await expect(this.giftCheckbox).toBeChecked();

        await this.click(this.addGiftButton)
        await PageUtils.waitForDomAvailable(this.page)
    }

    async removeGiftService(index: number) {
        await PageUtils.waitForDomAvailable(this.page)
        await this.removeGiftServiceButton.scrollIntoViewIfNeeded()

        await this.click(this.removeGiftServiceButton.nth(index - 1), `Click remove gift service button at index ${index}`)
        await PageUtils.waitForDomAvailable(this.page)
    }

    /**
     * Add product to cart by index
     */
    async addProductToCartByIndex(index: number | number[]) {
        const indices = Array.isArray(index) ? index : [index];

        for (const i of indices) {
            const addButton = this.page.locator(`(//button[normalize-space(text())="${t.homepage('addtocart')}"])[${i}]`);

            await addButton.scrollIntoViewIfNeeded()

            await delay(300)

            await Promise.all([
                await this.click(addButton, `Add product at index ${i} to cart`),
                expect(this.minicartRender).toBeVisible({ timeout: 5000 })
            ]);

            await expect(this.minicartRender).toBeHidden();
        }
    }

    async removeAllProducts() {
        const count = await this.removeProductButton.count();

        for (let i = 0; i < count; i++) {
            await step(`Remove product ${i + 1} in the Cart page`, async () => {
                await clickUntil(this.page, this.removeProductButton.first(), this.removeProductModal, 'visible', {
                    delayMs: 300,
                    maxTries: 3,
                    timeoutMs: 3000
                })
                await this.click(this.removeProdModalConfirmButton, 'Confirm remove product')
                await this.removeProductModal.waitFor({ state: 'hidden' })

                await PageUtils.waitForDomAvailable(this.page, 6000)

                if (count - (i + 1) == 0) {
                    await this.removeProductButton.waitFor({ state: "hidden", timeout: 10000 })
                }

                await expect(this.removeProductButton).toHaveCount(count - (i + 1))
            })
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

    async getCartPageProdCollection(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[contains(@class,"cart-page")]//div[contains(@class,"card product-info")])[${index}]//p[contains(@class,"collection-name")]`)

        return (await prod.innerText()).trim()
    }

    async getCartPageProdName(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[contains(@class,"cart-page")]//div[contains(@class,"card product-info")])[${index}]//p[contains(@class,"product-name")]`)

        return (await prod.innerText()).trim()
    }

    async getCartPageProdPrice(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[contains(@class,"cart-page")]//div[contains(@class,"card product-info")])[${index}]//span[@class="regular-price"]`)

        return (await prod.innerText()).trim()
    }

    async getNumberOfProducts(): Promise<number> {
        const prod = this.page.locator(`(//div[contains(@class,"cart-page")]//div[contains(@class,"card product-info")])`)

        return (await prod.count())
    }

    async getShippingCost(): Promise<string> {
        const shipping = this.page.locator(`//div[contains(@class,"cart-page")]//div[@class="shipping-cost"]`)

        return (await shipping.innerText()).trim()
    }

    async getTotalPrice(): Promise<string> {
        const total = this.page.locator(`//div[contains(@class,"grand-total")]`)

        return (await total.innerText()).trim()
    }
    // =========================
    // ✅ Assertions
    // =========================

}
