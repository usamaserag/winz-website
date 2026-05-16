import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, ChevronDown, PackagePlus, PackageOpen, Route } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

const Navbar = () => {
  const { t, i18n } = useTranslation(['common']);
  const [isOpen, setIsOpen]           = useState(false);
  const [scrolled, setScrolled]       = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setServicesOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
    setMobileServicesOpen(false);
  }, [location.pathname]);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ar' : 'en');
  };

  const isActive = (path) => location.pathname === path;
  const isServicesActive = ['/services', '/import', '/export', '/transit', '/transport', '/warehouse'].includes(location.pathname);
  const isLightPage = location.pathname === '/contact' || location.pathname === '/import';
  const isTransparent = !isLightPage && !scrolled;

  const navBg = isLightPage
    ? (scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5')
    : (isTransparent ? 'bg-transparent py-5' : 'bg-white shadow-md py-3');

  const linkClass = (path) =>
    `text-sm font-medium transition-colors hover:text-primary-500 ${
      (!isTransparent)
        ? (isActive(path) ? 'text-primary-600' : 'text-gray-700')
        : (isActive(path) ? 'text-primary-300' : 'text-white/90')
    }`;

  const servicesLabelClass = `text-sm font-medium transition-colors hover:text-primary-500 cursor-pointer flex items-center gap-1 ${
    (!isTransparent)
      ? (isServicesActive ? 'text-primary-600' : 'text-gray-700')
      : (isServicesActive ? 'text-primary-300' : 'text-white/90')
  }`;

  const langBtnColor = !isTransparent
    ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
    : 'border-white/30 text-white hover:bg-white/10';
  const hamburgerColor = !isTransparent ? 'text-gray-900' : 'text-white';

  const serviceItems = [
    { label: 'Import',  path: '/import',  icon: <PackagePlus className="w-5 h-5" /> },
    { label: 'Export',  path: '/export',  icon: <PackageOpen className="w-5 h-5" /> },
    { label: 'Transit', path: '/transit', icon: <Route       className="w-5 h-5" /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Logo className="h-10 w-28" variant={isTransparent ? 'white' : 'default'} />

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
              <div className="relative" ref={dropdownRef}>
                <button
                  className={servicesLabelClass}
                  onClick={() => setServicesOpen((o) => !o)}
                  aria-expanded={servicesOpen}
                >
                  Customs Clearance Services
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-200 ${servicesOpen ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.97 }}
                      transition={{ duration: 0.18 }}
                      className="absolute top-full mt-3 left-0 w-52 bg-white rounded-2xl shadow-xl shadow-gray-200/60 border border-gray-100 overflow-hidden"
                    >
                      {serviceItems.map((item) => (
                        <Link
                          key={item.path}
                          to={item.path}
                          onClick={() => setServicesOpen(false)}
                          className={`flex items-center gap-3 px-5 py-3.5 text-sm font-medium transition-colors hover:bg-primary-50 hover:text-primary-600 ${
                            isActive(item.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-700'
                          }`}
                        >
                          <span className={`${isActive(item.path) ? 'text-primary-500' : 'text-gray-400'}`}>
                            {item.icon}
                          </span>
                          {i18n.language === 'ar' ? item.labelAr : item.label}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/transport" className={linkClass('/transport')}>
                Transport
              </Link>

              <Link to="/warehouse" className={linkClass('/warehouse')}>
                Warehouse
              </Link>
            </div>

          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md ${hamburgerColor}`}
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
            className="md:hidden bg-white border-t border-gray-100 shadow-xl overflow-hidden"
          >
            <div className="px-4 py-6 space-y-1">
              <Logo className="h-10 w-28" variant="default" onClick={() => setIsOpen(false)} />

              <div className="pt-4 space-y-1">
                {[
                  { name: t('nav.home'),    path: '/' },
                  { name: t('nav.about'),   path: '/about' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                      isActive(link.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}

                {/* Mobile Services accordion */}
                <div>
                  <button
                    onClick={() => setMobileServicesOpen((o) => !o)}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-md text-base font-medium ${
                      isServicesActive ? 'bg-primary-50 text-primary-600' : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    Customs Clearance Services
                    <ChevronDown className={`w-4 h-4 transition-transform ${mobileServicesOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {mobileServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        {serviceItems.map((item) => (
                          <Link
                            key={item.path}
                            to={item.path}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-3 pl-7 pr-3 py-2.5 text-sm font-medium rounded-md transition-colors ${
                              isActive(item.path) ? 'text-primary-600 bg-primary-50' : 'text-gray-700 hover:bg-gray-50'
                            }`}
                          >
                            {item.icon}
                            {i18n.language === 'ar' ? item.labelAr : item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                {[
                  { name: 'Transport', path: '/transport' },
                  { name: 'Warehouse', path: '/warehouse' },
                ].map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-3 py-2.5 rounded-md text-base font-medium ${
                      isActive(link.path) ? 'bg-primary-50 text-primary-600' : 'text-gray-900 hover:bg-gray-50'
                    }`}
                  >
                    {link.name}
                  </Link>
                ))}
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
