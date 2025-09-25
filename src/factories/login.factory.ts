import { Page } from '@playwright/test';
import { LoginPage } from '../pages/delivery/login/login.page';
import { LoginSG } from '../pages/delivery/login/login-sg.page'
import { LoginJP } from '../pages/delivery/login/login-jp.page';

export function createLoginPage(page: Page): LoginPage {
  switch (process.env.LOCALE) {
    case 'sg': return new LoginSG(page);
    case 'jp': return new LoginJP(page);
    default:   return new LoginJP(page);
  }
}