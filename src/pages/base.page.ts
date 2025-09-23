import { Page, Locator, expect } from "@playwright/test";
import { step } from "allure-js-commons";
import { I18n, Translations } from "../../config/i18n.config";
import { t, PageUtils } from "../../utils/helpers";

type RightNavbarItem = 'search' | 'wishlist' | 'login' | 'location' | 'cart' | 'news';

export class BasePage {
    protected readonly page: Page;
    readonly shoppingCartButton: Locator;
    readonly headerNavBar: Locator;
    readonly newArrivalsMenuItem: Locator;
    readonly luggageMenuItem: Locator;
    readonly backPacksMenuItem: Locator;
    readonly bagsMenuItem: Locator;
    readonly labelsMenuItem: Locator;
    readonly offersMenuItem: Locator;
    readonly discoverMenuItem: Locator;
    readonly friendsOfSamsoniteMenuItem: Locator;
    readonly saleMenuItem: Locator;
    readonly rightNavbar: Locator;
    readonly searchIcon: Locator;
    readonly wishlistIcon: Locator;
    readonly loginIcon: Locator;
    readonly locationIcon: Locator;
    readonly cartIcon: Locator;
    readonly newsIcon: Locator;
    readonly usericon: Locator;
    readonly ginzaFlagshipStore: Locator;
    readonly cartBadge: Locator;
    readonly viewCartButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.shoppingCartButton = page.locator('//div[@id="shopping_cart_container"]');
        this.headerNavBar = page.locator('//div[contains(@class,"header-content")]//ul[@class="nav navbar-nav"]');
        this.newArrivalsMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('newarrivals')}"]`);
        this.luggageMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('luggage')}"]`);
        this.backPacksMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('backpacks')}"]`);
        this.bagsMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('bags')}"]`);
        this.labelsMenuItem = this.headerNavBar.locator(`xpath=.//a[@class="nav-link dropdown-toggle" and normalize-space(text())="${t.menuItem('label')}"]`);
        this.offersMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('offers')}"]`);
        this.discoverMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('discover')}"]`);
        this.ginzaFlagshipStore = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="銀座 旗艦店"]`);
        this.friendsOfSamsoniteMenuItem = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${t.menuItem('friendofsamsonite')}"]`);
        this.saleMenuItem = this.headerNavBar.locator('xpath=.//a[normalize-space(text())="セール"]');
        this.rightNavbar = page.locator('//div[contains(@class,"right navbar-header")]');
        this.searchIcon = this.rightNavbar.locator('xpath=.//button[i[contains(@class,"search")]]');
        this.wishlistIcon = this.rightNavbar.locator('xpath=.//a[i[contains(@class,"heart")]]');
        this.loginIcon = this.rightNavbar.locator(`xpath=.//a[span[contains(text(),"${t.homepage('loginRegister')}")]]`);
        this.locationIcon = this.rightNavbar.locator('xpath=.//a[i[contains(@class,"location")]]');
        this.cartIcon = this.rightNavbar.locator('xpath=.//a[contains(@class,"minicart")]');
        this.newsIcon = this.rightNavbar.locator('xpath=.//a[contains(@class,"news-icon")]');
        this.usericon = this.rightNavbar.locator('xpath=.//div[contains(@class,"user")]');
        this.cartBadge = this.cartIcon.locator('xpath=.//span[@class="minicart-quantity"]');
        this.viewCartButton = page.locator(`//div[@id="miniCartModal"]//a[contains(text(),"View Cart")]`)
    }

    // =========================
    // 🚀 Actions
    // =========================
    async goto(url: string) {
        await step(`Go to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    async click(locator: Locator, description?: string) {
        await step(description || "Click on locator", async () => {
            await locator.click();
        });
    }

    async type(locator: Locator, text: string, description?: string) {
        await step(description || `Type text: ${text}`, async () => {
            await locator.fill(text);
        });
    }

    async hover(locator: Locator, description?: string) {
        await step(description || "Hover on locator", async () => {
            await locator.hover();
        });
    }

    async goBack(pageName: string) {
        await step(`Goback to ${pageName} page`, async () => {
            await this.page.goBack();
        });
    }

    async pause() {
        await step("Pause", async () => {
            await this.page.pause();
        });
    }

    async clickMenuItem(menuItemKey: keyof Translations['menuItem'], description?: string): Promise<void> {
        const menuItemText = t.menuItem(menuItemKey);
        const menuItemLocator = this.headerNavBar.locator(`xpath=.//a[normalize-space(text())="${menuItemText}"]`);

        if (description) {
            console.log(`Click menu: ${description} (${menuItemText})`);
        }

        await menuItemLocator.scrollIntoViewIfNeeded();
        await menuItemLocator.click();
    }

    async clickRightNavbarItem(item: RightNavbarItem, description?: string): Promise<void> {
        const itemMap: Record<RightNavbarItem, Locator> = {
            search: this.searchIcon,
            wishlist: this.wishlistIcon,
            login: this.loginIcon,
            location: this.locationIcon,
            cart: this.cartIcon,
            news: this.newsIcon,
        };

        const target = itemMap[item];

        await step(description || `Click right navbar item: ${item}`, async () => {
            await target.scrollIntoViewIfNeeded();
            await target.click();
        });
    }

    async goToTrackOrderPage(): Promise<void> {
        await step("Go to Track Order Page", async () => {
            const trackOrderLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('trackOder')}"]`
            );

            await step("Hover over Login/Register icon", async () => {
                await this.loginIcon.hover();
            });

            await step("Click on 'Track Order' link", async () => {
                await trackOrderLink.waitFor({ state: 'visible' });
                await trackOrderLink.click();
            });
        });
    }

    async goToLoginRegisterPage(): Promise<void> {
        await step("Go to Login/Register Page", async () => {
            const loginRegisterLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('loginRegister')}"]`
            );

            await step("Hover over Login/Register icon", async () => {
                await this.loginIcon.hover();
            });

            await step("Click on 'Login/Register' link", async () => {
                await loginRegisterLink.waitFor({ state: 'visible' });
                await loginRegisterLink.click();
            });
        });
    }

    async goToMyAccountPage(): Promise<void> {
        await step("Go to My Account Page", async () => {
            const myAccountLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('myaccount')}"]`
            );

            await step("Hover over Login/Register icon", async () => {
                await this.loginIcon.hover();
            });

            await step("Click on 'My Account' link", async () => {
                await myAccountLink.waitFor({ state: 'visible' });
                await myAccountLink.click();
            });
        });
    }

    async goToCartPage(): Promise<void> {
        await step("Go to Cart Page", async () => {
            await this.click(this.cartIcon, `Click on Cart Icon`)
            await this.viewCartButton.waitFor({ state: 'visible' });
            await this.click(this.viewCartButton, `Click on Viewcart button`)
        });
    }

    async logout(): Promise<void> {
        await step("Logout", async () => {
            const logoutLink = this.page.locator(
                `//div[contains(@class,"right navbar-header")]//a[normalize-space(text())="${t.homepage('logout')}"]`
            );
            await step("Hover over Login/Register icon", async () => {
                await this.usericon.hover();
            });

            await step("Click on 'Logout' link", async () => {
                await logoutLink.waitFor({ state: 'visible' });
                await logoutLink.click();
            });
        });
    }

    // =========================
    // 📦 Helpers
    // =========================
    async getText(locator: Locator, description?: string): Promise<string | null> {
        return await step(description || "Get text from locator", async () => {
            return locator.textContent();
        });
    }

    async isVisible(locator: Locator, description?: string): Promise<boolean> {
        return await step(description || "Check locator visible", async () => {
            return locator.isVisible();
        });
    }

    async waitFor(locator: Locator, description?: string) {
        await step(description || "Wait for locator visible", async () => {
            await locator.waitFor();
        });
    }

    async getLocatorURL(locate: Locator, description?: string): Promise<string | null> {
        return await step(description || "Get Locator URL", async () => {
            let link = locate.locator(`xpath=.//a`).first()
            const isVisible = await link.isVisible()
            if (!isVisible) {
                link = locate.locator(`xpath=./parent::a`)
            }
            return link.getAttribute('href')
        })
    }

    async getProdCollection(index: number): Promise<string>{
        const prod = this.page.locator(`(//div[@class="product"])[${index}]//div[@class="product-collection"]`)

        return (await prod.innerText()).trim()
    }

    async getProdName(index: number): Promise<string>{
        const prod = this.page.locator(`(//div[@class="product"])[${index}]//div[@class="pdp-link"]`)

        return (await prod.innerText()).trim()
    }

    // =========================
    // ✅ Assertions
    // =========================
    async assertVisible(locator: Locator, description?: string) {
        await step(description || "Assert element visible", async () => {
            await expect(locator).toBeVisible();
        });
    }

    async assertUrl(expectedUrl: string | RegExp, description?: string) {
        await expect(this.page, description || "Check current URL").toHaveURL(expectedUrl);
    }

    async assertArraySorted(locator: Locator, expectedOrder: string[], description?: string) {
        await step(description || "Assert array sorted", async () => {
            const items = await locator.allTextContents();
            expect(items).toEqual(expectedOrder);
        });
    }

    async assertShoppingCartBadgeValue(expectedValue: string, description?: string) {
        await step(description || `Assert shopping cart badge value: ${expectedValue}`, async () => {
            const badge = this.shoppingCartButton.locator('xpath=.//span[@class="shopping_cart_badge"]');
            const badgeValue = await badge.textContent();
            expect(badgeValue).toBe(expectedValue);
        });
    }

    async assertShoppingCartBadgeRemoved(description?: string) {
        await step(description || "Assert Shopping Cart Badge Removed", async () => {
            const badge = this.shoppingCartButton.locator('xpath=.//span[@class="shopping_cart_badge"]');
            await expect(badge).toHaveCount(0);
        });
    }

    async assertPageTitle(expectedTitle: string, description?: string) {
        await step(description || "Assert Page Title", async () => {
            const title = await this.page.title();
            await expect(this.page).toHaveTitle(expectedTitle);
            await expect(title).toBe(expectedTitle);
        })
    }

    /**
     * Check items list for category menu
     * @param baseLocator The base locator containing the <ul>
     * @param ulClass The class of the <ul> to locate (if undefined, use baseLocator directly)
     * @param items The expected items with text and href
     * @param options Additional options:
     *   - twoLinksPerLi: whether each <li> has two <a> tags (default: true)
     *   - lastItemIsTextOnly: whether the last item is text only (default: false)
     *   - checkPictureTag: whether to check for <picture> tag in the first <a> (default: true)
     */
    async assertItemsListForCategoryMenu(
        baseLocator: ReturnType<Page['locator']>,
        ulClass: string | undefined,
        items: { text: string; href: string }[],
        options?: {
            twoLinksPerLi?: boolean;
            lastItemIsTextOnly?: boolean;
            checkPictureTag?: boolean;
        }
    ) {
        const { twoLinksPerLi = true, lastItemIsTextOnly = false, checkPictureTag = true } = options ?? {};

        const ul = ulClass
            ? baseLocator.locator(`xpath=.//ul[contains(@class,"${ulClass}") and @role="menu"]`)
            : baseLocator;

        const lis = ul.locator('xpath=.//li');
        await expect(lis, `<ul> ${ulClass ?? 'root'} should have ${items.length} <li>`).toHaveCount(items.length);

        for (let i = 0; i < items.length; i++) {
            const li = lis.nth(i);
            const links = li.locator('xpath=.//a');
            const expected = items[i];

            const isTextOnly = !twoLinksPerLi || (lastItemIsTextOnly && i === items.length - 1);

            if (isTextOnly) {
                await expect(links).toHaveCount(1);
                const a = links.first();
                await expect(a).toHaveAttribute('href', expected.href);
                await expect(a).toContainText(expected.text);
            } else {
                await expect(links).toHaveCount(2);
                const picA = links.nth(0);
                const textA = links.nth(1);

                await expect(picA).toHaveAttribute('href', expected.href);
                await expect(textA).toHaveAttribute('href', expected.href);
                await expect(textA).toContainText(expected.text);

                if (checkPictureTag) {
                    await expect(picA.locator('picture')).toHaveCount(1);
                }
            }
        }
    }

    // Check Locator Inside
    // Assert correct href, text
    // check image? exist
    async assertLocatorInside(locate: Locator, data: LocatorInside) {
        if (data.href) {
            const link = locate.locator('xpath=.//a');
            await expect(link).toHaveAttribute('href', data.href)
        }

        if (data.hasImage) {
            const img = locate.locator('xpath=.//img');
            await expect(img).toHaveCount(1)
            const srcAttr = await img.getAttribute('src') || await img.getAttribute('data-src');
            expect(srcAttr).toMatch(/.+\.(jpg|jpeg|png|webp|svg)/);
        }

        if (data.text) {
            await expect(locate).toContainText(data.text);
        }
    }

    async assertNavigatedURLByClickLocator(page: Page, locate: Locator, url: string, description?: string) {
        await step(description || `Assert expected URL is: ${url}`, async () => {
            let link = locate.locator('xpath=.//a');

            const isVisible = await link.isVisible()

            if (!isVisible) {
                link = locate
            }

            const [newPage] = await Promise.all([
                page.context().waitForEvent('page'),
                link.click({ button: 'middle' }),
            ]);

            await newPage.waitForLoadState('domcontentloaded');
            const currentUrl = newPage.url()

            await expect(currentUrl).toContain(url);

            await newPage.close();
        })
    }
}

interface LocatorInside {
    href?: string;
    hasImage?: boolean;
    text?: string;
}