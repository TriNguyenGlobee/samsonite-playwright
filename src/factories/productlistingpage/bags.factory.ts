import { Page } from '@playwright/test';
import { BagsPage }  from '../../pages/delivery/productlistingpage/bags/bags.page';
import { BagsPageSG }  from '../../pages/delivery/productlistingpage/bags/bags-sg.page';
import { BagsPageJP }  from '../../pages/delivery/productlistingpage/bags/bags-jp.page';
import { BagsPageTW } from '../../pages/delivery/productlistingpage/bags/bags-tw.page';
import { BagsPagePH } from '../../pages/delivery/productlistingpage/bags/bags-ph.page';
import { BagsPageAU } from '../../pages/delivery/productlistingpage/bags/bags-au.page';

export function createBagsPage(page: Page): BagsPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BagsPageSG(page);
    case 'jp': return new BagsPageJP(page);
    case 'tw': return new BagsPageTW(page);
    case 'ph': return new BagsPagePH(page);
    case 'au': return new BagsPageAU(page);
    default:   return new BagsPageJP(page);
  }
}