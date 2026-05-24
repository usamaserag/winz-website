import {
  CONSENT_STORAGE_KEY,
  CONSENT_VERSION,
  DEFAULT_CATEGORY_CONSENT,
  COOKIE_CATEGORIES,
} from './constants';

/**
 * @typedef {import('./constants').CookieCategoryId} CookieCategoryId
 * @typedef {Record<CookieCategoryId, boolean>} CategoryConsent
 * @typedef {{ version: number, timestamp: string, categories: CategoryConsent }} StoredConsent
 */

/**
 * @param {unknown} value
 * @returns {value is StoredConsent}
 */
function isValidStoredConsent(value) {
  if (!value || typeof value !== 'object') return false;
  const record = /** @type {StoredConsent} */ (value);
  if (record.version !== CONSENT_VERSION) return false;
  if (!record.categories || typeof record.categories !== 'object') return false;

  return COOKIE_CATEGORIES.every(
    ({ id }) => typeof record.categories[id] === 'boolean'
  );
}

/**
 * @returns {StoredConsent | null}
 */
export function loadConsentFromStorage() {
  if (typeof window === 'undefined') return null;

  try {
    const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    if (!raw) return null;

    const parsed = JSON.parse(raw);
    if (!isValidStoredConsent(parsed)) {
      window.localStorage.removeItem(CONSENT_STORAGE_KEY);
      return null;
    }

    return {
      ...parsed,
      categories: {
        ...DEFAULT_CATEGORY_CONSENT,
        ...parsed.categories,
        necessary: true,
      },
    };
  } catch {
    return null;
  }
}

/**
 * @param {CategoryConsent} categories
 * @returns {StoredConsent}
 */
export function saveConsentToStorage(categories) {
  const normalized = {
    ...DEFAULT_CATEGORY_CONSENT,
    ...categories,
    necessary: true,
  };

  const payload = {
    version: CONSENT_VERSION,
    timestamp: new Date().toISOString(),
    categories: normalized,
  };

  if (typeof window !== 'undefined') {
    window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(payload));
  }

  return payload;
}

/**
 * @param {CategoryConsent | null | undefined} categories
 * @param {CookieCategoryId} categoryId
 */
export function hasCategoryConsent(categories, categoryId) {
  if (!categories) return categoryId === 'necessary';
  if (categoryId === 'necessary') return true;
  return Boolean(categories[categoryId]);
}
