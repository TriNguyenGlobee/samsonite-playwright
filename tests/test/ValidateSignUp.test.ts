import { test, expect } from "../../src/fixtures/test-fixture";
import { MyPage } from "../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../src/factories/login.factory";
import { tests } from "../../utils/helpers/localeTest"
import { selectDropdownOption, getDropdownValue } from "../../utils/helpers/helpers";
import { loadTestData } from "../../utils/data";
import { RegisterPage } from "../../src/pages/delivery/login/register.page"
import { t, PageUtils } from "../../utils/helpers/helpers";



test.describe("Validate-Registerpage",()=>{
    test("Validate Register page", async({ basicAuthPage }) => {
        const loginPage = createLoginPage (basicAuthPage)
        const registerPage = new RegisterPage(basicAuthPage)
    

        await step("go to login page", async()=>{
            await loginPage.goToLoginRegisterPage()
        }) 

        await step("go to register page", async()=>{
            await loginPage.goToRegisterPage()
        })

        await step("Verify Register page is visible", async()=>{
             expect(await registerPage.isRegisterpageDisplayed()).toBeTruthy()
        })

        await step("Verify Error msg when submit with empty required fields", async()=>{
            await registerPage.clickCreateAccountButton()
            expect(await registerPage.titleMsg.textContent()).toBe(t.registerpage('titlemsg'))
            expect(await registerPage.fNameMsg.textContent()).toBe(t.registerpage('fnamemsg'))
            expect(await registerPage.lNameMsg.textContent()).toBe(t.registerpage('lnamemsg'))
            expect(await registerPage.phoneMsg.textContent()).toBe(t.registerpage('phonemsg'))
            expect(await registerPage.emailMsg.textContent()).toBe(t.registerpage('emailmsg'))
            expect(await registerPage.passwordMsg.textContent()).toBe(t.registerpage('passmsg'))
            expect(await registerPage.confirmPasswordMsg.textContent()).toBe(t.registerpage('confirmpassmsg'))
            expect(await registerPage.policyMsg.textContent()).toBe(t.registerpage('poplicymsg'))

        })

        await step("Click Create account button without title", async()=>{

            await registerPage.submitWithoutTitle()
            await registerPage.clickCreateAccountButton()
            expect(await registerPage.titleMsg.textContent()).toBe(t.registerpage('titlemsg'))

        })

        await step(" Click Create account button without firstname", async()=>{

            await registerPage.submitWithoutFirtname()
            await registerPage.clickCreateAccountButton()
            expect(await registerPage.fNameMsg.textContent()).toBe(t.registerpage('fnamemsg'))

        })

        await step("Click Create account button without lastname", async()=>{

            await registerPage.submitWithoutLastname()
            await registerPage.clickCreateAccountButton()
             expect(await registerPage.lNameMsg.textContent()).toBe(t.registerpage('lnamemsg'))

        })

        await step("Click Create account button without phone number", async()=>{

            await registerPage.submitWithoutPhone()
            await registerPage.clickCreateAccountButton()
            expect(await registerPage.phoneMsg.textContent()).toBe(t.registerpage('phonemsg'))

        })

         await step("Click Create account button without email", async()=>{

            await registerPage.submitWithouEmail()
            await registerPage.clickCreateAccountButton()
            expect(await registerPage.emailMsg.textContent()).toBe(t.registerpage('emailmsg'))

        })

        await step("Click Create account button without password", async()=>{

            await registerPage.submitWithouPassword()
            await registerPage.clickCreateAccountButton()
            expect(await registerPage.passwordMsg.textContent()).toBe(t.registerpage('passmsg'))

        })

        await step("Click Create account button with invalid password", async()=>{

            await registerPage.submitWithInvalidCP()
            await registerPage.clickCreateAccountButton()
             await basicAuthPage.waitForLoadState('load');
            expect(await registerPage.NotMatchMsg.textContent()).toBe(t.registerpage('notmatchmsg'))

        })

        await step("Click Create account button without date of birth", async()=>{

            await registerPage.submitWithoutDOB()
            await registerPage.clickCreateAccountButton()
            await basicAuthPage.waitForLoadState('load');

            expect(await registerPage.dobMsg.textContent()).toBe(t.registerpage('dobmsg'))

        })
    
    

    })


})