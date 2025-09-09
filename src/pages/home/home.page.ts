import { Page, Locator } from "@playwright/test";
import { BasePage } from "../base.page";
import { step } from "allure-js-commons";

export class HomePage extends BasePage {
    readonly logoImg: Locator;
    readonly headerNavBar: Locator;
    readonly newArrivalsMenuItem: Locator;
    readonly luggageMenuItem: Locator;
    readonly backPacksMenuItem: Locator;
    readonly bagsMenuItem: Locator;
    readonly labelsMenuItem: Locator;
    readonly offersMenuItem: Locator;
    readonly discoverMenuItem: Locator;
    readonly friendsOfSamsoniteMenuItem: Locator;
    readonly rightNavbar: Locator;
    readonly searchIcon: Locator;
    readonly wishlistIcon: Locator;
    readonly loginIcon: Locator;
    readonly locationIcon: Locator;
    readonly cartIcon: Locator;
    readonly centerBanner: Locator;

    constructor(page: Page) {
        super(page);
        this.logoImg = page.locator('//div[contains(@class,"main-logo-wrapper")]');
        this.headerNavBar = page.locator('//div[contains(@class,"header-content")]//ul[@class="nav navbar-nav"]');
        this.newArrivalsMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="New Arrivals"]');
        this.luggageMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="Luggages"]');
        this.backPacksMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="Backpacks"]');
        this.bagsMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="Bags"]');
        this.labelsMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="Labels"]');
        this.offersMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="OFFERS"]');
        this.discoverMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="Discover"]');
        this.friendsOfSamsoniteMenuItem = this.headerNavBar.locator('.//a[normalize-space(text())="FRIENDS OF SAMSONITE"]');
        this.rightNavbar = page.locator('//div[contains(@class,"right navbar-header")]');
        this.searchIcon = this.rightNavbar.locator('.//button[i[contains(@class,"search")]]');
        this.wishlistIcon = this.rightNavbar.locator('.//a[i[contains(@class,"heart")]]');
        this.loginIcon = this.rightNavbar.locator('.//a[span[contains(text(),"Login/Register")]]');
        this.locationIcon = this.rightNavbar.locator('.//a[i[contains(@class,"location")]]');
        this.cartIcon = this.rightNavbar.locator('.//a[contains(@class,"minicart")]');
        this.centerBanner = page.locator('//div[@class="category-banner"]//img');
    }

    // =========================
    // 🚀 Actions
    // =========================


    // =========================
    // 📦 Helpers
    // =========================


    // =========================
    // ✅ Assertions
    // =========================
}
