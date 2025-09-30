import { test } from '@playwright/test';
import { loadTestData } from "../utils/data";

test('check fullscreen', async ({ page }) => {
    await page.goto('about:blank');
    const result = await page.evaluate(() => ({
        screen: { width: screen.width, height: screen.height },
        inner: { width: window.innerWidth, height: window.innerHeight },
        outer: { width: window.outerWidth, height: window.outerHeight },
    }));
    console.log(result);
});

test('check fullscreen', async ({ page }) => {
    const { carouselItems, hightlightCategoryItems, recommendedProductItems, campaignData } = loadTestData();

    console.log(`href of 1st element: ${carouselItems[1].href}`);
    console.log(`href of 1st element: ${carouselItems[1].href}`);
});
