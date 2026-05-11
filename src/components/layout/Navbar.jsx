import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from '../common/Logo';

const Navbar = () => {
  const { t, i18n } = useTranslation(['common']);
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.tracking'), path: '/tracking' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  const isActive   = (path) => location.pathname === path;
  const isContact   = location.pathname === '/contact';
  // Contact page has a light background — use dark text, white bg, no shadow until scroll
  // All other pages have dark hero gradients — transparent until scrolled
  const isTransparent = !isContact && !scrolled;
  // On contact page: always white bg, shadow only after scroll
  const navBg = isContact
    ? (scrolled ? 'bg-white shadow-md py-3' : 'bg-white py-5')
    : (isTransparent ? 'bg-transparent py-5' : 'bg-white shadow-md py-3');
  // Text color: dark on contact (or scrolled); white when transparent
  const linkColor = (path) =>
    (!isTransparent)
      ? (isActive(path) ? 'text-brand-600' : 'text-gray-700')
      : (isActive(path) ? 'text-brand-300' : 'text-white/90');
  const langBtnColor = !isTransparent
    ? 'border-gray-200 text-gray-700 hover:bg-gray-50'
    : 'border-white/30 text-white hover:bg-white/10';
  const hamburgerColor = !isTransparent ? 'text-gray-900' : 'text-white';

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Logo className="h-12 w-auto" />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`text-sm font-medium transition-colors hover:text-brand-500 ${linkColor(link.path)}`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleLanguage}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors ${langBtnColor}`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{i18n.language === 'en' ? 'عربي' : 'EN'}</span>
              </button>
              
              <Link 
                to="/tracking"
                className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2.5 rounded-full text-sm font-medium transition-all shadow-lg shadow-brand-500/30 hover:shadow-brand-500/50"
              >
                {t('buttons.trackShipment')}
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
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium
                    ${isActive(link.path) ? 'bg-brand-50 text-brand-600' : 'text-gray-900 hover:bg-gray-50'}`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="pt-4 border-t border-gray-100 flex flex-col gap-3">
                <button 
                  onClick={() => {
                    toggleLanguage();
                    setIsOpen(false);
                  }}
                  className="flex items-center gap-2 px-3 py-2 text-gray-900 hover:bg-gray-50 rounded-md"
                >
                  <Globe className="w-5 h-5" />
                  <span className="font-medium">{i18n.language === 'en' ? 'عربي' : 'English'}</span>
                </button>
                
                <Link 
                  to="/tracking"
                  onClick={() => setIsOpen(false)}
                  className="w-full text-center bg-brand-500 text-white px-4 py-3 rounded-md font-medium"
                >
                  {t('buttons.trackShipment')}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
