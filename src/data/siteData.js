/**
 * siteData.js — Static CSV data bundled at build time.
 *
 * Uses Vite's `?raw` import to embed the CSV text directly into
 * the JavaScript bundle. The CSV is parsed once and cached in memory.
 * Zero network requests — no fetch(), no loading state needed.
 */
import rawCSV from '../../data.csv';
import { parseCSV } from '../services/csvService';

let _cache = null;

/**
 * Returns all parsed CSV rows with type classification and slugs.
 * Result is memoized for the lifetime of the application.
 *
 * @returns {Record<string, string>[]} Parsed and classified data rows
 */
export function getSiteData() {
  if (!_cache) {
    try {
      const { data } = parseCSV(rawCSV);
      _cache = data;
    } catch (err) {
      console.error('[siteData] Failed to parse bundled CSV data:', err);
      _cache = [];
    }
  }
  return _cache;
}

/**
 * Returns only FAQ rows.
 * @returns {Record<string, string>[]}
 */
export function getFAQs() {
  return getSiteData().filter(row => row.type === 'faq');
}

/**
 * Returns only Blog rows.
 * @returns {Record<string, string>[]}
 */
export function getBlogs() {
  return getSiteData().filter(row => row.type === 'blog');
}

/**
 * Find a single blog post by slug.
 * @param {string} slug
 * @returns {Record<string, string> | undefined}
 */
export function getBlogBySlug(slug) {
  return getSiteData().find(row => row.slug === slug && row.type === 'blog');
}
