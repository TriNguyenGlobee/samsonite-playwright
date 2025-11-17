import { test } from "../../../src/fixtures/test-fixture";
import { step } from "allure-js-commons";
import { createHomePage } from "../../../src/factories/home.factory";
import { PageUtils, t } from "../../../utils/helpers/helpers";
import { tests } from "../../../utils/helpers/localeTest";
import { steps } from "../../../utils/helpers/localeStep";
import { createOurBrandStoryPage } from "../../../src/factories/productlistingpage/ourbrandstory.factory";

test.describe("Discover/Our Brand Story Page", () => {
    test.beforeEach(async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        await PageUtils.waitForPageLoad(basicAuthPage)
        await homepage.clickMenuItem('discover', "Go to Discover page")
    })

    test(`
        1. Assert that the Discover/Our Brand Story page is displayed
        `, async ({ basicAuthPage }) => {
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)
        const expectedURL = t.ourbrandstorypage('url')

        await step("Verity Discover/Our Brand Story page URL", async () => {
            await ourbrandstorypage.assertUrl(expectedURL.toString(), "Assert Discover/Our Brand Story page URL")
        })
    })
});

test.describe("Discover sub-categories", async () => {
    test(`
        1. Go to Fathers day gifts page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Father day gifts type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('fathersday')}`,
                "Discover -> Latest -> Father's day gifts"
            )
        })

        await step("Verity Father day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/fathers-day-gifts/, "Assert Father day gifts URL")
        })
    })

    tests(["sg", "tw"],`
        2. Go to Mothers day gifts page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Mothers day gifts type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('mothersday')}`,
                "Discover -> Latest -> Mother's day gifts"
            )
        })

        await step("Verity Mothers day gifts URL", async () => {
            await ourbrandstorypage.assertUrl(/mothers-day-gifts/, "Assert Mothers day gifts URL")
        })
    })

    tests(["sg", "tw"],`
        3. Go to Wedding and honeymoon page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Wedding and honeymoon type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('weddingandhoneymoon')}`,
                "Discover -> Latest -> Wedding and honeymoon"
            )
        })

        await step("Verity Wedding and honeymoon URL", async () => {
            await ourbrandstorypage.assertUrl(/wedding-and-honeymoon/, "Assert Wedding and honeymoon URL")
        })
    })

    tests(["sg", "tw"],`
        4. Go to Your Business Look page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Your Business Look type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('yourbusinesslook')}`,
                "Discover -> Latest -> Your Business Look"
            )
        })

        await step("Verity Your Business Look URL", async () => {
            await ourbrandstorypage.assertUrl(/your-business-look/, "Assert Your Business Look URL")
        })
    })

    tests(["sg"],`
        5. Go to Your Backpack Look page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Your Backpack Look type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('yourbackpacklook')}`,
                "Discover -> Latest -> Your Backpack Look"
            )
        })

        await step("Verity Your Backpack Look URL", async () => {
            await ourbrandstorypage.assertUrl(/your-backpack-look/, "Assert Your Backpack Look URL")
        })
    })

    tests(["sg"],`
        6. Go to Lavish Travels page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Lavish Travels type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('lavishtravels')}`,
                "Discover -> Latest -> Lavish Travels"
            )
        })

        await step("Verity Lavish Travels URL", async () => {
            await ourbrandstorypage.assertUrl(/lavish-travels/, "Assert Lavish Travels URL")
        })
    })

    tests(["sg", "jp"],`
        7. Go to The Art of Packing page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to The Art of Packing type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('theartofpacking')}`,
                "Discover -> Latest -> The Art of Packing"
            )
        })

        await step("Verity The Art of Packing URL", async () => {
            await ourbrandstorypage.assertUrl(/(art-of-packing|packing)/, "Assert The Art of Packing URL")
        })
    })

    tests(["sg"],`
        8. Go to The Best Bags for every Travel Need page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to The Best Bags for every Travel Need type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('thebestbagsforeverytravelneed')}`,
                "Discover -> Latest -> The Best Bags for every Travel Need"
            )
        })

        await step("Verity The Best Bags for every Travel Need URL", async () => {
            await ourbrandstorypage.assertUrl(/best-bags/, "Assert The Best Bags for every Travel Need URL")
        })
    })

    tests(["jp", "sg"],`
        9. Go to Beyond The Design page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await steps(["jp"],"Go to Beyond The Design type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('goingbeyonddesign')}`,
                "Discover -> Latest -> Going Beyond Design"
            )
        })

        await steps(["sg"],"Go to Beyond The Design type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('goingbeyonddesign')}`,
                "Discover -> About -> Going Beyond Design"
            )
        })

        await step("Verity Going Beyond Design URL", async () => {
            await ourbrandstorypage.assertUrl(/going-beyond-design/, "Assert Going Beyond Design URL")
        })
    })

    tests(["jp", "sg"],`
        10. Go to Beyond The Average Test page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await steps(["jp"], "Go to Beyond The Average Test type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('goingbeyondtesting')}`,
                "Discover -> Latest -> Going Beyond Testing"
            )
        })

        await steps(["sg"], "Go to Beyond The Average Test type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('goingbeyondtesting')}`,
                "Discover -> About -> Going Beyond Testing"
            )
        })

        await step("Verity Going Beyond Testing URL", async () => {
            await ourbrandstorypage.assertUrl(/going-beyond-testing/, "Assert Going Beyond Testing URL")
        })
    })

    tests(["jp"],`
        11. Go to VS series page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to VS series type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('vsseries')}`,
                "Discover -> Latest -> VS Series"
            )
        })

        await step("Verity VS Series URL", async () => {
            await ourbrandstorypage.assertUrl(/vs-series/, "Assert VS Series URL")
        })
    })

    tests(["jp"],`
        12. Go to first suitcase page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to first suitcase type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('firstsuitcase')}`,
                "Discover -> Latest -> First Suitcase"
            )
        })

        await step("Verity First Suitcase URL", async () => {
            await ourbrandstorypage.assertUrl(/first_suitcase/, "Assert First Suitcase URL")
        })
    })

    tests(["jp"],`
        13. Go to business bags page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to business bags type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('businessbags')}`,
                "Discover -> Latest -> Business Bags"
            )
        })

        await step("Verity Business Bags URL", async () => {
            await ourbrandstorypage.assertUrl(/business-bags/, "Assert Business Bags URL")
        })
    })

    tests(["jp"],`
        14. Go to unpack your world page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to unpack your world type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('latest')}->${t.lv2MenuItem('unpackyourworld')}`,
                "Discover -> Latest -> Unpack Your World"
            )
        })

        await step("Verity Unpack Your World URL", async () => {
            await ourbrandstorypage.assertUrl(/unpack-your-world/, "Assert Unpack Your World URL")
        })
    })

    test(`
        15. Go to Our Responsible Journey page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Our Responsible Journey type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('ourresponsiblejourney')}`,
                "Discover -> About -> Our Responsible Journey"
            )
        })

        await step("Verity Our Responsible Journey URL", async () => {
            await ourbrandstorypage.assertUrl(/sustainability/, "Assert Our Responsible Journey URL")
        })
    })

    test(`
        16. Go to Brand story page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Brand story type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('ourbrandstory')}`,
                "Discover -> About -> Our Brand Story"
            )
        })

        await step("Verity Our Brand Story URL", async () => {
            await ourbrandstorypage.assertUrl(/brand-story/, "Assert Our Brand Story URL")
        })
    })

    tests(["sg"],`
        17. Go to Friends of Samsonite page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Friends of Samsonite type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('friendsofsamsonite')}`,
                "Discover -> About -> Friends of Samsonite"
            )
        })

        await step("Verity Friends of Samsonite URL", async () => {
            await ourbrandstorypage.assertUrl(/friends-of-samsonite/, "Assert Friends of Samsonite URL")
        })
    })

    tests(["sg"],`
        18. Go to Browse Our Collections page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to Browse Our Collections type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('discover-collection')}->${t.lv2MenuItem('browseourcollections')}`,
                "Discover -> About -> Browse Our Collections"
            )
        })

        await step("Verity Browse Our Collections URL", async () => {
            await ourbrandstorypage.assertUrl(/collection/, "Assert Browse Our Collections URL")
        })
    })

    tests(["jp"],`
        19. Go to About Hartmann page
        `, async ({ basicAuthPage }) => {
        const homepage = createHomePage(basicAuthPage)
        const ourbrandstorypage = createOurBrandStoryPage(basicAuthPage)

        await step("Go to About Hartmann type", async () => {
            await PageUtils.waitForPageLoad(basicAuthPage)
            await homepage.selectSamsoniteMenuItem(basicAuthPage, `${t.menuItem('discover')}->${t.lv2MenuItem('about')}->${t.lv2MenuItem('about-hartmann')}`,
                "Discover -> About -> About Hartmann"
            )
        })

        await step("Verity About Hartmann URL", async () => {
            await ourbrandstorypage.assertUrl(/about-hartmann/, "Assert About Hartmann URL")
        })
    })
})