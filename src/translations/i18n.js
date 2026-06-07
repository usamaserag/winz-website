import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGE_CODES } from '../lib/i18n/languages';

import enCommon from './en/common.json';
import enHome from './en/home.json';
import enContact from './en/contact.json';
import enAbout from './en/about.json';
import enServices from './en/services.json';
import enTracking from './en/tracking.json';
import enImport from './en/import.json';
import enExport from './en/export.json';
import enTransit from './en/transit.json';
import enTransport from './en/transport.json';
import enWarehouse from './en/warehouse.json';
import enBlog from './en/blog.json';
import enFaq from './en/faq.json';

const NAMESPACES = [
  'common',
  'home',
  'contact',
  'about',
  'services',
  'tracking',
  'import',
  'export',
  'transit',
  'transport',
  'warehouse',
  'blog',
  'faq',
];

/** English bundled synchronously for instant first paint; other languages lazy-loaded. */
const EN_RESOURCES = {
  common: enCommon,
  home: enHome,
  contact: enContact,
  about: enAbout,
  services: enServices,
  tracking: enTracking,
  import: enImport,
  export: enExport,
  transit: enTransit,
  transport: enTransport,
  warehouse: enWarehouse,
  blog: enBlog,
  faq: enFaq,
};

const lazyLoadBackend = {
  type: 'backend',
  init() {},
  read(language, namespace, callback) {
    const loadTranslation = {
      fr: () => import(`./fr/${namespace}.json`),
      de: () => import(`./de/${namespace}.json`),
      nl: () => import(`./nl/${namespace}.json`),
    }[language];

    if (!loadTranslation) {
      callback(null, EN_RESOURCES[namespace] ?? {});
      return;
    }

    loadTranslation()
      .then((module) => callback(null, module.default))
      .catch((error) => callback(error, null));
  },
};

i18n
  .use(lazyLoadBackend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    ns: NAMESPACES,
    defaultNS: 'common',
    resources: { en: EN_RESOURCES },
    partialBundledLanguages: true,
    interpolation: { escapeValue: false },
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
