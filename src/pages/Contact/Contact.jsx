import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send } from 'lucide-react';
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 30 : -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1 space-y-8"
          >
            <div className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 flex flex-col gap-8">

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('contact:info.addressLabel')}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t('contact:info.address')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('contact:info.phoneLabel')}</h3>
                  <p className="text-gray-600 text-sm" dir="ltr">{t('contact:info.phone')}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-primary-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{t('contact:info.emailLabel')}</h3>
                  <p className="text-gray-600 text-sm">{t('contact:info.email')}</p>
                </div>
              </div>

            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2 bg-white p-8 md:p-10 rounded-2xl shadow-xl shadow-gray-200/40 border border-gray-100"
          >
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('contact:form.name')}</label>
                  <input
                    type="text"
                    dir={isRTL ? 'rtl' : 'ltr'}
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    placeholder={t('contact:form.namePlaceholder')}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-gray-700">{t('contact:form.email')}</label>
                  <input
                    type="email"
                    dir="ltr"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                    placeholder={t('contact:form.emailPlaceholder')}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">{t('contact:form.subject')}</label>
                <input
                  type="text"
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all"
                  placeholder={t('contact:form.subjectPlaceholder')}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-gray-700">{t('contact:form.message')}</label>
                <textarea
                  rows="5"
                  dir={isRTL ? 'rtl' : 'ltr'}
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500 transition-all resize-none"
                  placeholder={t('contact:form.messagePlaceholder')}
                />
              </div>

              <button
                type="submit"
                dir="ltr"
                className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-bold rounded-xl shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2"
              >
                {isRTL ? (
                  <>
                    <Send className="w-5 h-5" style={{ transform: 'scaleX(-1)' }} />
                    {t('contact:form.submit')}
                  </>
                ) : (
                  <>
                    {t('contact:form.submit')}
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
