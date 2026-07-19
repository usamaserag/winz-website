import { stripLocaleFromPath } from './i18n/localePath';

/** Routes whose top section uses the dark navy hero (navbar blends with hero). */
const DARK_HERO_EXACT = new Set([
  '/',
  '/about',
  '/contact',
  '/faq',
  '/blog',
  '/services',
  '/export',
  '/transit',
  '/transport',
  '/warehouse',
  '/categories',
]);

/** Routes with a custom light hero at the top — keep white navbar. */
const LIGHT_HERO_EXACT = new Set(['/import']);

/**
 * @param {string} pathname
 * @returns {boolean}
 */
export function pageHasDarkHero(pathname) {
  const path = stripLocaleFromPath(pathname);
  if (LIGHT_HERO_EXACT.has(path)) return false;
  if (DARK_HERO_EXACT.has(path)) return true;
  if (path.startsWith('/blog/')) return true;
  if (path.startsWith('/faq/')) return true;
  if (path.startsWith('/categories')) return true;
  if (path.startsWith('/subcategories')) return true;
  return false;
}

export const HERO_NAV_BG =
  'bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800 border-b border-white/10';
