import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const nextLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(nextLang);
  };

  const navLinks = [
    { name: t('nav.home'), path: '/' },
    { name: t('nav.about'), path: '/about' },
    { name: t('nav.services'), path: '/services' },
    { name: t('nav.tracking'), path: '/tracking' },
    { name: t('nav.contact'), path: '/contact' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md py-3' : 'bg-white/80 backdrop-blur-md py-5'}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        {/* Logo */}
        <NavLink to="/" className="text-2xl font-black text-brand-600 tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-brand-500 rounded text-white flex items-center justify-center">W</div>
          WINZ
        </NavLink>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink 
              key={link.path} 
              to={link.path}
              className={({ isActive }) => `text-sm font-semibold transition-colors duration-200 ${isActive ? 'text-brand-600' : 'text-gray-700 hover:text-brand-500'}`}
            >
              {link.name}
            </NavLink>
          ))}
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLanguage} className="flex items-center gap-2 text-gray-700 hover:text-brand-500 font-medium text-sm transition-colors">
            <Globe size={18} />
            {i18n.language === 'en' ? 'العربية' : 'English'}
          </button>
          <NavLink to="/tracking" className="bg-brand-500 hover:bg-brand-600 text-white px-5 py-2 rounded-full font-semibold text-sm transition-colors shadow-lg shadow-brand-500/30">
            {t('hero.cta_secondary')}
          </NavLink>
        </div>

        {/* Mobile Menu Toggle */}
        <button className="md:hidden text-gray-700" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white shadow-xl flex flex-col md:hidden"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              {navLinks.map((link) => (
                <NavLink 
                  key={link.path} 
                  to={link.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `text-lg font-medium p-2 rounded-lg ${isActive ? 'bg-brand-50 text-brand-600' : 'text-gray-800'}`}
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="h-px bg-gray-100 my-2"></div>
              <button onClick={toggleLanguage} className="flex items-center gap-2 text-gray-800 font-medium text-lg p-2">
                <Globe size={20} />
                {i18n.language === 'en' ? 'العربية' : 'English'}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
