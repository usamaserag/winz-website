import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

const Contact = () => {
  const { t, i18n } = useTranslation(['contact']);
  const isRTL = i18n.language === 'ar';
  usePageTitle(t('contact:title'));

  return (
    <div className="min-h-screen bg-gray-50 pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6"
          >
            {t('contact:title')}
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600"
          >
            {t('contact:subtitle')}
          </motion.p>
        </div>

        <div className="max-w-3xl mx-auto">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-8"
          >
            <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl shadow-gray-200/50 border border-gray-100 flex flex-col gap-10">

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{t('contact:info.addressLabel')}</h3>
                  <p className="text-gray-600 text-base leading-relaxed">{t('contact:info.address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{t('contact:info.phoneLabel')}</h3>
                  <p className="text-gray-600 text-base" dir="ltr">{t('contact:info.phone')}</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-14 h-14 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-7 h-7 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2">{t('contact:info.emailLabel')}</h3>
                  <p className="text-gray-600 text-base">{t('contact:info.email')}</p>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
