import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Truck, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';
import Logo from '../common/Logo';

const Footer = () => {
  const { t } = useTranslation(['common']);

  return (
    <footer className="bg-gray-900 text-gray-300 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-6">
            <Logo className="h-12 w-auto" />
            <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
              {t('footer.description')}
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-brand-500 hover:text-white transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">{t('footer.quickLinks')}</h3>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="hover:text-brand-400 transition-colors">{t('nav.about')}</Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-brand-400 transition-colors">{t('nav.services')}</Link>
              </li>
              <li>
                <Link to="/tracking" className="hover:text-brand-400 transition-colors">{t('nav.tracking')}</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-brand-400 transition-colors">{t('nav.contact')}</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">{t('footer.contactInfo')}</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 mt-1 flex-shrink-0" />
                <span>123 Logistics Avenue, Business District, Global City</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span dir="ltr">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 flex-shrink-0" />
                <span>info@winz-logistics.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter / CTA */}
          <div>
            <h3 className="text-white font-semibold text-lg mb-6">{t('footer.newsletter.title')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('footer.newsletter.subtitle')}</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder={t('footer.newsletter.placeholder')}
                dir="ltr"
                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-md focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500 text-white"
              />
              <button 
                type="submit"
                className="w-full bg-brand-500 hover:bg-brand-600 text-white font-medium py-2.5 rounded-md transition-colors"
              >
                {t('footer.newsletter.button')}
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} WINZ. {t('footer.rights')}
          </p>
          <div className="flex items-center gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
