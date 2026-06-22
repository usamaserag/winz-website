import { Link } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { localizePath } from '../../lib/i18n/localePath';

/**
 * React Router Link that prefixes internal paths with the active locale (e.g. /en/about).
 */
const LocalizedLink = ({ to, ...props }) => {
  const locale = useLocale();
  const resolvedTo =
    typeof to === 'string' && to.startsWith('/') ? localizePath(to, locale) : to;

  return <Link to={resolvedTo} {...props} />;
};

export default LocalizedLink;
