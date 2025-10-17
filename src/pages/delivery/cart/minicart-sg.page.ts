import { MinicartPage } from "./minicart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class MinicartPageSG extends MinicartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> {
        const shippingDiscount_1 = this.page.locator(`(//span[@class="applied-promotion-discount"])[1]`)
        const shippingDiscount_2 = this.page.locator(`(//span[@class="applied-promotion-discount"])[2]`)

        let shippingDiscount_1_num: number
        let shippingDiscount_2_num: number

        shippingDiscount_1_num = await extractNumber((await shippingDiscount_1.innerText()).trim())

        if (await shippingDiscount_2.isVisible()) {
            shippingDiscount_2_num = await extractNumber((await shippingDiscount_2.innerText()).trim())
        }

        return (shippingDiscount_1_num + shippingDiscount_2_num!).toString()
    }

    // =========================
    // ✅ Assertions
    // =========================

}
