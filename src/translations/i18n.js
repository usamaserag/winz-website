import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import enCommon   from './en/common.json';
import enHome     from './en/home.json';
import enContact  from './en/contact.json';
import enAbout    from './en/about.json';
import enServices from './en/services.json';
import enTracking from './en/tracking.json';

import arCommon   from './ar/common.json';
import arHome     from './ar/home.json';
import arContact  from './ar/contact.json';
import arAbout    from './ar/about.json';
import arServices from './ar/services.json';
import arTracking from './ar/tracking.json';

const resources = {
  en: {
    common:   enCommon,
    home:     enHome,
    contact:  enContact,
    about:    enAbout,
    services: enServices,
    tracking: enTracking,
  },
  ar: {
    common:   arCommon,
    home:     arHome,
    contact:  arContact,
    about:    arAbout,
    services: arServices,
    tracking: arTracking,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    // Supported languages – prevents detector from picking unsupported locales
    supportedLngs: ['en', 'ar'],
    // Fallback if detected language is not supported
    fallbackLng: 'en',
    // All namespaces
    ns: ['common', 'home', 'contact', 'about', 'services', 'tracking'],
    defaultNS: 'common',
    // Language detector configuration
    detection: {
      // Order in which to detect the language
      order: ['localStorage', 'navigator', 'htmlTag'],
      // Key name used in localStorage
      lookupLocalStorage: 'winz_lang',
      // Save the chosen language to localStorage so it persists on reload
      caches: ['localStorage'],
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
