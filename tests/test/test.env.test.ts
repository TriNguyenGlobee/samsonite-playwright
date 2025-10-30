import { test, expect } from "../../src/fixtures/test-fixture";
import { MyPage } from "../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../src/factories/login.factory";
import { tests } from "../../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue, t } from "../../utils/helpers/helpers";
import { loadTestData } from "../../utils/data";
import { RegisterPage } from "../../src/pages/delivery/login/register.page";

test.describe("Register with negative case", () => {
    test("Click Create account button with empty required fields", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("","","","","","","","","","");
            await expect(registerPage.titleMsg).toContainText(t.registerpage('dropdownMsg'));
            await expect(registerPage.firstNameMsg).toContainText(t.loginpage('requirepwmsg'));
            await expect(registerPage.lastNameMsg).toContainText(t.loginpage('requirepwmsg'));
            await expect(registerPage.phoneNumberMsg).toContainText(t.loginpage('requirepwmsg'));
            await expect(registerPage.emailMsg).toContainText(t.loginpage('requirepwmsg'));
            await expect(registerPage.passwordMsg).toContainText(t.loginpage('requirepwmsg'));
            await expect(registerPage.confirmpasswordMsg).toContainText(t.loginpage('requirepwmsg'));
        });
    });
    test("Click Create account button without title", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("","Test","Globee","99999999","1","1","2000","testglobee@yopmail.com","Globee@123","Globee@123");
            await expect(registerPage.titleMsg).toContainText(t.registerpage('dropdownMsg'));
        });
    });
    test("Click Create account button without fistname", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","","Globee","99999999","1","1","2000","testglobee@yopmail.com","Globee@123","Globee@123");
            await expect(registerPage.firstNameMsg).toContainText(t.loginpage('requirepwmsg'));
        });
    });
    test("Click Create account button without lastname", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","Test","","99999999","1","1","2000","testglobee@yopmail.com","Globee@123","Globee@123");
            await expect(registerPage.lastNameMsg).toContainText(t.loginpage('requirepwmsg'));
        });
    });
    test("Click Create account button without phonenumber", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","Test","Globee","","1","1","2000","testglobee@yopmail.com","Globee@123","Globee@123");
            await expect(registerPage.phoneNumberMsg).toContainText(t.loginpage('requirepwmsg'));
        });
    });
    test("Click Create account button without date of birth", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","Test","Globee","99999999","","","","testglobee@yopmail.com","Globee@123","Globee@123");
            await expect(registerPage.dateOfBirthMsg).toContainText(t.registerpage('dropdownMsg'));
        });
    });
    test("Click Create account button without email", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","Test","Globee","99999999","1","1","2000","","Globee@123","Globee@123");
            await expect(registerPage.emailMsg).toContainText(t.loginpage('requirepwmsg'));
        });
    });
    test("Click Create account button without password", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","Test","Globee","99999999","1","1","2000","testglobee@yopmail.com","","");
            await expect(registerPage.passwordMsg).toContainText(t.loginpage('requirepwmsg'));
            await expect(registerPage.confirmpasswordMsg).toContainText(t.loginpage('requirepwmsg'));
        });
    });
    test("Click Create account button with invalid password", async ({ basicAuthPage }) => {        
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
        await step("Go to login page", async () => {
            await loginPage.goToLoginRegisterPage();
        });
        await step("Go to register page", async () => {
            await loginPage.goToRegisterPage();
        });
        await step("Click Create account button", async () => {
            await registerPage.register("Miss","Test","Globee","99999999","1","1","2000","testglobee@yopmail.com","1","1");
            await expect(registerPage.passwordMsg).toContainText(t.registerpage('passwordMsg'));
            await expect(registerPage.confirmpasswordMsg).toContainText(t.registerpage('passwordMsg'));
        });
    });
});
