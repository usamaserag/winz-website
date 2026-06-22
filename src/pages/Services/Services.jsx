import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from '../../components/routing';
import {
  Truck, Globe, Zap, Package, FileCheck, BarChart3,
  ArrowRight, ClipboardList, CalendarCheck, Radio, ShieldCheck
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import { fadeUp } from '../../components/logistics/motionVariants';

const serviceIcons = {
  local:         <Truck      className="w-7 h-7" />,
  international: <Globe      className="w-7 h-7" />,
  express:       <Zap        className="w-7 h-7" />,
  warehousing:   <Package    className="w-7 h-7" />,
  customs:       <FileCheck  className="w-7 h-7" />,
  supply:        <BarChart3  className="w-7 h-7" />,
};

const serviceColors = [
  'bg-primary-500',
  'bg-blue-500',
  'bg-amber-500',
  'bg-navy-600',
  'bg-rose-500',
  'bg-teal-500',
];

const processIcons = [
  <ClipboardList  className="w-6 h-6 text-white" />,
  <CalendarCheck  className="w-6 h-6 text-white" />,
  <Radio          className="w-6 h-6 text-white" />,
  <ShieldCheck    className="w-6 h-6 text-white" />,
];

const Services = () => {
  const { t, i18n } = useTranslation(['services', 'common']);
  const isRTL = i18n.language === 'ar';
  usePageTitle(t('common:nav.services'));

  const serviceKeys = ['local', 'international', 'express', 'warehousing', 'customs', 'supply'];
  const processKeys = ['step1', 'step2', 'step3', 'step4'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen"
    >
      <PageHero
        badge={t('services:hero.badge')}
        title={t('services:hero.title')}
        description={t('services:hero.subtitle')}
      >
        <Link
          to="/contact"
          className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-3.5 rounded-lg transition-colors"
        >
          {t('common:buttons.getQuote')}
          <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
        </Link>
      </PageHero>

      <section className="py-24 bg-slate-50">
        <motion.div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('services:services.title')} />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('services:services.subtitle')}
            </h2>
            <motion.div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="group bg-white rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all overflow-hidden"
              >
                <div className={`h-1 w-full ${serviceColors[i]}`} />
                <div className="p-8">
                  <motion.div className={`w-14 h-14 ${serviceColors[i]} rounded-xl flex items-center justify-center text-white mb-6`}>
                    {serviceIcons[key]}
                  </motion.div>
                  <span className="inline-block text-xs font-semibold text-primary-700 bg-primary-50 px-2.5 py-0.5 rounded-full mb-3">
                    {t(`services:services.${key}.tag`)}
                  </span>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {t(`services:services.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t(`services:services.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('services:process.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('services:process.title')}
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {t('services:process.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            <motion.div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-primary-100 z-0" />

            {processKeys.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 text-center"
              >
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center ring-4 ring-white shadow-sm">
                    {processIcons[i]}
                  </div>
                </div>
                <div className="bg-slate-50 rounded-xl p-6 border border-slate-200">
                  <span className="block text-xs font-bold text-primary-600 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-navy-900 mb-2">
                    {t(`services:process.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {t(`services:process.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

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

export default Services;
