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

import frCommon from './fr/common.json';
import frHome from './fr/home.json';
import frContact from './fr/contact.json';
import frAbout from './fr/about.json';
import frServices from './fr/services.json';
import frTracking from './fr/tracking.json';
import frImport from './fr/import.json';
import frExport from './fr/export.json';
import frTransit from './fr/transit.json';
import frTransport from './fr/transport.json';
import frWarehouse from './fr/warehouse.json';
import frBlog from './fr/blog.json';
import frFaq from './fr/faq.json';

import deCommon from './de/common.json';
import deHome from './de/home.json';
import deContact from './de/contact.json';
import deAbout from './de/about.json';
import deServices from './de/services.json';
import deTracking from './de/tracking.json';
import deImport from './de/import.json';
import deExport from './de/export.json';
import deTransit from './de/transit.json';
import deTransport from './de/transport.json';
import deWarehouse from './de/warehouse.json';
import deBlog from './de/blog.json';
import deFaq from './de/faq.json';

import nlCommon from './nl/common.json';
import nlHome from './nl/home.json';
import nlContact from './nl/contact.json';
import nlAbout from './nl/about.json';
import nlServices from './nl/services.json';
import nlTracking from './nl/tracking.json';
import nlImport from './nl/import.json';
import nlExport from './nl/export.json';
import nlTransit from './nl/transit.json';
import nlTransport from './nl/transport.json';
import nlWarehouse from './nl/warehouse.json';
import nlBlog from './nl/blog.json';
import nlFaq from './nl/faq.json';

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

const bundle = (common, home, contact, about, services, tracking, imp, exp, transit, transport, warehouse, blog, faq) => ({
  common,
  home,
  contact,
  about,
  services,
  tracking,
  import: imp,
  export: exp,
  transit,
  transport,
  warehouse,
  blog,
  faq,
});

const resources = {
  en: bundle(
    enCommon,
    enHome,
    enContact,
    enAbout,
    enServices,
    enTracking,
    enImport,
    enExport,
    enTransit,
    enTransport,
    enWarehouse,
    enBlog,
    enFaq
  ),
  fr: bundle(
    frCommon,
    frHome,
    frContact,
    frAbout,
    frServices,
    frTracking,
    frImport,
    frExport,
    frTransit,
    frTransport,
    frWarehouse,
    frBlog,
    frFaq
  ),
  de: bundle(
    deCommon,
    deHome,
    deContact,
    deAbout,
    deServices,
    deTracking,
    deImport,
    deExport,
    deTransit,
    deTransport,
    deWarehouse,
    deBlog,
    deFaq
  ),
  nl: bundle(
    nlCommon,
    nlHome,
    nlContact,
    nlAbout,
    nlServices,
    nlTracking,
    nlImport,
    nlExport,
    nlTransit,
    nlTransport,
    nlWarehouse,
    nlBlog,
    nlFaq
  ),
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: SUPPORTED_LANGUAGE_CODES,
    ns: NAMESPACES,
    defaultNS: 'common',
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
