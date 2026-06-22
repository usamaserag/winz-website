import {
  DEFAULT_LANGUAGE,
  SUPPORTED_LANGUAGE_CODES,
  LANGUAGE_STORAGE_KEY,
} from './languages';

/**
 * @param {string} pathname
 * @returns {string | null}
 */
export function getLocaleFromPathname(pathname) {
  const match = pathname.match(/^\/([a-z]{2})(\/|$)/);
  const code = match?.[1];
  return code && SUPPORTED_LANGUAGE_CODES.includes(code) ? code : null;
}

/**
 * @param {string} pathname
 * @returns {string}
 */
export function stripLocaleFromPath(pathname) {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname || '/';
  const stripped = pathname.slice(`/${locale}`.length) || '/';
  return stripped.startsWith('/') ? stripped : `/${stripped}`;
}

/**
 * @param {string} path
 * @param {string} [locale]
 * @returns {string}
 */
export function localizePath(path, locale = DEFAULT_LANGUAGE) {
  if (!path.startsWith('/')) return path;

  const existingLocale = getLocaleFromPathname(path);
  if (existingLocale) return path;

  if (path === '/') return `/${locale}`;
  return `/${locale}${path}`;
}

/**
 * @returns {string}
 */
export function getPreferredLanguage() {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored && SUPPORTED_LANGUAGE_CODES.includes(stored)) return stored;
  } catch {
    /* private browsing */
  }

  const browser = navigator.language?.slice(0, 2).toLowerCase();
  if (browser && SUPPORTED_LANGUAGE_CODES.includes(browser)) return browser;

  return DEFAULT_LANGUAGE;
}
