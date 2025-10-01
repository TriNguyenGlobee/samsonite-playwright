import { test as base, Page } from "@playwright/test";
import { step } from "allure-js-commons";
import { Config } from "../../config/env.config";
import { closeModalIfPresent } from "../../utils/helpers";
import { createLoginPage } from '../factories/login.factory'

type MyFixtures = {
    user: { username: string; password: string };
    basicAuthPage: Page;
    loggedInPage: Page;
};

export const test = base.extend<MyFixtures>({
    user: async ({ }, use) => {
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

        page.on("load", async () => {
            await closeModalIfPresent(page);
        });
        page.on("framenavigated", async () => {
            await closeModalIfPresent(page);
        });

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
        const loginPage = createLoginPage(page);

        page.on("load", async () => {
            await closeModalIfPresent(page);
        });
        page.on("framenavigated", async () => {
            await closeModalIfPresent(page);
        });

        await step("Go to Main Page", async () => {
            await page.goto(Config.baseURL);
        });

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step(`Login with valid account: ${user.username}`, async () => {
            await loginPage.login(user.username, user.password);
        });

        await use(page);
        await context.close();
    },
});

export { expect } from "@playwright/test";
