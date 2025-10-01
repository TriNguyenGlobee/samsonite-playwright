import { CartPage } from "./cart.page"

export class CartPageSG extends CartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async getShippingDiscount(): Promise<string> {
        const shippingDiscount = this.page.locator(`//div[contains(@class,"cart-page")]//span[@class="applied-promotion-discount"]`)

        return (await shippingDiscount.innerText()).trim()
    }

    // =========================
    // ✅ Assertions
    // =========================

}
