/** @typedef {'necessary' | 'analytics' | 'marketing' | 'preferences'} CookieCategoryId */

/**
 * @typedef {Object} CookieCategoryDefinition
 * @property {CookieCategoryId} id
 * @property {boolean} required - Always enabled; cannot be toggled off
 * @property {string} translationKey - i18n key under cookies.categories
 */

/** Bump when stored consent shape or defaults change */
export const CONSENT_VERSION = 1;

export const CONSENT_STORAGE_KEY = 'winz_cookie_consent';

/**
 * Registry of cookie categories — add entries here to expand consent UI.
 * @type {CookieCategoryDefinition[]}
 */
export const COOKIE_CATEGORIES = [
  { id: 'necessary', required: true, translationKey: 'necessary' },
  { id: 'analytics', required: false, translationKey: 'analytics' },
  { id: 'marketing', required: false, translationKey: 'marketing' },
  { id: 'preferences', required: false, translationKey: 'preferences' },
];

/** @type {Record<CookieCategoryId, boolean>} */
export const DEFAULT_CATEGORY_CONSENT = {
  necessary: true,
  analytics: false,
  marketing: false,
  preferences: false,
};

/** All optional categories enabled */
export const ACCEPT_ALL_CONSENT = {
  necessary: true,
  analytics: true,
  marketing: true,
  preferences: true,
};

/** Only required cookies */
export const REJECT_NON_ESSENTIAL_CONSENT = {
  ...DEFAULT_CATEGORY_CONSENT,
  necessary: true,
};
