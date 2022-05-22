import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

// this is what will detect the navigator language
// and apply the adequate translation id it exists or the default one
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  // load translation using http into files in /public/locales
  .use(Backend)
  // detect user language
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  .init({
    react: {
      useSuspense: false,
      wait: true,
    },
    fallbackLng: 'fr', // we want french to be default
    debug: true,
  });

export default i18n;
