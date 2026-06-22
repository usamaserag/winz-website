import { Navigate, useLocation } from 'react-router-dom';
import { getPreferredLanguage } from '../../lib/i18n/localePath';

const RootRedirect = () => {
  const location = useLocation();
  const preferred = getPreferredLanguage();

  return (
    <Navigate
      to={`/${preferred}${location.search}${location.hash}`}
      replace
    />
  );
};

export default RootRedirect;
