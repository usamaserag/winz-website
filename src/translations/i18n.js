import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { LANGUAGE_STORAGE_KEY, SUPPORTED_LANGUAGE_CODES } from '../lib/i18n/languages';

import enAbout from './en/about.json';
import enAirFreight from './en/airFreight.json';
import enBlog from './en/blog.json';
import enBrusselsAirport from './en/brusselsAirport.json';
import enCommercial from './en/commercial.json';
import enCommon from './en/common.json';
import enContact from './en/contact.json';
import enExport from './en/export.json';
import enFaq from './en/faq.json';
import enFastTrack from './en/fastTrack.json';
import enFcl from './en/fcl.json';
import enHome from './en/home.json';
import enHsCode from './en/hsCode.json';
import enImport from './en/import.json';
import enImportBrazil from './en/importBrazil.json';
import enImportChina from './en/importChina.json';
import enImportEgypt from './en/importEgypt.json';
import enImportNigeria from './en/importNigeria.json';
import enImportSaudi from './en/importSaudi.json';
import enImportSouthAfrica from './en/importSouthAfrica.json';
import enImportTurkey from './en/importTurkey.json';
import enImportUae from './en/importUae.json';
import enImportUkraine from './en/importUkraine.json';
import enLcl from './en/lcl.json';
import enPortAntwerp from './en/portAntwerp.json';
import enPortHamburg from './en/portHamburg.json';
import enPortRotterdam from './en/portRotterdam.json';
import enRoadFreight from './en/roadFreight.json';
import enSchiphol from './en/schiphol.json';
import enServices from './en/services.json';
import enTracking from './en/tracking.json';
import enTransit from './en/transit.json';
import enTransport from './en/transport.json';
import enWarehouse from './en/warehouse.json';
import enZele from './en/zele.json';

const NAMESPACES = [
  'about',
  'airFreight',
  'blog',
  'brusselsAirport',
  'commercial',
  'common',
  'contact',
  'export',
  'faq',
  'fastTrack',
  'fcl',
  'home',
  'hsCode',
  'import',
  'importBrazil',
  'importChina',
  'importEgypt',
  'importNigeria',
  'importSaudi',
  'importSouthAfrica',
  'importTurkey',
  'importUae',
  'importUkraine',
  'lcl',
  'portAntwerp',
  'portHamburg',
  'portRotterdam',
  'roadFreight',
  'schiphol',
  'services',
  'tracking',
  'transit',
  'transport',
  'warehouse',
  'zele',
];

/** English bundled synchronously for instant first paint; other languages lazy-loaded. */
const EN_RESOURCES = {
  about: enAbout,
  airFreight: enAirFreight,
  blog: enBlog,
  brusselsAirport: enBrusselsAirport,
  commercial: enCommercial,
  common: enCommon,
  contact: enContact,
  export: enExport,
  faq: enFaq,
  fastTrack: enFastTrack,
  fcl: enFcl,
  home: enHome,
  hsCode: enHsCode,
  import: enImport,
  importBrazil: enImportBrazil,
  importChina: enImportChina,
  importEgypt: enImportEgypt,
  importNigeria: enImportNigeria,
  importSaudi: enImportSaudi,
  importSouthAfrica: enImportSouthAfrica,
  importTurkey: enImportTurkey,
  importUae: enImportUae,
  importUkraine: enImportUkraine,
  lcl: enLcl,
  portAntwerp: enPortAntwerp,
  portHamburg: enPortHamburg,
  portRotterdam: enPortRotterdam,
  roadFreight: enRoadFreight,
  schiphol: enSchiphol,
  services: enServices,
  tracking: enTracking,
  transit: enTransit,
  transport: enTransport,
  warehouse: enWarehouse,
  zele: enZele,
};

const lazyLoadBackend = {
  type: 'backend',
  init() {},
  read(language, namespace, callback) {
    const loadTranslation = {
      fr: () => import(`./fr/${namespace}.json`),
      de: () => import(`./de/${namespace}.json`),
      nl: () => import(`./nl/${namespace}.json`),
      ar: () => import(`./ar/${namespace}.json`),
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
      order: ['path', 'localStorage', 'navigator'],
      lookupFromPathIndex: 0,
      caches: ['localStorage'],
      lookupLocalStorage: LANGUAGE_STORAGE_KEY,
    },
    react: {
      useSuspense: true,
    },
  });

export default i18n;
