import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";

export class RegisterPage extends BasePage {
    readonly logoImg: Locator;
    readonly pageTitle: Locator;
    readonly subTitle: Locator;
    readonly customerDetailsLabel: Locator;
    readonly lastNameTextbox: Locator;
    readonly firstNameTextbox: Locator;
    readonly phoneNumberTextbox: Locator;
    readonly dateOfBirthLabel: Locator;
    readonly yearDropdown: Locator;
    readonly monthDropdown: Locator;
    readonly dayDropdown: Locator;
    readonly genderDropdown: Locator;
    readonly emailTexbox: Locator;
    readonly passwordTextbox: Locator;
    readonly confirmPasswordTextbox: Locator;
    readonly getNewsRegisterLabel: Locator;
    readonly getNewsRegisterCheckbox: Locator;
    readonly termsConditionLabel: Locator;
    readonly termsConditionCheckboxEn: Locator;
    readonly termsConditionCheckboxJp: Locator;
    readonly createAccountButtonEn: Locator;

    //tam added
    readonly titleMsg: Locator;
    readonly fNameMsg: Locator;
    readonly lNameMsg: Locator;
    readonly phoneMsg: Locator;
    readonly dobMsg: Locator;
    readonly emailMsg: Locator;
    readonly passwordMsg: Locator;
    readonly confirmPasswordMsg: Locator;
    readonly policyMsg: Locator;
    readonly titleDropdown: Locator;
    readonly NotMatchMsg: Locator

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.pageTitle = page.locator(`//div[contains(@class,"register-banner")]//h2[@class="page-title" and normalize-space(text())="${t.registerpage('pageTitle')}"]`);
        this.subTitle = page.locator(`//div[contains(@class,"register-banner")]//h5[@class="sub-title" and normalize-space(text())="会員になると、送料無料、メンバーセールへのアクセス、クーポンなどの特典をお楽しみいただけます。"]`);
        this.customerDetailsLabel = page.locator(`//div[h4[normalize-space(text())="${t.registerpage('customerdetailslabel')}"]]`);
        this.lastNameTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('lastname')}"]]//input`);
        this.firstNameTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('firstname')}"]]//input`);
        this.phoneNumberTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('phonenumber')}"]]//input`);
        this.dateOfBirthLabel = page.locator(`//div[label[normalize-space(text())="${t.registerpage('dateofbirth')}"]]`);
        this.yearDropdown = page.locator(`//select[@id="year"]`);
        this.monthDropdown = page.locator(`//select[@name="month"]`);
        this.dayDropdown = page.locator(`//select[@id="day"]`);
        this.genderDropdown = page.locator(`//select[@id="gender"]`);
        this.emailTexbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('email')}"]]//input`);
        this.passwordTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('password')}"]]//input`);
        this.confirmPasswordTextbox = page.locator(`//div[label[normalize-space(text())="${t.registerpage('confirmpassword')}"]]//input`);
        this.getNewsRegisterLabel = page.locator(`//label[span[normalize-space(text())="${t.registerpage('getnewsrequest')}"]]`);
        this.getNewsRegisterCheckbox = page.locator(``);
        this.termsConditionLabel = page.locator(``);
        this.termsConditionCheckboxEn = page.locator(`//label[@for="accept-terms-condition" and normalize-space(.)="Agree to Privacy Policy, User Agreement and Personal Information Collection Statement."]`);
        this.termsConditionCheckboxJp = page.locator(`//label[span[normalize-space(text())="会員限定のメールマガジンに登録し、新商品情報やお得なクーポン、イベント情報などを受け取ります"]]`);
        //tam added
        this.createAccountButtonEn = page.locator(`//button[@type='submit' and contains(text(),"Create Account")]`);
        this.titleMsg = page.locator('//div[contains(text(), "Please select an item in the list")]')
        this.fNameMsg = page.locator('//input[@id="registration-form-fname"]/following-sibling::div[contains(text(),"Please fill out this field.")]')
        this.lNameMsg = page.locator('//input[@id="registration-form-lname"]/following-sibling::div[contains(text(),"Please fill out this field.")]')
        this.phoneMsg = page.locator('//input[@id="registration-form-phone"]/following-sibling::div[contains(text(),"Please fill out this field.")]')
        this.emailMsg = page.locator('//input[@id="registration-form-email"]/following-sibling::div[contains(text(),"Please fill out this field.")]')
        this.passwordMsg = page.locator('//input[@id="registration-form-password"]/following-sibling::div[contains(text(),"Please fill out this field.")]')
        this.confirmPasswordMsg = page.locator('//input[@id="registration-form-password-confirm"]/following-sibling::div[contains(text(),"Please fill out this field.")]')
        this.policyMsg = page.locator('//div[contains(text(), "Please check this box if you want to proceed")]')
        this.titleDropdown = page.locator('//select[@id="registration-form-title"]')
        this.NotMatchMsg = page.locator('//input[@id="registration-form-password-confirm"]/following-sibling::div[contains(text(),"Does not match the password")]')
        this.dobMsg = page.locator('//div[contains(@class, "row birth-date")]//div[contains(text(), "Please select an item in the list")]')
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================
    async isRegisterpageDisplayed(): Promise<boolean> {
        try {
            const title = await this.page.title();
            if (!title.includes(t.registerpage('title'))) {
                return false;
            }

            const currentUrl = await this.page.url();
            const expectedUrl = Config.baseURL + "register";
            if (!currentUrl.startsWith(expectedUrl)) return false;

            const elementsToCheck = [
                this.pageTitle,
                this.subTitle,
                this.customerDetailsLabel,
                this.lastNameTextbox,
                this.firstNameTextbox,
                this.phoneNumberTextbox,
                this.dateOfBirthLabel,
                this.yearDropdown,
                this.monthDropdown,
                this.dayDropdown,
                this.genderDropdown,
                this.emailTexbox,
                this.passwordTextbox,
                this.confirmPasswordTextbox,
                this.getNewsRegisterLabel,
                this.termsConditionCheckboxJp,
                //tam added
                this.createAccountButtonEn
            ];
            for (const locator of elementsToCheck) {
                if (!locator.isVisible()) {
                    await step(`Check visibility of element: ${locator.toString()}`, async () => {
                        console.log(`Element not visible: ${locator.toString()}`);
                    });
                    return false;
                }
            }
            return true;
        } catch (error) {
            console.error('Error checking register page:', error);
            return false;
        }
    }

    //Tam Added
    async clickCreateAccountButton(){
        await this.createAccountButtonEn.click();
    }

     async submitWithoutTitle(){
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('80001000')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@123')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

async submitWithoutFirtname(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('80001000')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@123')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

async submitWithoutLastname(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('')
        await this.phoneNumberTextbox.fill('80001000')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@123')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

 async submitWithoutPhone(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@123')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

 async submitWithouEmail(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('80001000')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@123')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

async submitWithouPassword(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('80001000')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('')
        await this.confirmPasswordTextbox.fill('Globee@123')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

async submitWithInvalidCP(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('80001000')
        await this.dayDropdown.selectOption('12')
        await this.monthDropdown.selectOption('12')
        await this.yearDropdown.selectOption('2002')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@1234')
        await this.termsConditionCheckboxEn.check()

        await this.createAccountButtonEn.click();
}

async submitWithoutDOB(){
        await this.titleDropdown.selectOption('Mr.')
        await this.firstNameTextbox.fill('Dev Globee')
        await this.lastNameTextbox.fill('Test')
        await this.phoneNumberTextbox.fill('80001000')
        await this.emailTexbox.fill('globeetesting+123@gmail.com')
        await this.passwordTextbox.fill('Globee@123')
        await this.confirmPasswordTextbox.fill('Globee@1234')
        await this.termsConditionCheckboxEn.check()
        await this.dayDropdown.selectOption('')
        await this.monthDropdown.selectOption('')
        await this.yearDropdown.selectOption('')

        await this.createAccountButtonEn.click();
}
    // =========================
    // ✅ Assertions
    // =========================


}