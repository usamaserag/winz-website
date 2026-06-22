import { NavLink } from 'react-router-dom';
import { useLocale } from '../../hooks/useLocale';
import { localizePath } from '../../lib/i18n/localePath';

const LocalizedNavLink = ({ to, ...props }) => {
  const locale = useLocale();
  const resolvedTo =
    typeof to === 'string' && to.startsWith('/') ? localizePath(to, locale) : to;

  return <NavLink to={resolvedTo} {...props} />;
};

export default LocalizedNavLink;
