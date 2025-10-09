import { Page, Locator, expect } from "@playwright/test";
import { BasePage } from "../../../base.page";
import { t, delay, PageUtils } from "../../../../../utils/helpers";
import { Config } from "../../../../../config/env.config";
import { attachment, step } from "allure-js-commons";
import { test } from "@playwright/test";

export class NewArrivalsPage extends BasePage {
    readonly logoImg: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
    }

    // =========================
    // 🚀 Actions
    // =========================

    // =========================
    // 📦 Helpers
    // =========================
    async isNewArrivalspageDisplayed(): Promise<boolean> {
        await PageUtils.waitForDomAvailable(this.page)
        try {
            const title = await this.page.title();
            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "new-arrivals/";

            await test.step("New Arrivals page data: ", async () => {
                await attachment("Current Page Title", title, "text/plain");
                await attachment("Expected Page Title", t.newarrivalspage('title'), "text/plain");
                await attachment("Current URL", currentUrl, "text/plain");
                await attachment("Expected URL", expectedUrl, "text/plain");
            });

            if (!title.includes(t.newarrivalspage('title'))) {
                return false;
            }

            if (!currentUrl.startsWith(expectedUrl)) return false;

            return true;
        } catch (error) {
            console.error('Error checking new arrivals page:', error);
            return false;
        }
    }

    async getPromotionMessage(prodIndex: number, description?: string): Promise<string | null> {
        return await step(description || "Get promotion message", async () => {
            const productMsg = this.prodItem.nth(prodIndex - 1).locator(`xpath=.//div[contains(@class,"product") and contains(@class,"message")]//span`).first()
            const productExplanations = this.prodItem.nth(prodIndex - 1).locator(`xpath=.//div[@class="promotions"]//div[contains(@class,"tooltip-explanation")]//span[@id="tooltip-popup"]`).first()
            if (await productMsg.count() > 0) {
                console.log(`Get Promotion Msg of Product at index ${prodIndex}`)
                return (await this.getText(productMsg, `Get Promotion Msg of Product at index ${prodIndex}`))?.trim() ?? null
            } else if (await productExplanations.count() > 0) {
                console.log(`Get Explanation Msg of Product at index ${prodIndex}`)
                return (await this.getText(productExplanations, `Get Explanation Msg of Product at index ${prodIndex}`))?.trim() ?? null
            } else return null
        });
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertNewArrivalsListItems(page: Page): Promise<void> {
        const listItems = page.locator('//div[@id="category-new-arrivals"]//li');
        const itemCount = await listItems.count();

        await delay(1000);

        for (let i = 0; i < itemCount; i++) {
            const li = listItems.nth(i);
            const links = li.locator('a');
            const linkCount = await links.count();

            if (i === itemCount - 1) {
                expect(linkCount).toBe(1);

                const lastLink = links.first();
                const lastHref = await lastLink.getAttribute('href');
                const lastText = await lastLink.textContent();

                expect(lastHref).toBe('https://ssjp.stg.samsonite-asia.com/new-arrivals/');
                expect(lastText?.trim()).toBe('すべて見る');

                console.log(`Item ${i + 1} (last) passed`);
            } else {
                expect(linkCount).toBe(2);

                const firstLink = links.nth(0);
                const secondLink = links.nth(1);

                const firstHref = await firstLink.getAttribute('href');
                const secondHref = await secondLink.getAttribute('href');

                expect(firstHref).not.toBeNull();
                expect(secondHref).not.toBeNull();
                expect(firstHref).toBe(secondHref);

                const pictureCount = await firstLink.locator('picture').count();
                expect(pictureCount).toBeGreaterThan(0);

                const text = await secondLink.textContent();
                expect(text?.trim().length).toBeGreaterThan(0);

                console.log(`Item ${i + 1} passed`);
            }
        }
    }
}
