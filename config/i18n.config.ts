import fs from 'fs';
import path from 'path';

export type Locale = 'en' | 'ja';

const defaultLocale: Locale = 'en';

// Get LOCALE from terminal (defautl: en)
const currentLocale: Locale = (process.env.LOCALE as Locale) || defaultLocale;

// locales folder path
const localesDir = path.join(__dirname, '..', 'locales');

// Read JSON
let translations: any = {};

try {
  const filePath = path.join(localesDir, `${currentLocale}.json`);
  const rawData = fs.readFileSync(filePath, 'utf-8');
  translations = JSON.parse(rawData);
} catch (error) {
  console.warn(`Cannot load JSON file [${currentLocale}]. Using fallback: ${defaultLocale}`);
  const fallbackData = fs.readFileSync(path.join(localesDir, `${defaultLocale}.json`), 'utf-8');
  translations = JSON.parse(fallbackData);
}

export const I18n = {
  locale: currentLocale,
  translations,
};
