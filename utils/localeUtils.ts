import type { TestType, TestInfo } from "@playwright/test";
import { test as baseTest } from "@playwright/test";
import { CurrentLocale } from "../config/env.config";

function getCurrentLocale(): string {
  return CurrentLocale || process.env.LOCALE || "";
}

/**
 * ✅ testCase()
 * Tương thích hoàn toàn TypeScript và fixture của Playwright.
 */
export function testCase<
  T extends TestType<Fixtures, any>,
  Fixtures extends Record<string, any> = any
>(
  testInstance: T,
  locales: string[],
  title: string,
  fn: (args: Fixtures, testInfo: TestInfo) => Promise<void> | void
) {
  const currentLocale = getCurrentLocale();

  if (!locales.includes(currentLocale)) {
    testInstance.skip(
      true,
      `⏭️ Skipped "${title}" — LOCALE=${currentLocale} not in [${locales.join(", ")}]`
    );
    return;
  }

  testInstance(title, fn);
}

/**
 * ✅ stepForLocales()
 * Cho phép step chỉ chạy khi locale phù hợp.
 */
export async function stepForLocales(
  locales: string[],
  title: string,
  fn: () => Promise<void>
) {
  const currentLocale = getCurrentLocale();

  if (locales.includes(currentLocale)) {
    await baseTest.step(title, fn);
  } else {
    console.log(
      `[stepForLocales] ⏭️ Skipped step "${title}" (LOCALE=${currentLocale} not in [${locales.join(", ")}])`
    );
  }
}
