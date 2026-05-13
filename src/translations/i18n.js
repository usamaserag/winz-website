import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

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
  .use(initReactI18next)
  .init({
    resources,
    lng:          'en',        // always start in English
    fallbackLng:  'en',
    supportedLngs: ['en', 'ar'],
    ns:           ['common', 'home', 'contact', 'about', 'services', 'tracking'],
    defaultNS:    'common',
    interpolation: { escapeValue: false },
  });

export default i18n;
