import { test as base, Page, BrowserContext } from "@playwright/test";
import { LoginPage } from "../pages/login/login.page";
import { step } from "allure-js-commons";
import { Config } from "../../config/env.config";
import { I18n } from "../../config/i18n.config";

type MyFixtures = {
    user: { username: string; password: string };
    basicAuthPage: Page;
    loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
    user: async ({ }, use) => {
        // Get user credentials from env.config.ts
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
        await step("Go to base URL with Basic Auth only", async () => {
            await page.goto(Config.baseURL);
        });

        await use(page);

        await page.close();
        await context.close();
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
        const loginPage = new LoginPage(page);

        await step("Go to Login Page", async () => {
            await loginPage.goto(Config.baseURL);
        });

        await step(`Login with valid account: ${user.username}`, async () => {
            await loginPage.login(user.username, user.password);
        });

        await use(page);
    },
});

export { expect } from "@playwright/test";
