import { Page } from '@playwright/test';
import { OurBrandStoryPage }  from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory.page';
import { OurBrandStoryPageSG }  from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-sg.page';
import { OurBrandStoryPageJP }  from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-jp.page';
import { OurBrandStoryPageTW } from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-tw.page';
import { OurBrandStoryPagePH } from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-ph.page';
import { OurBrandStoryPageAU } from '../../pages/delivery/productlistingpage/ourbrandstory/ourbrandstory-au.page';

export function createOurBrandStoryPage(page: Page): OurBrandStoryPage {
  switch (process.env.LOCALE) {
    case 'sg': return new OurBrandStoryPageSG(page);
    case 'jp': return new OurBrandStoryPageJP(page);
    case 'tw': return new OurBrandStoryPageTW(page);
    case 'ph': return new OurBrandStoryPagePH(page);
    case 'au': return new OurBrandStoryPageAU(page);
    default:   return new OurBrandStoryPageJP(page);
  }
}