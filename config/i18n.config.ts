import fs from 'fs';
import path from 'path';
import en from '../locales/en.json';

export type Locale = 'en' | 'ja';
const defaultLocale: Locale = 'en';
const currentLocale: Locale = (process.env.LOCALE as Locale) || defaultLocale;

const localesDir = path.join(__dirname, '..', 'locales');

export type Translations = typeof en;

function loadTranslations(locale: Locale): Translations {
  try {
    const filePath = path.join(localesDir, `${locale}.json`);
    const rawData = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(rawData);
  } catch (error) {
    console.warn(`Cannot load JSON file [${locale}]. Using fallback: ${defaultLocale}`);
    const fallbackData = fs.readFileSync(path.join(localesDir, `${defaultLocale}.json`), 'utf-8');
    return JSON.parse(fallbackData);
  }
}

export const I18n = {
  locale: currentLocale,
  translations: loadTranslations(currentLocale),
};
