import { test, expect } from "../../src/fixtures/test-fixture";
import { MyPage } from "../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../src/factories/login.factory";
import { tests } from "../../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue, t } from "../../utils/helpers/helpers";
import { loadTestData } from "../../utils/data";
import { createHomePage } from "../../src/factories/home.factory";
import { RegisterPage } from "../../src/pages/delivery/login/register.page";


test.describe("Test-module", () => {
    
    test("Click Create account button with negative cases", async ({ basicAuthPage }) => {
        const homePage = createHomePage (basicAuthPage)
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)

        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        })

        await step ("Go to Register page", async () => {
            await loginPage.goToRegisterPage();
        })

        await step ("Click Create account button with empty required fields", async () => {
            await registerPage.registerAccount("","","","","","","","","")
            await expect(registerPage.titleMsg).toContainText(t.loginpage('dropdownMsg'))
            await expect(registerPage.firstnameMsg).toContainText(t.loginpage('requirepwmsg'))
            await expect(registerPage.lastNameMsg).toContainText(t.loginpage('requirepwmsg'))
            await expect(registerPage.phoneMsg).toContainText(t.loginpage('requirepwmsg'))
            await expect(registerPage.emailMsg).toContainText(t.loginpage('requirepwmsg'))
            await expect(registerPage.passwordMsg).toContainText(t.loginpage('requirepwmsg'))
            await expect(registerPage.confirmPassMsg).toContainText(t.loginpage('requirepwmsg'))
        })

        await step ("Click Create account button without title", async () => {
            await registerPage.registerAccount("","Globee","Globee","80010301","15","5","1992","globeetest1030-1@yopmail.com","Globee@123")
            await expect(registerPage.titleMsg).toContainText(t.loginpage('dropdownMsg'))
        })

        await step ("Click Create account button without firstname", async () => {
            await registerPage.registerAccount("Mr.","","Globee","80010301","15","5","1992","globeetest1030-1@yopmail.com","Globee@123")
            await expect(registerPage.firstnameMsg).toContainText(t.loginpage('requirepwmsg'))
        })

        await step ("Click Create account button without lastname", async () => {
            await registerPage.registerAccount("Mr.","Globee","","80010301","15","5","1992","globeetest1030-1@yopmail.com","Globee@123")
            await expect(registerPage.lastNameMsg).toContainText(t.loginpage('requirepwmsg'))
        })

        await step ("Click Create account button without date of birth", async () => {
            await registerPage.registerAccount("Mr.","Globee","Globee","80010301","","","","globeetest1030-1@yopmail.com","Globee@123")
            await expect(registerPage.dayofBirthMsg).toContainText(t.loginpage('dropdownMsg'))
        })

        await step ("Click Create account button without email", async () => {
            await registerPage.registerAccount("Mr.","Globee","Globee","80010301","15","5","1992","","Globee@123")
            await expect(registerPage.emailMsg).toContainText(t.loginpage('requirepwmsg'))
        })

        await step ("Click Create account button without password", async () => {
            await registerPage.registerAccount("Mr.","Globee","Globee","80010301","15","5","1992","globeetest1030-1@yopmail.com","")
            await expect(registerPage.passwordMsg).toContainText(t.loginpage('requirepwmsg'))
            await expect(registerPage.confirmPassMsg).toContainText(t.loginpage('requirepwmsg'))
        })

        await step ("Click Create account button with invalid password", async () => {
            await registerPage.registerAccount("Mr.","Globee","Globee","80010301","15","5","1992","globeetest1030-1@yopmail.com","123")
            await expect(registerPage.passwordMsg).toContainText(t.loginpage('invalidPassMsg'))
            await expect(registerPage.confirmPassMsg).toContainText(t.loginpage('invalidPassMsg'))
        })       

    })
});
