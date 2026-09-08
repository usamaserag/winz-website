import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from '../../components/routing';
import { ArrowRight, ChevronDown, CheckCircle2, Truck, Globe, FileCheck } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import { fadeUp } from '../../components/logistics/motionVariants';
import BrandSignals from '../../components/common/BrandSignals';

const serviceIcons = {
  local:         <Truck      className="w-7 h-7" />,
  international: <Globe      className="w-7 h-7" />,
  customs:       <FileCheck  className="w-7 h-7" />,
};

const serviceColors = [
  'bg-primary-500',
  'bg-blue-500',
  'bg-rose-500',
];

const CommercialModel = () => {
  const { t } = useTranslation(['commercial', 'common', 'services']);
  usePageTitle(t('commercial:hero.title'));

  const [expandedIndex, setExpandedIndex] = useState(null);

  const toggleAccordion = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  const faqKeys = ['q1', 'q2', 'q3', 'q4'];
  const serviceKeys = ['local', 'international', 'customs'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen"
    >
      <PageHero
        badge={t('commercial:hero.badge')}
        title={t('commercial:hero.title')}
        description={t('commercial:hero.subtitle')}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
        >
          {t('common:buttons.getQuote')}
          <ArrowRight className="w-5 h-5" />
        </Link>
      </PageHero>

      <BrandSignals />

      {/* Body Content */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          >
            <p className="text-xl text-slate-600 leading-relaxed mb-12 text-center">
              {t('commercial:content.opening')}
            </p>
            
            <h2 className="text-3xl font-bold text-navy-900 mb-6">
              {t('commercial:content.section1Title')}
            </h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              {t('commercial:content.section1Text')}
            </p>
            <ul className="space-y-4 mb-8">
              {[1, 2, 3].map((num) => (
                <li key={num} className="flex items-start">
                  <CheckCircle2 className="w-6 h-6 text-primary-500 mt-0.5 mr-3 flex-shrink-0" />
                  <span className="text-slate-700">
                    {t(`commercial:content.section1List${num}`)}
                  </span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              FAQ
            </h2>
          </motion.div>
          
          <div className="space-y-4">
            {faqKeys.map((key, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <motion.div
                  key={key}
                  layout
                  className="bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex items-center justify-between p-5 text-left font-bold text-navy-900 hover:text-primary-600 transition-colors"
                  >
                    <span className="pr-4">{t(`commercial:faq.${key}.question`)}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 flex-shrink-0 transition-transform duration-200 ${
                        isExpanded ? 'rotate-180 text-primary-500' : ''
                      }`}
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="border-t border-slate-100"
                      >
                        <div className="p-5 text-slate-600 leading-relaxed">
                          {t(`commercial:faq.${key}.answer`)}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Related Services */}
      <section className="py-24 bg-slate-50 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('commercial:related.title')} />
            <h2 className="text-3xl font-bold text-navy-900 mb-4">
              {t('services:services.subtitle')}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {serviceKeys.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all overflow-hidden flex flex-col h-full"
              >
                <div className={`h-1 w-full ${serviceColors[i]}`} />
                <div className="p-8 flex flex-col flex-grow">
                  <motion.div className={`w-14 h-14 ${serviceColors[i]} rounded-xl flex items-center justify-center text-white mb-6`}>
                    {serviceIcons[key]}
                  </motion.div>
                  <span className="inline-block text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full mb-3 self-start">
                    {t(`services:services.${key}.tag`)}
                  </span>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {t(`services:services.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {t(`services:services.${key}.desc`)}
                  </p>
                  <Link
                    to={`/services`}
                    className="inline-flex items-center gap-1.5 text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors mt-auto"
                  >
                    {t('common:buttons.readMore')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"
          aria-hidden="true"
        />
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('services:cta.title')}
          </h2>
          <p className="text-primary-100 text-lg mb-8">{t('services:cta.subtitle')}</p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-700 font-bold px-10 py-3.5 rounded-lg hover:bg-primary-50 transition-colors"
          >
            {t('services:cta.button')}
          </Link>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default CommercialModel;
