import { Page } from '@playwright/test';
import { LuggagePage }  from '../../pages/delivery/productlistingpage/luggage/luggage.page';
import { LuggagePageSG }  from '../../pages/delivery/productlistingpage/luggage/luggage-sg.page';
import { LuggagePageJP }  from '../../pages/delivery/productlistingpage/luggage/luggage-jp.page';
import { LuggagePageTW }  from '../../pages/delivery/productlistingpage/luggage/luggage-tw.page';

export function createLuggagePage(page: Page): LuggagePage {
  switch (process.env.LOCALE) {
    case 'sg': return new LuggagePageSG(page);
    case 'jp': return new LuggagePageJP(page);
    case 'tw': return new LuggagePageTW(page);
    default:   return new LuggagePageJP(page);
  }
}