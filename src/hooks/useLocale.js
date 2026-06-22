import { useParams, useLocation } from 'react-router-dom';
import { DEFAULT_LANGUAGE } from '../lib/i18n/languages';
import { getLocaleFromPathname, localizePath, stripLocaleFromPath } from '../lib/i18n/localePath';

export function useLocale() {
  const { lang } = useParams();
  if (lang && getLocaleFromPathname(`/${lang}`)) return lang;
  return DEFAULT_LANGUAGE;
}

export function useLocalizedPath() {
  const locale = useLocale();
  return (path) => localizePath(path, locale);
}

export function usePathWithoutLocale() {
  const { pathname } = useLocation();
  return stripLocaleFromPath(pathname);
}
