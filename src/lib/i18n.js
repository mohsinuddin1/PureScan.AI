import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enTranslation from '../locales/en.json';
import frTranslation from '../locales/fr.json';
import esTranslation from '../locales/es.json';
import deTranslation from '../locales/de.json';
import nlTranslation from '../locales/nl.json';
import arTranslation from '../locales/ar.json';
import arMATranslation from '../locales/ar-MA.json';
import ruTranslation from '../locales/ru.json';
import elTranslation from '../locales/el.json';
import ptTranslation from '../locales/pt.json';
import roTranslation from '../locales/ro.json';
import ltTranslation from '../locales/lt.json';
import svTranslation from '../locales/sv.json';
import daTranslation from '../locales/da.json';
import trTranslation from '../locales/tr.json';
import plTranslation from '../locales/pl.json';
import noTranslation from '../locales/no.json';
import nbTranslation from '../locales/nb.json';
import itTranslation from '../locales/it.json';
import lvTranslation from '../locales/lv.json';
import csTranslation from '../locales/cs.json';
import jaTranslation from '../locales/ja.json';
import koTranslation from '../locales/ko.json';
import zhTranslation from '../locales/zh.json';

const resources = {
  en: { translation: enTranslation },
  fr: { translation: frTranslation },
  es: { translation: esTranslation },
  de: { translation: deTranslation },
  nl: { translation: nlTranslation },
  ar: { translation: arTranslation },
  'ar-MA': { translation: arMATranslation },
  ru: { translation: ruTranslation },
  el: { translation: elTranslation },
  pt: { translation: ptTranslation },
  ro: { translation: roTranslation },
  lt: { translation: ltTranslation },
  sv: { translation: svTranslation },
  da: { translation: daTranslation },
  tr: { translation: trTranslation },
  pl: { translation: plTranslation },
  no: { translation: noTranslation },
  nb: { translation: nbTranslation },
  it: { translation: itTranslation },
  lv: { translation: lvTranslation },
  cs: { translation: csTranslation },
  ja: { translation: jaTranslation },
  ko: { translation: koTranslation },
  zh: { translation: zhTranslation },
};

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });

import { track } from '@vercel/analytics';
import { analytics, logEvent } from './firebase';

// Handle RTL direction dynamically
i18n.on('languageChanged', (lng) => {
  const dir = lng?.startsWith('ar') ? 'rtl' : 'ltr';
  document.documentElement.dir = dir;
  document.documentElement.lang = lng;
  
  // Track language selection in Vercel Analytics
  track('Language Changed', { language: lng });

  // Track language selection in Firebase Analytics
  if (analytics) {
    logEvent(analytics, 'change_language', {
      language: lng,
    });
  }
});

export default i18n;
