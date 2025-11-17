import { Page } from '@playwright/test';
import { OffersPage }  from '../../pages/delivery/productlistingpage/offers/offers.page';
import { OffersPageTW } from '../../pages/delivery/productlistingpage/offers/offers-tw.page';
import { OffersPageJP } from '../../pages/delivery/productlistingpage/offers/offers-jp.page';

export function createOffersPage(page: Page): OffersPage {
  switch (process.env.LOCALE) {
    case 'tw': return new OffersPageTW(page);
    case 'jp': return new OffersPageJP(page);
    default: return new OffersPageJP(page);
  }
}