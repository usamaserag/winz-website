import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Zap, Globe, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import usePageTitle from '../../hooks/usePageTitle';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};

const Home = () => {
  const { t, i18n } = useTranslation(['home', 'common']);
  const isRTL = i18n.language === 'ar';
  usePageTitle('');  // Home shows just "WINZ"

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 z-0 bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16">
          <motion.span 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6 }}
            className="inline-block py-1 px-3 rounded-full bg-brand-500/20 text-brand-400 border border-brand-500/30 text-sm font-semibold tracking-wider mb-6"
          >
            WINZ LOGISTICS
          </motion.span>
          
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight mb-8"
          >
            {t('home:hero.title')}
          </motion.h1>
          
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto mb-10"
          >
            {t('home:hero.subtitle')}
          </motion.p>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link 
              to="/services" 
              className="w-full sm:w-auto px-8 py-4 bg-brand-500 hover:bg-brand-600 text-white rounded-full font-semibold text-lg transition-all transform hover:-translate-y-1 shadow-xl shadow-brand-500/30 flex items-center justify-center gap-2"
            >
              {t('home:hero.cta')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm rounded-full font-semibold text-lg transition-all border border-white/20 flex items-center justify-center"
            >
              {t('common:buttons.getQuote')}
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('home:features.title')}</h2>
            <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 transition-all"
            >
              <div className="w-14 h-14 bg-brand-50 rounded-xl flex items-center justify-center mb-6">
                <Zap className="w-7 h-7 text-brand-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('home:features.speed.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home:features.speed.desc')}
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 transition-all"
            >
              <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center mb-6">
                <Globe className="w-7 h-7 text-blue-500" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('home:features.global.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home:features.global.desc')}
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div 
              whileHover={{ y: -10 }}
              className="bg-white p-8 rounded-2xl shadow-lg shadow-gray-200/50 border border-gray-100 transition-all"
            >
              <div className="w-14 h-14 bg-green-50 rounded-xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('home:features.secure.title')}</h3>
              <p className="text-gray-600 leading-relaxed">
                {t('home:features.secure.desc')}
              </p>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Small CTA Section before Footer */}
      <section className="py-20 bg-brand-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pattern-dots" />
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">{t('home:ctaSection.title')}</h2>
          <p className="text-brand-100 text-lg mb-8">{t('home:ctaSection.subtitle')}</p>
          <Link to="/contact" className="inline-block bg-white text-brand-600 font-bold px-8 py-4 rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all">
            {t('home:ctaSection.button')}
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
