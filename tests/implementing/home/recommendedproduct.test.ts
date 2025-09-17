import { test, expect } from "../../../src/fixtures/test-fixture";
import { HomePage } from "../../../src/pages/implementing/home/home.page";
import { step } from "allure-js-commons";
import { carouselItems } from "../../../utils/data";

test.describe("Recommended Products Section", () => {
    test(`Recommended products are displayed correctly`, async ({ basicAuthPage }) => {
        const homePage = new HomePage(basicAuthPage);

    });
});