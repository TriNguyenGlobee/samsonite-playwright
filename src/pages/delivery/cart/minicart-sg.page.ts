import { MinicartPage } from "./minicart.page"

export class MinicartPageSG extends MinicartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================

    async getShippingDiscount(): Promise<string> {
        const shippingDiscount = this.page.locator(`//span[@class="applied-promotion-discount"]`)

        return (await shippingDiscount.innerText()).trim()
    }

    // =========================
    // ✅ Assertions
    // =========================

}
