import { CartPage } from "./cart.page"
import { extractNumber } from "../../../../utils/helpers"

export class CartPageSG extends CartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async getShippingDiscount(): Promise<string> {
        const shippingDiscount_1 = this.page.locator(`(//div[contains(@class,"cart-page")]//span[@class="applied-promotion-discount"])[1]`)
        const shippingDiscount_2 = this.page.locator(`(//div[contains(@class,"cart-page")]//span[@class="applied-promotion-discount"])[2]`)
        let shipingDiscount_1_num: number
        let shipingDiscount_2_num: number

        shipingDiscount_1_num = await extractNumber((await shippingDiscount_1.innerText()).trim())

        if (await shippingDiscount_2.isVisible()) {
            shipingDiscount_2_num = await extractNumber((await shippingDiscount_2.innerText()).trim())
        }

        return (shipingDiscount_1_num + shipingDiscount_2_num!).toString()
    }

    // =========================
    // ✅ Assertions
    // =========================

}
