import { Navigate, useLocation } from 'react-router-dom';
import { getPreferredLanguage } from '../../lib/i18n/localePath';

/** Redirects old URLs without a locale prefix (e.g. /about → /en/about). */
const LegacyRedirect = () => {
  const location = useLocation();
  const preferred = getPreferredLanguage();

  return (
    <Navigate
      to={`/${preferred}${location.pathname}${location.search}${location.hash}`}
      replace
    />
  );
};

export default LegacyRedirect;
