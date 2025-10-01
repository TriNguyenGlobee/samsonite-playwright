import { Page, Locator } from '@playwright/test';
import { I18n, Translations } from "../config/i18n.config";
import { test, expect } from '@playwright/test';

/**
 * **************************************************************************
 * **************************************************************************
 * 📦 Helpers
 * {Helper functions}
 * Non-used directly on the site or in test cases
 * These are non-actions
 * **************************************************************************
 * **************************************************************************
 */

/**
 * Wait for page load complete
 */
async function waitForPageLoadComplete(page: Page, timeout: number = 20000): Promise<void> {
  await page.waitForLoadState('load', { timeout });
  await page.waitForLoadState('networkidle', { timeout });
}

async function waitForDomAvailable(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForLoadState('domcontentloaded', { timeout });
}

async function waitForPageLoad(page: Page, timeout: number = 10000): Promise<void> {
  await page.waitForLoadState('load', { timeout });
}

export const PageUtils = {
  waitForPageLoadComplete,
  waitForDomAvailable,
  waitForPageLoad
};

/**
 * Waits for an element to exist in the DOM.
 */
async function waitForElement(locator: Locator, timeout: number = 5000): Promise<void> {
  await locator.waitFor({ state: 'attached', timeout });
}

/**
 * Waits for an element to be visible (displayed on screen).
 */
async function waitForElementVisible(locator: Locator, timeout: number = 5000): Promise<void> {
  await locator.waitFor({ state: 'visible', timeout });
}

// Group into one exportable utility object
export const DOMUtils = {
  waitForElement,
  waitForElementVisible,
};

/**
 * Generate a new random sequence of numbers along with a timestamp.
 * Format: yyyyMMddHHmmssSSS + random(3 digits)
 */
export function generateReadableTimeBasedId(): string {
  const now: Date = new Date();
  const timestamp: string = now.toISOString().replace(/[-:.TZ]/g, '');
  const random: string = Math.floor(Math.random() * 1000)
    .toString()
    .padStart(3, '0');
  return `${timestamp}${random}`;
}

/**
 * Splits a string by a given delimiter and returns the parts and their count.
 * @param input - The string to split.
 * @param delimiter - The delimiter to split by (default is a space).
 * @returns An object with the parts array and count.
 */

interface SplitResult {
  parts: string[];
  count: number;
}

export function splitString(input: string, delimiter: string = " "): SplitResult {
  const result = input.split(delimiter).map(part => part.trim());
  return {
    parts: result,
    count: result.length
  };
}

/**
 * Pause execution for a given amount of time (ms).
 */
export async function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Check if the array is sorted in ascending order
 */
export function isSortedAsc(arr: number[] | string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < arr[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Check if the array is sorted in descending order
 */
export function isSortedDesc(arr: number[] | string[]): boolean {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > arr[i - 1]) {
      return false;
    }
  }
  return true;
}

/**
 * Check if the array is sorted (automatically detect ascending or descending)
 * @param order "asc" | "desc"
 */
export function isSorted(arr: number[] | string[], order: "asc" | "desc" = "asc"): boolean {
  return order === "asc" ? isSortedAsc(arr) : isSortedDesc(arr);
}

export async function checkElementsVisible(elements: { name: string; locator: Locator }[]) {
  for (const { name, locator } of elements) {
    await test.step(`Check visibility of ${name}`, async () => {
      await expect(locator, `Element "${name}" is not visible`).toBeVisible({ timeout: 5000 });
    });
  }
}

/**
 * Get a random element from an array
 * @param arr The array to select from
 * @returns A random element from the array
 */
export function getRandomArrayElement<T>(arr: T[]): T {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function extractNumber(priceText: string): number {
  const cleaned = priceText.replace(/[^0-9.,]/g, "");
  const normalized = cleaned.replace(/,/g, "");
  const value = parseFloat(normalized);

  return isNaN(value) ? 0 : value;
}


/**
 * type-safe type for key
 */
export const t = {
  homepage: (key: keyof Translations['homepage']) => I18n.translations.homepage[key],
  loginpage: (key: keyof Translations['loginpage']) => I18n.translations.loginpage[key],
  forgotpasswordpage: (key: keyof Translations['forgotpasswordpage']) => I18n.translations.forgotpasswordpage[key],
  registerpage: (key: keyof Translations['registerpage']) => I18n.translations.registerpage[key],
  membershippage: (key: keyof Translations['membershippage']) => I18n.translations.membershippage[key],
  newarrivalspage: (key: keyof Translations['newarrivalspage']) => I18n.translations.newarrivalspage[key],
  luggagepage: (key: keyof Translations['luggagepage']) => I18n.translations.luggagepage[key],
  backpackspage: (key: keyof Translations['backpackspage']) => I18n.translations.backpackspage[key],
  bagspage: (key: keyof Translations['bagspage']) => I18n.translations.bagspage[key],
  brandpage: (key: keyof Translations['brandpage']) => I18n.translations.brandpage[key],
  ourbrandstorypage: (key: keyof Translations['ourbrandstorypage']) => I18n.translations.ourbrandstorypage[key],
  ginzaflagshipstore: (key: keyof Translations['ginzaflagshipstore']) => I18n.translations.ginzaflagshipstore[key],
  sale: (key: keyof Translations['sale']) => I18n.translations.sale[key],
  offers: (key: keyof Translations['offers']) => I18n.translations.offers[key],
  whyshopwithus: (key: keyof Translations['whyshopwithus']) => I18n.translations.whyshopwithus[key],
  mypage: (key: keyof Translations['mypage']) => I18n.translations.mypage[key],
  menuItem: (key: keyof Translations['menuItem']) => I18n.translations.menuItem[key],
  minicart: (key: keyof Translations['minicart']) => I18n.translations.minicart[key],
  cartpage: (key: keyof Translations['cartpage']) => I18n.translations.cartpage[key],
};

/**
 * Mask email address for privacy
 * @param email Email đầy đủ
 * @returns Masked email
 */
export function maskEmail(email: string): string {
  const [username, domain] = email.split('@');

  if (username.length < 3) {
    throw new Error('email username must be at least 3 characters long');
  }

  return username.slice(0, 3) + '*****' + '@' + domain;
}

export function getRandomInt(min: number = 1, max: number = 10): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}


/**
 * **************************************************************************
 * **************************************************************************
 * 🚀 Actions
 * {Common functions/Actions}
 * Perform a action on a site
 * Use above helper functions
 * Used directly on the site or in test cases
 * Maybe used as a action
 * **************************************************************************
 * **************************************************************************
 */

/**
 * Select sidebar menu by js
 */

export async function clickSidebarMenu(page: Page, menuPath: string) {
  // Split menuPath and set value into pathArray
  const rs: SplitResult = splitString(menuPath, "->")
  const pathArray: string[] = rs.parts
  const pathLength: number = rs.count

  let currentScope: Page | Locator = page; // Start from root

  for (let i = 0; i < pathLength; i++) {
    const label = pathArray[i];

    // Find the menu at the current level within the current DOM scope.
    const locator: Locator = currentScope.locator(`xpath=.//span[@class="title" and normalize-space(text())="${label}"]`);

    // Click on the menu at the current level
    await locator.first().click();

    // Wait for the submenu to render before proceeding.
    await page.waitForTimeout(300);

    // Update the scope to search for children within the newly opened branch.
    // Go up to the <li> element of the clicked label, then go down to the child <ul> branch.
    currentScope = locator.locator('xpath=ancestor::li[1]//ul[contains(@class, "page-sidebar-menu")]');
  }
}

/**
 * Combobox: have a input textbox below the dropdown option
 * User can input text into textbox then click the displayed option row
 * @param {*} page 
 * @param {string : combobox name label} comboboxName 
 * @param {string : the option value which user want to select} optionValue 
 */
export async function selectComboboxOption(page: Page, comboboxName: string, optionValue: string): Promise<void> {
  // Define the comboxbox element
  const combobox: Locator = page.locator(`//div[label[text()="${comboboxName}"] or div[text()="${comboboxName}"]]//ng-select`)
  const comboboxInput: Locator = page.locator(`//div[label[text()="${comboboxName}"] or div[text()="${comboboxName}"]]//ng-select//input`)

  await page.waitForLoadState('networkidle');

  // Click comboxbox, enter option value into combobox textbox
  await combobox.click();
  await comboboxInput.fill(optionValue)

  // Define the option locator
  const optionXpath = `//ng-dropdown-panel//span[text()="${optionValue}"]`
  const profileValueOption = page.locator(optionXpath);

  // Select the option need to select
  await profileValueOption.click();
}

export async function closeModalIfPresent(page: Page): Promise<void> {
  const modalCloseBtn = page.locator('//div[@id="staticBackdrop"]//button[contains(@class,"close-signup-popup")]');
  const intentCartCloseBtn = page.locator('//div[@id="mcp-exit-intent-cart"]//button[@class="close-btn"]');
  const popupContainerBtn = page.locator('//div[@class="popup-container"]//button[@class="close-btn"]');

  const modalsToCheck = [
    {
      name: 'Signup Modal',
      locator: modalCloseBtn.first(),
    },
    {
      name: 'Intent Cart Modal',
      locator: intentCartCloseBtn.first(),
    },
    {
      name: 'Popup Container',
      locator: popupContainerBtn.first(),
    },
  ];

  for (const modal of modalsToCheck) {
    const isVisible = await modal.locator.isVisible().catch(() => false);
    if (isVisible) {
      console.log(`${modal.name} detected → Closing it...`);
      await modal.locator.click().catch((e) => {
        console.warn(`Failed to click close for ${modal.name}:`, e);
      });
      await modal.locator.waitFor({ state: 'detached', timeout: 5000 }).catch(() => {
        console.warn(`${modal.name} did not detach in time`);
      });
    } else {
      //console.log(`${modal.name} not found.`);
    }
  }
}

export async function scrollToBottom(page: Page, distance: number = 100, delay: number = 100): Promise<void> {
  await page.evaluate(
    async ({ scrollDistance, scrollDelay }: { scrollDistance: number; scrollDelay: number }) => {
      await new Promise<void>((resolve) => {
        let totalHeight = 0;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, scrollDistance);
          totalHeight += scrollDistance;

          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, scrollDelay);
      });
    },
    { scrollDistance: distance, scrollDelay: delay }
  );
}

// Click a locator until another locator visible|hidden
export async function clickUntil(
  page: Page,
  clickTarget: Locator,
  conditionTarget: Locator,
  condition: WaitCondition = 'visible',
  options?: {
    maxTries?: number;
    delayMs?: number;
    timeoutMs?: number;
  }
): Promise<void> {
  const {
    maxTries = 10,
    delayMs = 500,
    timeoutMs = 5000,
  } = options || {};

  for (let i = 0; i < maxTries; i++) {
    await clickTarget.click();

    try {
      if (condition === 'visible') {
        await conditionTarget.waitFor({ state: 'visible', timeout: timeoutMs });
        return;
      } else if (condition === 'hidden') {
        await conditionTarget.waitFor({ state: 'hidden', timeout: timeoutMs });
        return;
      }
    } catch (e) { }

    await page.waitForTimeout(delayMs);
  }

  throw new Error(
    `Condition '${condition}' was not met after ${maxTries} clicks and timeout of ${timeoutMs}ms.`
  );
}

type WaitCondition = 'visible' | 'hidden';