import { useEffect } from 'react';
import { Navigate, Outlet, useLocation, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SUPPORTED_LANGUAGE_CODES } from '../../lib/i18n/languages';
import { getPreferredLanguage } from '../../lib/i18n/localePath';

const LocaleLayout = () => {
  const { lang } = useParams();
  const location = useLocation();
  const { i18n } = useTranslation();

  const isValidLocale = SUPPORTED_LANGUAGE_CODES.includes(lang);

  useEffect(() => {
    if (!isValidLocale || i18n.language === lang) return;
    i18n.changeLanguage(lang);
  }, [isValidLocale, lang, i18n]);

  if (!isValidLocale) {
    const preferred = getPreferredLanguage();
    // Drop the invalid first segment (e.g. /xx/about → /about), then prefix preferred lang.
    const rest = location.pathname.replace(/^\/[^/]+/, '') || '/';
    const suffix = rest === '/' ? '' : rest;
    return (
      <Navigate
        to={`/${preferred}${suffix}${location.search}${location.hash}`}
        replace
      />
    );
  }

  return <Outlet />;
};

export default LocaleLayout;
