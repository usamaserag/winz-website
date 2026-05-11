import { useEffect } from 'react';

/**
 * Sets the browser tab title.
 * @param {string} title - Page-specific title (e.g. "About Us")
 * @param {string} [suffix="WINZ"] - Brand suffix appended after a separator
 */
const usePageTitle = (title, suffix = 'WINZ') => {
  useEffect(() => {
    const prev = document.title;
    document.title = title ? `${title} | ${suffix}` : suffix;
    return () => { document.title = prev; };
  }, [title, suffix]);
};

export default usePageTitle;
