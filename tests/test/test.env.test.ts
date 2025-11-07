import { test, expect } from "../../src/fixtures/test-fixture";
import { MyPage } from "../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../src/factories/login.factory";
import { tests } from "../../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue } from "../../utils/helpers/helpers";
import { loadTestData } from "../../utils/data";
import { createHomePage } from "../../src/factories/home.factory"; 
import { LoginPage } from "../../src/pages/delivery/login/login.page";
import { RegisterPage } from "../../src/pages/delivery/login/register.page";
import { register } from "module";
import { TIMEOUT } from "dns";

test.describe('Register page validation',() => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const loginPage = createLoginPage(basicAuthPage);

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });

        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
    });

    test("Register screen is displayed", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)

        await step("Verify the checkout page is displayed", async () => {
            expect(await registerPage.isRegisterpageDisplayed()).toBe(true)
        })
    })

    test("Create an account with empty required fields", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.titleMsg).toBeVisible();
        await expect(registerPage.firstNameMsg).toBeVisible();
        await expect(registerPage.lastNameMsg).toBeVisible();
        await expect(registerPage.emailMsg).toBeVisible();
        await expect(registerPage.phoneNumberMsg).toBeVisible();
        await expect(registerPage.passwordMsg).toBeVisible();
        await expect(registerPage.confirmpasswordMsg).toBeVisible();
        await expect(registerPage.termsConditionMsg).toBeVisible();
    })

    test("Create an account without title", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await selectDropdownOption(basicAuthPage, registerPage.titleDropdown, '');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.titleMsg).toBeVisible();
    })

    test("Create an account without firstname", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.firstNameTextbox.fill('');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.firstNameMsg).toBeVisible();
    })

    test("Create an account without lastname", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.lastNameTextbox.fill('');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.lastNameMsg).toBeVisible();
    })

    test("Create an account without phone number", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.phoneNumberTextbox.fill('');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.phoneNumberMsg).toBeVisible();
    })

    test("Create an account without date of birth", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.selectDateOfBirth('','','');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.dateOfBirthMsg).toBeVisible();
    })

    test("Create an account without email", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.emailTexbox.fill('');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.emailMsg).toBeVisible();
    })

    test("Create an account without password", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.passwordTextbox.fill('');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.passwordMsg).toBeVisible();
    })

    test("Create an account with invalid password", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.passwordTextbox.fill('123');
        await registerPage.confirmPasswordTextbox.fill('12345');
        await registerPage.clickCreateAccountButton();
        await expect(registerPage.confirmpasswordMsg).toBeVisible();
    })

    test("Create an account successfully and navigates to My account page", async ({basicAuthPage}) => {
        const registerPage = new RegisterPage(basicAuthPage)
        await registerPage.fillValidData();
        await registerPage.clickCreateAccountButton();
        await basicAuthPage.waitForLoadState('networkidle', { timeout: 15000 });
        const accountHeader = basicAuthPage.locator('h1.page-title');
        await accountHeader.waitFor({ state: 'visible', timeout: 15000 });
        await expect(accountHeader).toContainText('Your Account', { timeout: 5000 });
        await expect(basicAuthPage).toHaveURL(/account/);
    });

});


