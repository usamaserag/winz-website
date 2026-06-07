import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import {
  ACCEPT_ALL_CONSENT,
  COOKIE_CATEGORIES,
  REJECT_NON_ESSENTIAL_CONSENT,
} from '../lib/cookieConsent/constants';
import {
  hasCategoryConsent,
  loadConsentFromStorage,
  saveConsentToStorage,
} from '../lib/cookieConsent/storage';

/** @typedef {import('../lib/cookieConsent/constants').CookieCategoryId} CookieCategoryId */
/** @typedef {import('../lib/cookieConsent/storage').StoredConsent} StoredConsent */

const CookieContext = createContext(null);

function dispatchConsentChange(categories) {
  if (typeof window === 'undefined') return;

  window.dispatchEvent(
    new CustomEvent('winz-cookie-consent-change', { detail: categories })
  );
}

export function CookieProvider({ children }) {
  const [consent, setConsent] = useState(
    /** @type {StoredConsent | null} */ (() => {
      if (typeof window === 'undefined') return null;
      return loadConsentFromStorage();
    })
  );
  const [isReady] = useState(() => typeof window !== 'undefined');
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);

  const persistConsent = useCallback((categories) => {
    const saved = saveConsentToStorage(categories);
    setConsent(saved);
    dispatchConsentChange(saved.categories);
    return saved;
  }, []);

  const acceptAll = useCallback(() => {
    persistConsent(ACCEPT_ALL_CONSENT);
    setIsPreferencesOpen(false);
  }, [persistConsent]);

  const rejectNonEssential = useCallback(() => {
    persistConsent(REJECT_NON_ESSENTIAL_CONSENT);
    setIsPreferencesOpen(false);
  }, [persistConsent]);

  const savePreferences = useCallback(
    (categories) => {
      persistConsent(categories);
      setIsPreferencesOpen(false);
    },
    [persistConsent]
  );

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  const hasConsent = useCallback(
    (categoryId) => hasCategoryConsent(consent?.categories, categoryId),
    [consent]
  );

  const showBanner = isReady && consent === null;
  const requiresConsent = showBanner;
  const canDismissPreferences = consent !== null;

  const value = useMemo(
    () => ({
      isReady,
      consent,
      categories: COOKIE_CATEGORIES,
      showBanner,
      requiresConsent,
      canDismissPreferences,
      isPreferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
      hasConsent,
    }),
    [
      isReady,
      consent,
      showBanner,
      requiresConsent,
      canDismissPreferences,
      isPreferencesOpen,
      acceptAll,
      rejectNonEssential,
      savePreferences,
      openPreferences,
      closePreferences,
      hasConsent,
    ]
  );

  return (
    <CookieContext.Provider value={value}>{children}</CookieContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieContext);
  if (!context) {
    throw new Error('useCookieConsent must be used within a CookieProvider');
  }
  return context;
}
