import { test as base, Page } from "@playwright/test";
import { step } from "allure-js-commons";
import { Config } from "../../config/env.config";
import { createLoginPage } from "../factories/login.factory";
import { startModalWatchdog } from "../../utils/modalWatchdog";

type MyFixtures = {
  user: { username: string; password: string };
  basicAuthPage: Page;
  loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
  user: async ({}, use) => {
    await use(Config.credentials);
  },

  basicAuthPage: async ({ browser }, use) => {
    const context = await browser.newContext({
      ...(Config.basicAuthUser && Config.basicAuthPass
        ? {
            httpCredentials: {
              username: Config.basicAuthUser,
              password: Config.basicAuthPass,
            },
          }
        : {}),
    });

    const page = await context.newPage();
    const stopWatchdog = await startModalWatchdog(page);

    await step("Go to base URL with Basic Auth only", async () => {
      await page.goto(Config.baseURL, { waitUntil: "domcontentloaded" });
    });

    await use(page);

    try {
      await Promise.race([
        stopWatchdog(),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch (e) {
      console.warn("stopWatchdog() timeout ignored:", e);
    }

    if (!page.isClosed()) {
      try {
        await page.close({ runBeforeUnload: false });
      } catch (e) {
        console.warn("Error while closing page:", e);
      }
    }

    try {
      await context.close();
    } catch (e) {
      console.warn("Error while closing context:", e);
    }
  },

  loggedInPage: async ({ browser, user }, use) => {
    const context = await browser.newContext({
      ...(Config.basicAuthUser && Config.basicAuthPass
        ? {
            httpCredentials: {
              username: Config.basicAuthUser,
              password: Config.basicAuthPass,
            },
          }
        : {}),
    });

    const page = await context.newPage();
    const loginPage = createLoginPage(page);

    const stopWatchdog = await startModalWatchdog(page);

    await step("Go to Main Page", async () => {
      await page.goto(Config.baseURL, { waitUntil: "domcontentloaded" });
    });

    await step("Go to login page", async () => {
      await loginPage.goToLoginRegisterPage();
    });

    await step(`Login with valid account: ${user.username}`, async () => {
      await loginPage.login(user.username, user.password);
    });

    await use(page);

    try {
      await Promise.race([
        stopWatchdog(),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ]);
    } catch (e) {
      console.warn("stopWatchdog() timeout ignored:", e);
    }

    if (!page.isClosed()) {
      try {
        await page.close({ runBeforeUnload: false });
      } catch (e) {
        console.warn("Error while closing loggedInPage:", e);
      }
    }

    try {
      await context.close();
    } catch (e) {
      console.warn("Error while closing loggedInPage context:", e);
    }
  },
});

export { expect } from "@playwright/test";
