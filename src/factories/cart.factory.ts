import { Page } from '@playwright/test';
import { CartPage } from '../pages/delivery/cart/cart.page'
import { CartPageJP } from '../pages/delivery/cart/cart-jp.page'
import { CartPageSG } from '../pages/delivery/cart/cart-sg.page'
import { CartPageTW } from '../pages/delivery/cart/cart-tw.page';

export function createCartPage(page: Page): CartPage {
  switch (process.env.LOCALE) {
    case 'sg': return new CartPageSG(page);
    case 'jp': return new CartPageJP(page);
    case 'tw': return new CartPageTW(page);
    default:   return new CartPageJP(page);
  }
}