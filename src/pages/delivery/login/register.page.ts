import { Page, Locator } from "@playwright/test";
import { BasePage } from "../../base.page";
import { handlePwpModalIfPresent, t } from "../../../../utils/helpers/helpers";
import { Config } from "../../../../config/env.config";
import { step } from "allure-js-commons";
import { strict } from "node:assert";

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
    readonly createAccountButton: Locator;
    readonly titleDropdown: Locator
    readonly titleMsg: Locator
    readonly firstnameMsg: Locator
    readonly lastNameMsg: Locator
    readonly phoneMsg: Locator
    readonly emailMsg: Locator
    readonly passwordMsg: Locator
    readonly confirmPassMsg: Locator
    readonly dayofBirthMsg: Locator

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
        this.createAccountButton = page.locator(`//button[@class="btn-block btn tracking-onetag-element"]`);
        this.titleDropdown = page.locator('//select[@id="registration-form-title"]')
        this.titleMsg = page.locator(`//select[@id="registration-form-title"]/following-sibling::div[@class="invalid-feedback"]`)
        this.lastNameMsg = page.locator(`//div[label[normalize-space(text())="${t.registerpage('lastname')}"]]//input/following-sibling::div[@class="invalid-feedback"]`);
        this.firstnameMsg = page.locator(`//div[label[normalize-space(text())="${t.registerpage('firstname')}"]]//input/following-sibling::div[@class="invalid-feedback"]`);
        this.phoneMsg = page.locator(`//div[label[normalize-space(text())="${t.registerpage('phonenumber')}"]]//input/following-sibling::div[@class="invalid-feedback"]`);
        this.dateOfBirthLabel = page.locator(`//div[label[normalize-space(text())="${t.registerpage('dateofbirth')}"]]`);
        this.emailMsg = page.locator(`//div[label[normalize-space(text())="${t.registerpage('email')}"]]//input/following-sibling::div[@class="invalid-feedback"]`);
        this.passwordMsg = page.locator(`//div[label[normalize-space(text())="${t.registerpage('password')}"]]//input/following-sibling::div[@class="invalid-feedback"]`);
        this.confirmPassMsg = page.locator(`//div[label[normalize-space(text())="${t.registerpage('confirmpassword')}"]]//input/following-sibling::div[@class="invalid-feedback"]`);
        this.dayofBirthMsg = page.locator('//div[@class="row birth-date"]//div[@class="invalid-feedback"]')
    }

    // =========================
    // 🚀 Actions
    // =========================

    async registerAccount(title:string,firstname:string,lastname:string,phonenumber:string,day:string,month:string,year:string,email:string,password:string) {
     
        await step(`Select title: ${title}`, async() => {
            await this.titleDropdown.selectOption(title);
        
        await step(`Type firstname: ${firstname}`, async () => {
            await this.type(this.firstNameTextbox, firstname);
        });

        await step(`Type lastname: ${lastname}`, async () => {
            await this.type(this.lastNameTextbox, lastname);
        });

        await step(`Type phonenumber: ${phonenumber}`, async () => {
            await this.type(this.phoneNumberTextbox, phonenumber);
        });

          await step(`Type email: ${email}`, async () => {
            await this.type(this.emailTexbox, email);
        });

        await step(`Select day of birth: ${day}`, async() => {
            await this.dayDropdown.selectOption(day);
        })

        await step(`Select month of birth: ${month}`, async() => {
            await this.monthDropdown.selectOption(month);
        })

        await step(`Select year of birth: ${year}`, async() => {
            await this.yearDropdown.selectOption(year);
        })

        await step(`Type password: ${password}`, async () => {
            await this.type(this.passwordTextbox, password);
        });

        await step(`Type confirmpassword: ${password}`, async () => {
            await this.type(this.confirmPasswordTextbox, password);
        });

        await step(`Select term condition checkout:`, async() => {
            await this.termsConditionCheckboxEn.check();
        })

        await step(`Click create account button`, async () => {
            await this.click(this.createAccountButton);
        });
        })
    }
    

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
                this.termsConditionCheckboxJp
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

    // =========================
    // ✅ Assertions
    // =========================

}
