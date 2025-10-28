import { test, expect } from "../../../src/fixtures/test-fixture";
import { MyPage } from "../../../src/pages/implementing/mypage/mypage.page";
import { step } from "allure-js-commons";
import { createLoginPage } from "../../../src/factories/login.factory";
import { createHomePage } from "../../../src/factories/home.factory";
import { GlobalNavFooterPage } from "../../../src/pages/delivery/home/global-nav-footer.page";
import { tests } from "../../../utils/helpers/localeTest"
import { steps } from "../../../utils/helpers/localeStep";
import { selectDropdownOption, getDropdownValue, scrollToBottom, t, generateReadableTimeBasedId } from "../../../utils/helpers/helpers";
import { loadTestData } from "../../../utils/data";

test.describe("Newsletter", () => {
    const { carouselItems } = loadTestData();

    test.beforeEach(async ({ basicAuthPage }) => {
        await scrollToBottom(basicAuthPage)
    });

    test("1. Mailing list section displayed", async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage);
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const emailtxt_Placeholder = t.globalnavfooter('placeholder')

        await step("Verify that Join our mailing list section is displayed", async () => {

            await globalnavfooterpage.assertVisible(globalnavfooterpage.emailTextbox,
                "Assert the Join our mailing list: email textbox displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.subscribeButton,
                "Assert the Join our mailing list: subcribe button displayed"
            )

            await globalnavfooterpage.assertAttributeValue(globalnavfooterpage.emailTextbox, "placeholder", emailtxt_Placeholder,
                "Assert the Join our mailing list: placeholder text"
            )
        })
    })

    test("2. Submit button without email address", async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage);
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Feedback = t.globalnavfooter('completethisfield')

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify invalid-feedback", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: please complete this field"
            )
        })
    })

    test("3. Submit button with invalid-email address", async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage);
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const invalid_Email = "globeetest_invalidemail"
        const invalid_Feedback = t.globalnavfooter('invalidemail')

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, invalid_Email)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify invalid-feedback", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.invalidFeedback, invalid_Feedback,
                "Assert invalid-feedback: Please enter the valid email"
            )
        })
    })

    test(`
        4. Account created success
        5. Duplicate subscription handling
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage);
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const email_suffix = generateReadableTimeBasedId()
        const valid_email = "gloobetestaccount_" + email_suffix
        const subscribeMsg = t.globalnavfooter('createsuccess')
        const accountexistMsg = t.globalnavfooter('duplicateemail')

        await step("Enter the invalid-email into the email textbox", async () => {
            await globalnavfooterpage.type(globalnavfooterpage.emailTextbox, valid_email)
        })

        await step("Clicking on the subscribe button", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify subscribe msg", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.subscribeMsg, subscribeMsg,
                "Assert invalid-feedback: Account created success"
            )
        })

        await step("Clicking on the subscribe button again", async () => {
            await globalnavfooterpage.click(globalnavfooterpage.subscribeButton)
        })

        await step("Verify subscribe msg", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.subscribeMsg, accountexistMsg,
                "Assert invalid-feedback: Account exists"
            )
        })
    })
});

test.describe("Footer links Groups", async () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        await scrollToBottom(basicAuthPage)
    });

    test(`
        1. All links groups are displayed
        2. Verify that footer logo is displayed
        3. Copyright and current year
        `, async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const now = new Date
        const currentYear = now.getFullYear()
        const copyrightContent = `Copyright © ${currentYear} Samsonite IP Holdings S.àr.l. All rights reserved.`

        await step("Verify that links groups are displayed", async () => {
            await globalnavfooterpage.assertVisible(globalnavfooterpage.supportLinksGroups,
                "Assert Support link groups displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.ourcompanyLinksGroups,
                "Assert Our company link groups displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.accountLinksGroups,
                "Assert Account link groups displayed"
            )

            await globalnavfooterpage.assertVisible(globalnavfooterpage.followusLinksGroups,
                "Assert Follow link groups displayed"
            )
        })

        await step("Verify that footer logo is displayed", async () => {
            await globalnavfooterpage.assertVisible(globalnavfooterpage.footerLogo)
        })

        await step("Verify copyright content", async () => {
            await globalnavfooterpage.assertText(globalnavfooterpage.copyright, copyrightContent,
                "Assert copyright content and current year"
            )
        })
    })

    test("4. Support links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        const warrantyURL = t.globalnavfooter('warrantyURL')[0] || t.globalnavfooter('warrantyURL')[1]

        await steps(["sg"],"Verify that Delivery & Shipping link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Delivery & Shipping"),
                t.globalnavfooter('deliveryandshippingURL'),
                "Assert navigated URL when clicking Delivery & Shipping link", "middle"
            )
        })

        await steps(["sg"],"Verify that Returns & Exchanges link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Returns & Exchanges"),
                t.globalnavfooter('returnsandexchangesURL'),
                "Assert navigated URL when clicking Returns & Exchanges link", "middle"
            )
        })

        await step("Verify that Warranty link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Warranty"), warrantyURL,
                "Assert navigated URL when clicking Warranty link", "middle"
            )
        })

        await steps(["sg"],"Verify that Contact Us link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Contact Us"),
                t.globalnavfooter('contactusURL'),
                "Assert navigated URL when clicking Contact Us link", "middle"
            )
        })

        await steps(["sg"],"Verify that Fake Website Alert link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Fake Website Alert"),
                t.globalnavfooter('fakewebsitealertURL'),
                "Assert navigated URL when clicking Fake Website Alert link", "middle"
            )
        })

        await steps(["jp"],"Verify that Repair link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("Repair"),
                t.globalnavfooter('repairURL'),
                "Assert navigated URL when clicking Repair link", "middle"
            )
        })

        await steps(["jp"],"Verify that Wecare service link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("WECAREについて"),
                t.globalnavfooter('WECAREについて'),
                "Assert navigated URL when clicking Wecare service link", "middle"
            )
        })

        await steps(["jp"],"Verify that FAQ link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("商品についてのFAQ"),
                t.globalnavfooter('faq'),
                "Assert navigated URL when clicking FAQ link", "middle"
            )
        })

        await steps(["jp"],"Verify that FAQ Member link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("メンバープログラムについてのFAQ"),
                t.globalnavfooter('faqmember'),
                "Assert navigated URL when clicking FAQ Member link", "middle"
            )
        })

        await steps(["jp"],"Verify that TSA link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("TSAロック設定方法ついて"),
                t.globalnavfooter('tsa'),
                "Assert navigated URL when clicking TSA link", "middle"
            )
        })

        await steps(["jp"],"Verify that Trackorder link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("注文状況を確認する"),
                t.globalnavfooter('trackorder'),
                "Assert navigated URL when clicking Trackorder link", "middle"
            )
        })

        await steps(["jp"],"Verify that inquiries link", async () => {
            await globalnavfooterpage.assertNavigatedURLByClickLocator(basicAuthPage, await globalnavfooterpage.getLinksGroupsLocatorByLabel("お問い合わせ"),
                t.globalnavfooter('inquiries'),
                "Assert navigated URL when clicking inquiries link", "middle"
            )
        })
    })

    test("5. Our Company links groups", async ({ basicAuthPage }) => {
        const globalnavfooterpage = new GlobalNavFooterPage(basicAuthPage)
        
    })
})