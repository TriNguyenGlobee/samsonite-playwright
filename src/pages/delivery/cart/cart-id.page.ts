import { CartPage } from "./cart.page"
import { extractNumber } from "../../../../utils/helpers/helpers"

export class CartPageID extends CartPage {

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async getShippingDiscount(): Promise<string> { return "0" }

    // =========================
    // ✅ Assertions
    // =========================

}
