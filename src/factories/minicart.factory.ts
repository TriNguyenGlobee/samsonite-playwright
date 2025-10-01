import { Page } from '@playwright/test';
import { MinicartPage } from '../../src/pages/delivery/cart/minicart.page'
import { MinicartPageJP } from '../../src/pages/delivery/cart/minicart-jp.page'
import { MinicartPageSG } from '../../src/pages/delivery/cart/minicart-sg.page'

export function createMinicartPage(page: Page): MinicartPage {
  switch (process.env.LOCALE) {
    case 'sg': return new MinicartPageSG(page);
    case 'jp': return new MinicartPageJP(page);
    default:   return new MinicartPageJP(page);
  }
}