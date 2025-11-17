import { Page } from '@playwright/test';
import { BrandPage }  from '../../pages/delivery/productlistingpage/brand/brand.page';
import { BrandPageSG }  from '../../pages/delivery/productlistingpage/brand/brand-sg.page';
import { BrandPageJP }  from '../../pages/delivery/productlistingpage/brand/brand-jp.page';
import { BrandPageTW } from '../../pages/delivery/productlistingpage/brand/brand-tw.page';

export function createBrandPage(page: Page): BrandPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BrandPageSG(page);
    case 'jp': return new BrandPageJP(page);
    case 'tw': return new BrandPageTW(page);
    default:   return new BrandPageJP(page);
  }
}