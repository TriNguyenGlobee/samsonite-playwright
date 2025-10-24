import { test, expect } from "../src/fixtures/test-fixture";
import { MyPage } from "../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../src/factories/login.factory";
import { tests } from "../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue } from "../utils/helpers/helpers";
import { loadTestData } from "../utils/data";

test.describe("Test-module", () => {
    const { carouselItems } = loadTestData();
    
    test("Test-module:check action activities", async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);
        const optionValue = "Miss"

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });

        await step("Select registation title", async () => {
            await selectDropdownOption(basicAuthPage, "#registration-form-title", optionValue)
        })

        await step("Verify that user can select dropdown option", async () => {
            const selectedValue = await getDropdownValue(basicAuthPage, "#registration-form-title")
            await loginPage.assertEqual(selectedValue, optionValue)
        })
    })
});
