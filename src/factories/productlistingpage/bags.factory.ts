import { Page } from '@playwright/test';
import { BagsPage }  from '../../pages/delivery/productlistingpage/bags/bags.page';
import { BagsPageSG }  from '../../pages/delivery/productlistingpage/bags/bags-sg.page';
import { BagsPageJP }  from '../../pages/delivery/productlistingpage/bags/bags-jp.page';
import { BagsPageTW } from '../../pages/delivery/productlistingpage/bags/bags-tw.page';

export function createBagsPage(page: Page): BagsPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BagsPageSG(page);
    case 'jp': return new BagsPageJP(page);
    case 'tw': return new BagsPageTW(page);
    default:   return new BagsPageJP(page);
  }
}