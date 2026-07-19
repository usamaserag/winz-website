export const SITE_ORIGIN = 'https://winz.be';
export const DEFAULT_OG_IMAGE = '/favicon.png';

/** Absolute site origin for SEO (browser origin when available). */
export function getSiteOrigin() {
  if (typeof window !== 'undefined' && window.location?.origin) {
    return window.location.origin;
  }
  return SITE_ORIGIN;
}

/** Normalize API base URL (no trailing slash). */
export function getApiBaseUrl() {
  return (import.meta.env.VITE_API_BASE_URL || '').replace(/\/$/, '');
}

/** Build absolute media URL from API-relative path. */
export function resolveMediaUrl(path) {
  if (!path) return DEFAULT_OG_IMAGE;
  if (/^https?:\/\//i.test(path)) return path;
  const base = getApiBaseUrl();
  return `${base}${path.startsWith('/') ? path : `/${path}`}`;
}
