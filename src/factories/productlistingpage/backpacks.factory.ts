import { Page } from '@playwright/test';
import { BackpacksPage }  from '../../pages/delivery/productlistingpage/backpacks/backpacks.page';
import { BackpacksPageSG }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-sg.page';
import { BackpacksPageJP }  from '../../pages/delivery/productlistingpage/backpacks/backpacks-jp.page';

export function createBackpacksPage(page: Page): BackpacksPage {
  switch (process.env.LOCALE) {
    case 'sg': return new BackpacksPageSG(page);
    case 'jp': return new BackpacksPageJP(page);
    default:   return new BackpacksPageJP(page);
  }
}