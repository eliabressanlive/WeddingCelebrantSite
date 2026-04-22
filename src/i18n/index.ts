import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import itTranslation from './locales/it.json';
import enTranslation from './locales/en.json';
import deTranslation from './locales/de.json';
import esTranslation from './locales/es.json';

const resources = {
  it: { translation: itTranslation },
  en: { translation: enTranslation },
  de: { translation: deTranslation },
  es: { translation: esTranslation },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'it', // default language
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // React already safes from xss
    },
  });

export default i18n;
