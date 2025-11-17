import { Page } from '@playwright/test';
import { BackpacksPage }  from '../../pages/delivery/productlistingpage/backpacks/backpacks.page';
import { BackpacksPageSG }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-sg.page';
import { BackpacksPageJP }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-jp.page';
import { BackpacksPageTW }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-tw.page';

export function createBackpacksPage(page: Page): BackpacksPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BackpacksPageSG(page);
    case 'jp': return new BackpacksPageJP(page);
    case 'tw': return new BackpacksPageTW(page);
    default:   return new BackpacksPageJP(page);
  }
}