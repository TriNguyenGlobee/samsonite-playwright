import { Page } from '@playwright/test';
import { BagsPage }  from '../../pages/delivery/productlistingpage/bags/bags.page';
import { BagsPageSG }  from '../../pages/delivery/productlistingpage/bags/bags-sg.page';
import { BagsPageJP }  from '../../pages/delivery/productlistingpage/bags/bags-jp.page';

export function createBagsPage(page: Page): BagsPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BagsPageSG(page);
    case 'jp': return new BagsPageJP(page);
    default:   return new BagsPageJP(page);
  }
}