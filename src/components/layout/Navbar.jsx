import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ChevronDown, PackagePlus, PackageOpen, Route, BookOpen, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';
import LanguageSwitcher from '../common/LanguageSwitcher';
import LogisticsGridPattern from '../logistics/LogisticsGridPattern';
import { pageHasDarkHero, HERO_NAV_BG } from '../../lib/pageHasDarkHero';

const CLEARANCE_SERVICES = [
  { key: 'import', path: '/import', Icon: PackagePlus },
  { key: 'export', path: '/export', Icon: PackageOpen },
  { key: 'transit', path: '/transit', Icon: Route },
];

const COMMUNITY_LINKS = [
  { key: 'blog', path: '/blog', Icon: BookOpen },
  { key: 'faq', path: '/faq', Icon: HelpCircle },
];

const Navbar = () => {
  const { t } = useTranslation(['common']);
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [communityOpen, setCommunityOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileCommunityOpen, setMobileCommunityOpen] = useState(false);
  const servicesDropdownRef = useRef(null);
  const communityDropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setScrolled(window.scrollY > 50);
  }, [location.pathname]);

  // Close dropdowns on outside click
  useEffect(() => {
    if (!servicesOpen && !communityOpen) return undefined;

    const handler = (e) => {
      const inServices = servicesDropdownRef.current?.contains(e.target);
      const inCommunity = communityDropdownRef.current?.contains(e.target);
      if (!inServices) setServicesOpen(false);
      if (!inCommunity) setCommunityOpen(false);
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, [servicesOpen, communityOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
    setMobileCommunityOpen(false);
  }, [location.pathname]);

  const isActive = (path) => location.pathname === path;
  const isBlogActive =
    location.pathname === '/blog' || location.pathname.startsWith('/blog/');
  const isServicesActive = ['/services', '/import', '/export', '/transit', '/transport', '/warehouse'].includes(location.pathname);
  const isCommunityActive = isBlogActive || location.pathname === '/faq';

  const onDarkHero = pageHasDarkHero(location.pathname);
  const useHeroNav = onDarkHero && !scrolled;

  const navBg = useHeroNav
    ? `${HERO_NAV_BG} py-4`
    : scrolled
      ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-primary-100 py-3'
      : 'bg-white/90 backdrop-blur-md border-b border-primary-50 py-4';

  const navLinkBase = 'text-sm font-medium transition-colors';
  const navLinkActive = useHeroNav
    ? 'text-primary-400 font-semibold'
    : 'text-primary-600 font-semibold';
  const navLinkIdle = useHeroNav
    ? 'text-slate-200 hover:text-white'
    : 'text-slate-600 hover:text-primary-500';

  const linkClass = (path) =>
    `${navLinkBase} ${isActive(path) ? navLinkActive : navLinkIdle}`;

  const servicesLabelClass = `${navLinkBase} cursor-pointer flex items-center gap-1 ${
    isServicesActive ? navLinkActive : navLinkIdle
  }`;

  const communityLabelClass = `${navLinkBase} cursor-pointer flex items-center gap-1 ${
    isCommunityActive ? navLinkActive : navLinkIdle
  }`;

  const servicesChevronClass = `w-4 h-4 transition-transform duration-200 ${
    useHeroNav ? 'text-primary-400' : 'text-primary-500'
  } ${servicesOpen ? 'rotate-180' : ''}`;

  const communityChevronClass = `w-4 h-4 transition-transform duration-200 ${
    useHeroNav ? 'text-primary-400' : 'text-primary-500'
  } ${communityOpen ? 'rotate-180' : ''}`;

  const dropdownPanelClass = `absolute top-full z-[60] mt-3 left-0 min-w-[15rem] w-60 rounded-2xl shadow-xl overflow-hidden border ${
    useHeroNav
      ? 'bg-navy-900 border-white/10 shadow-black/30'
      : 'bg-white border-gray-100 shadow-gray-200/60'
  }`;

  const dropdownLinkClass = (active) =>
    active
      ? useHeroNav
        ? 'bg-white/10 text-primary-400 font-semibold'
        : 'bg-primary-50 text-primary-600 font-semibold'
      : useHeroNav
        ? 'text-slate-200 hover:bg-white/10 hover:text-white'
        : 'text-slate-600 hover:bg-primary-50 hover:text-primary-600';

  const dropdownIconClass = (active) =>
    active ? 'text-primary-400' : useHeroNav ? 'text-primary-500/70' : 'text-primary-300';

  const hamburgerClass = useHeroNav
    ? 'p-2 rounded-md text-white hover:text-white hover:bg-white/10'
    : 'p-2 rounded-md text-primary-600 hover:text-primary-700 hover:bg-primary-50';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 overflow-visible ${navBg}`}>
      {useHeroNav && (
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
          <LogisticsGridPattern variant="dark" className="opacity-80" />
        </div>
      )}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo className="h-10 w-28" variant={useHeroNav ? 'white' : 'default'} />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">

              <Link to="/" className={linkClass('/')}>
                {t('nav.home')}
              </Link>

              <Link to="/about" className={linkClass('/about')}>
                {t('nav.about')}
              </Link>

              {/* Services Dropdown */}
              <div className="relative" ref={servicesDropdownRef}>
                <button
                  type="button"
                  className={servicesLabelClass}
                  onClick={() => {
                    setCommunityOpen(false);
                    setServicesOpen((o) => !o);
                  }}
                  aria-expanded={servicesOpen}
                  aria-haspopup="true"
                  aria-label={t('nav.customsClearance')}
                >
                  {t('nav.customsClearance')}
                  <ChevronDown className={servicesChevronClass} aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className={dropdownPanelClass}
                    >
                      {CLEARANCE_SERVICES.map(({ key, path, Icon }) => (
                        <Link
                          key={path}
                          to={path}
                          onClick={() => setServicesOpen(false)}
                          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${dropdownLinkClass(isActive(path))}`}
                        >
                          <span className={dropdownIconClass(isActive(path))}>
                            <Icon className="w-5 h-5" aria-hidden="true" />
                          </span>
                          {t(`nav.clearance.${key}`)}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/transport" className={linkClass('/transport')}>
                {t('nav.transport')}
              </Link>

              <Link to="/warehouse" className={linkClass('/warehouse')}>
                {t('nav.warehouse')}
              </Link>

              {/* Community Dropdown */}
              <div className="relative" ref={communityDropdownRef}>
                <button
                  type="button"
                  className={communityLabelClass}
                  onClick={() => {
                    setServicesOpen(false);
                    setCommunityOpen((o) => !o);
                  }}
                  aria-expanded={communityOpen}
                  aria-haspopup="true"
                  aria-label={t('nav.yourCommunity')}
                >
                  {t('nav.yourCommunity')}
                  <ChevronDown className={communityChevronClass} aria-hidden="true" />
                </button>

                <AnimatePresence>
                  {communityOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className={dropdownPanelClass}
                    >
                      {COMMUNITY_LINKS.map(({ key, path, Icon }) => {
                        const active = key === 'blog' ? isBlogActive : isActive(path);
                        return (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setCommunityOpen(false)}
                            className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors ${dropdownLinkClass(active)}`}
                          >
                            <span className={dropdownIconClass(active)}>
                              <Icon className="w-5 h-5" aria-hidden="true" />
                            </span>
                            {t(`nav.${key}`)}
                          </Link>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <LanguageSwitcher useHeroNav={useHeroNav} />

              <Link to="/contact" className={linkClass('/contact')}>
                {t('nav.contact')}
              </Link>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className={hamburgerClass}
              aria-label={isOpen ? t('a11y.menuClose') : t('a11y.menuOpen')}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden border-t shadow-xl overflow-hidden ${
              useHeroNav
                ? 'bg-navy-950 border-white/10'
                : 'bg-white border-gray-100'
            }`}
          >
            <div className="px-4 py-6 space-y-1">
              <Logo
                className="h-10 w-28"
                variant={useHeroNav ? 'white' : 'default'}
                onClick={() => setIsOpen(false)}
              />

              <div className="pt-4 space-y-1">
                {[
                  { name: t('nav.home'),    path: '/' },
                  { name: t('nav.about'),   path: '/about' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? useHeroNav
                          ? 'bg-white/10 text-primary-400 font-semibold'
                          : 'bg-primary-50 text-primary-600 font-semibold'
                        : useHeroNav
                          ? 'text-slate-200 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50/50'
                    }`}
                    aria-label={t('nav.customsClearance')}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Services accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      isServicesActive
                        ? useHeroNav
                          ? 'bg-white/10 text-primary-400 font-semibold'
                          : 'bg-primary-50 text-primary-600 font-semibold'
                        : useHeroNav
                          ? 'text-slate-200 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50/50'
                    }`}
                    aria-label={t('nav.yourCommunity')}
                  >
                    {t('nav.customsClearance')}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${useHeroNav ? 'text-primary-400' : 'text-primary-500'} ${mobileServicesOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {CLEARANCE_SERVICES.map(({ key, path, Icon }) => (
                          <Link
                            key={path}
                            to={path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 pl-7 pr-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                              isActive(path)
                                ? useHeroNav
                                  ? 'text-primary-400 bg-white/10 font-semibold'
                                  : 'text-primary-600 bg-primary-50 font-semibold'
                                : useHeroNav
                                  ? 'text-slate-200 hover:text-white hover:bg-white/10'
                                  : 'text-slate-600 hover:text-primary-500 hover:bg-primary-50/50'
                            }`}
                          >
                            <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                            {t(`nav.clearance.${key}`)}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {/* Mobile Community accordion */}
                <div>
                  <button
                    type="button"
                    onClick={() => setMobileCommunityOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      isCommunityActive
                        ? useHeroNav
                          ? 'bg-white/10 text-primary-400 font-semibold'
                          : 'bg-primary-50 text-primary-600 font-semibold'
                        : useHeroNav
                          ? 'text-slate-200 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50/50'
                    }`}
                  >
                    {t('nav.yourCommunity')}
                    <ChevronDown
                      className={`w-4 h-4 transition-transform ${useHeroNav ? 'text-primary-400' : 'text-primary-500'} ${mobileCommunityOpen ? 'rotate-180' : ''}`}
                    />
                  </button>

                  <AnimatePresence>
                    {mobileCommunityOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {COMMUNITY_LINKS.map(({ key, path, Icon }) => {
                          const active = key === 'blog' ? isBlogActive : isActive(path);
                          return (
                            <Link
                              key={path}
                              to={path}
                              onClick={() => setIsOpen(false)}
                              className={`flex items-center gap-3 pl-7 pr-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                                active
                                  ? useHeroNav
                                    ? 'text-primary-400 bg-white/10 font-semibold'
                                    : 'text-primary-600 bg-primary-50 font-semibold'
                                  : useHeroNav
                                    ? 'text-slate-200 hover:text-white hover:bg-white/10'
                                    : 'text-slate-600 hover:text-primary-500 hover:bg-primary-50/50'
                              }`}
                            >
                              <Icon className="w-5 h-5 shrink-0" aria-hidden="true" />
                              {t(`nav.${key}`)}
                            </Link>
                          );
                        })}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {[
                  { name: t('nav.transport'), path: '/transport' },
                  { name: t('nav.warehouse'), path: '/warehouse' },
                  { name: t('nav.contact'), path: '/contact' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium transition-colors ${
                      isActive(link.path)
                        ? useHeroNav
                          ? 'bg-white/10 text-primary-400 font-semibold'
                          : 'bg-primary-50 text-primary-600 font-semibold'
                        : useHeroNav
                          ? 'text-slate-200 hover:text-white hover:bg-white/10'
                          : 'text-slate-700 hover:text-primary-500 hover:bg-primary-50/50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

              <div className="pt-4 border-t border-slate-200/80 mt-4">
                <LanguageSwitcher useHeroNav={useHeroNav} />
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
