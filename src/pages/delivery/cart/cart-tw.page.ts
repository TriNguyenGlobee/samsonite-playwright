import { expect } from "@playwright/test";
import { PageUtils, delay, handlePwpModalIfPresent, t } from "../../../../utils/helpers/helpers";
import { CartPage } from "./cart.page";

export class CartPageTW extends CartPage {
    // =========================
    // 🚀 Actions
    // =========================
    async addProductToCartByIndex(index: number | number[]) {
        const indices = Array.isArray(index) ? index : [index];

        for (const i of indices) {
            await PageUtils.waitForPageLoad(this.page)

            const addButton = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"]//button[normalize-space(text())="${t.homepage('addtocart')}"])[${i}]`);

            await addButton.scrollIntoViewIfNeeded()

            await delay(300)

            await this.click(addButton, `Add product at index ${i} to cart`)

            await handlePwpModalIfPresent(this.page);

            let isAddOnItemModalVisible = await this.selectAddonItenModal.isVisible()

            if(isAddOnItemModalVisible){
                await this.click(this.selectAddonItenModalBtn, "Close Select Add-on Item modal")
            }

            await expect(this.minicartRender).toBeVisible({ timeout: 10000 })

            await this.hover(this.logoImg)

            await this.minicartRender.waitFor({ state: 'hidden', timeout: 10000 });
        }
    }

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> {
        return "0"
    }

    async getProdCollection(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"])[${index}]//div[@class="product-collection"]`)
        const prodCollection = (await prod.innerText()).trim()
        console.log(`Product collection Taiwan site: ${prodCollection}`)
        return prodCollection
    }

    async getProdName(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"])[${index}]//div[@class="pdp-link"]`)
        const prodName = (await prod.innerText()).trim()
        console.log(`Product Name Taiwan site: ${prodName}`)
        return prodName
    }

    async getProdPrice(index: number): Promise<string> {
        const prod = this.page.locator(`(//div[@class="product-grid row"]//div[normalize-space(@class)="product-tile"])[${index}]//span[@class="value"]`)
        const prodPrice = (await prod.innerText()).trim()
        console.log(`Product Price: ${prodPrice}`)
        return prodPrice
    }

    // =========================
    // ✅ Assertions
    // =========================

}
