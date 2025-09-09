import { test, expect } from "../../src/fixtures/test-fixture";
import { LoginPage } from "../../src/pages/login/login.page";
import { DashboardPage } from "../../src/pages/dashboard/dashboard.page";
import { Config } from "../../config/env.config";
import { step } from "allure-js-commons";

test.describe("Login Tests", () => {
    test("login page is displayed", async ({ page }) => {
        const loginPage = new LoginPage(page);

        await step("Go to login page", async () => {
            await loginPage.goto(Config.baseURL);
        });

        await step("Assert Login page displayed", async () => {
            await loginPage.assertVisible(loginPage.pageTitle, "Assert page title displayed");
        });
    });

    test("login successfully with fixture", async ({ loggedInPage }) => {
        const dashboardPage = new DashboardPage(loggedInPage);

        await step("Assert that you have entered the dashboard", async () => {
            await dashboardPage.assertUrl(/.*inventory/, "Assert dashboard page regex URL");
        });
    });
});
