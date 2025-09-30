import { LuggagePage } from "./luggage.page";
import { Page, expect } from "@playwright/test";
import { delay } from "../../../../../utils/helpers";

export class LuggagePageSG extends LuggagePage {

    // =========================
    // ✅ Assertions
    // =========================
    async assertLuggageListItems(page: Page): Promise<void> {
        await delay(3000);

        const elementsToCheck = [
            this.luggageType,
            this.luggageSize,
            this.luggageColor,
            this.luggageSmartFeature,
            this.luggageBrand,
            this.luggageDestination,
            this.luggageCollection
        ];

        for (const locator of elementsToCheck) {
            await expect(locator, `Element should be visible: ${locator.toString()}`).toBeVisible();
        }

        // --- luggage-type ---
        const typeItems = [
            { text: 'Hardside', href: '/luggage/hardside/' },
            { text: 'Softside', href: '/luggage/softside/' },
            { text: 'Aluminium', href: '/luggage/aluminium/' },
            { text: 'Shop all luggage', href: 'https://sssg.stg.samsonite-asia.com/luggage/' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-type', typeItems, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: true,
            checkPictureTag: true
        });

        // --- luggage-size ---
        const sizeItems = [
            { text: 'Cabin/Small', href: 'https://sssg.stg.samsonite-asia.com/luggage/cabin' },
            { text: 'Medium', href: 'https://sssg.stg.samsonite-asia.com/luggage/medium' },
            { text: 'Large', href: 'https://sssg.stg.samsonite-asia.com/luggage/large' }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-size', sizeItems, {
            twoLinksPerLi: true,
            lastItemIsTextOnly: false,
            checkPictureTag: true
        });

        // --- luggage-color ---
        const colorItems = [
            {
                text: 'Mono',
                href: 'https://sssg.stg.samsonite-asia.com/luggage/black_grey_silver_white'
            },
            {
                text: 'Cool',
                href: 'https://sssg.stg.samsonite-asia.com/luggage/blue_green_navy'
            },
            {
                text: 'Warm',
                href: 'https://sssg.stg.samsonite-asia.com/luggage/beige_orange_pink_red_yellow'
            },
            {
                text: 'Shop all colours',
                href: '/luggage/colour/shop-all-colours/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-color', colorItems, {lastItemIsTextOnly: true});

        // --- luggage-smart-feature ---
        const smartFeatureItems = [
            {
                text: 'Double Coil Zippers',
                href: '/luggage/smart-feature/double-coil-zippers/'
            },
            {
                text: 'Easy Brake System',
                href: '/luggage/smart-feature/easy-brake-system/'
            },
            {
                text: 'Magnetic Zippers',
                href: '/luggage/magnetic-zippers/'
            },
            {
                text: 'Suspension Wheels',
                href: '/luggage/suspension-wheels/'
            },
            {
                text: 'USB port',
                href: '/luggage/usb-port/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-smart-feature', smartFeatureItems);

        // --- luggage-brand ---
        const brandItems = [
            {
                text: 'Samsonite',
                href: '/luggage/brand-samsonite/'
            },
            {
                text: 'Samsonite Black',
                href: '/luggage/brand-samsonite-black/'
            },
            {
                text: 'Samsonite Red',
                href: '/luggage/brand-samsonite-red/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-brand', brandItems);

        // --- luggage-destination ---
        const destinationItems = [
            {
                text: 'City',
                href: '/luggage/city/'
            },
            {
                text: 'Adventure',
                href: '/luggage/adventure/'
            },
            {
                text: 'Business',
                href: '/luggage/business/'
            }
        ];
        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-destination', destinationItems);

        // --- luggage-collection ---
        const collectionItems = [
            {
                text: 'C-Lite',
                href: '/luggage/collection/c-lite/'
            },
            {
                text: 'Proxis',
                href: '/luggage/collection/proxis/'
            },
            {
                text: 'Unimax',
                href: '/luggage/collection/unimax/'
            },
            {
                text: '73H',
                href: '/luggage/collection/73h/'
            },
            {
                text: 'SBL Richmond II',
                href: '/luggage/collection/sbl-richmond-ii/'
            },
            {
                text: 'Niar',
                href: '/luggage/collection/niar/'
            }
        ];

        await this.assertItemsListForCategoryMenu(this.baseLocator, 'luggage-collection', collectionItems, {
            twoLinksPerLi: false
        });
    }

}