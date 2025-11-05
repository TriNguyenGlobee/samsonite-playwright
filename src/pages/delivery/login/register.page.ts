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
    readonly createAccountButton: Locator;
    readonly titleDropdown: Locator;
    readonly titleTextBoxMsg: Locator;
    readonly firstNameTextBoxMsg: Locator;
    readonly lastNameTextBoxMsg: Locator;
    readonly phoneNumberTextBoxMsg: Locator;
    readonly dateOfBirthTextBoxMsg: Locator;
    readonly emailTextBoxMsg: Locator;
    readonly passwordTextBoxMsg: Locator;
    readonly confirmpasswordTextBoxMsg: Locator;

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
        this.createAccountButton = page.locator(`//button[@type="submit" and normalize-space(text())="${t.registerpage('createaccountbtn')}"]`);
        this.titleDropdown = page.locator('//select[@id="registration-form-title"]');
        this.titleTextBoxMsg = page.locator('//select[@id="registration-form-title"]//following-sibling::div[@class="invalid-feedback"]');
        this.firstNameTextBoxMsg = page.locator('//input[@id="registration-form-fname"]//following-sibling::div[@class="invalid-feedback"]');
        this.lastNameTextBoxMsg = page.locator('//input[@id="registration-form-lname"]//following-sibling::div[@class="invalid-feedback"]');
        this.phoneNumberTextBoxMsg = page.locator('//input[@id="registration-form-phone"]//following-sibling::div[@class="invalid-feedback"]');
        this.dateOfBirthTextBoxMsg = page.locator('//input[@id="dob-combining"]//following-sibling::div[@class="invalid-feedback"]');
        this.emailTextBoxMsg = page.locator('//input[@id="registration-form-email"]//following-sibling::div[@class="invalid-feedback"]');
        this.passwordTextBoxMsg = page.locator('//input[@id="registration-form-password"]//following-sibling::div[@class="invalid-feedback"]');
        this.confirmpasswordTextBoxMsg = page.locator('//input[@id="registration-form-password-confirm"]//following-sibling::div[@class="invalid-feedback"]');
    }

    // =========================
    // 🚀 Actions
    // =========================
    async fillCustomerDetailsForm(page: Page, data: registerCustomerDetailLoad, description?: string): Promise<void> {
        await step(description || "Fill customer detail form", async () => {

            if (data.title) {
                await this.titleDropdown.selectOption(data.title);
            }

            if (data.firstName) {
                await this.type(this.firstNameTextbox, data.firstName, `Fill firstname: ${data.firstName}`);
            }

            if (data.lastName) {
                await this.type(this.lastNameTextbox, data.lastName, `Fill lastname: ${data.lastName}`);
            }

            if (data.phone) {
                await this.type(this.phoneNumberTextbox, data.phone, `Fill phone number: ${data.phone}`);
            }

            if (data.day) {
                await this.dayDropdown.selectOption(data.day);
            }

            if (data.month) {
                await this.monthDropdown.selectOption(data.month);
            }

            if (data.year) {
                await this.yearDropdown.selectOption(data.year);
            }

            if (data.email) {
                await this.type(this.emailTexbox, data.email, `Fill email: ${data.email}`);
            }

            if (data.password) {
                await this.type(this.passwordTextbox, data.password, `Fill password`);
            }

            if (data.confirmPassword) {
                await this.type(this.confirmPasswordTextbox, data.confirmPassword, `Fill confirm password`);
            }

            if (data.termsCondition) {
                await this.termsConditionCheckboxEn.check();
            }

            await this.click(this.createAccountButton, "Click create account button");
        });
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
    async assertFeedbackMsg(page: Page, label: string, msg: string, description?: string) {
        await step(description || "Assert invalid feedback under fields", async () => {
            const invalid_msg = this.page.locator(`//div[label[normalize-space(text())="${label}"]]//input/following-sibling::div[@class="invalid-feedback"]`)
            await this.assertText(invalid_msg, msg, `Invalid feedback under ${label} field should be: ${msg}`)
        })
    }
}

export type registerCustomerDetailLoad = {
    title?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    day?: string;
    month?: string;
    year?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    termsCondition?: boolean;
};

