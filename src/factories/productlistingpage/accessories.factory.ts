import { Page } from '@playwright/test';
import { AccessoriesPage } from '../../pages/delivery/productlistingpage/accessories/accessories.page';
import { AccessoriesPageAU }  from '../../pages/delivery/productlistingpage/accessories/accessories-au.page';
import { AccessoriesPageSG }  from '../../pages/delivery/productlistingpage/accessories/accessories-sg.page';

export function createAccessoriesPage(page: Page): AccessoriesPage {
  switch (process.env.LOCALE) {
    case 'sg': return new AccessoriesPageSG(page);
    case 'au': return new AccessoriesPageAU(page);
    default:   return new AccessoriesPageSG(page);
  }
}