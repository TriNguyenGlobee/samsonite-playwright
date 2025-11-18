import { Page } from '@playwright/test';
import { HomePage } from '../pages/delivery/home/home.page'
import { HomePageSG } from '../pages/delivery/home/home-sg.page'
import { HomePageJP } from '../pages/delivery/home/home-jp.page'
import { HomePageTW } from '../pages/delivery/home/home-tw.page';
import { HomePagePH } from '../pages/delivery/home/home-ph.page';

export function createHomePage(page: Page): HomePage {
  switch (process.env.LOCALE) {
    case 'sg': return new HomePageSG(page);
    case 'jp': return new HomePageJP(page);
    case 'tw': return new HomePageTW(page);
    case 'ph': return new HomePagePH(page);
    default:   return new HomePageJP(page);
  }
}