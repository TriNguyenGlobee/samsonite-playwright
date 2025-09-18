import { test } from '@playwright/test';

test('check fullscreen', async ({ page }) => {
    await page.goto('about:blank');
    const result = await page.evaluate(() => ({
        screen: { width: screen.width, height: screen.height },
        inner: { width: window.innerWidth, height: window.innerHeight },
        outer: { width: window.outerWidth, height: window.outerHeight },
    }));
    console.log(result);
});
