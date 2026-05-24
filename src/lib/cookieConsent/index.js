export {
  CONSENT_VERSION,
  CONSENT_STORAGE_KEY,
  COOKIE_CATEGORIES,
  DEFAULT_CATEGORY_CONSENT,
  ACCEPT_ALL_CONSENT,
  REJECT_NON_ESSENTIAL_CONSENT,
} from './constants';

export {
  loadConsentFromStorage,
  saveConsentToStorage,
  hasCategoryConsent,
} from './storage';
