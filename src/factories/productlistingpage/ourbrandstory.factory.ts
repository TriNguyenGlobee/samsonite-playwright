import { Page } from '@playwright/test';
import { OurBrandStoryPage }  from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory.page';
import { OurBrandStoryPageSG }  from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-sg.page';
import { OurBrandStoryPageJP }  from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-jp.page';

export function createOurBrandStoryPage(page: Page): OurBrandStoryPage {
  switch (process.env.LOCALE) {
    case 'sg': return new OurBrandStoryPageSG(page);
    case 'jp': return new OurBrandStoryPageJP(page);
    default:   return new OurBrandStoryPageJP(page);
  }
}