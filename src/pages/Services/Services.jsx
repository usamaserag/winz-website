import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Truck, Globe, Zap, Package, FileCheck, BarChart3,
  ArrowRight, ClipboardList, CalendarCheck, Radio, ShieldCheck
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

/* ── animation variants ── */
const fadeUp   = { hidden: { opacity: 0, y: 28  }, visible: { opacity: 1, y: 0,  transition: { duration: 0.55 } } };
const fadeLeft = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0,  transition: { duration: 0.6  } } };

/* ── section badge ── */
const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

/* service icon map */
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
  'bg-purple-500',
  'bg-rose-500',
  'bg-teal-500',
];

/* process step icons */
const processIcons = [
  <ClipboardList  className="w-6 h-6 text-white" />,
  <CalendarCheck  className="w-6 h-6 text-white" />,
  <Radio          className="w-6 h-6 text-white" />,
  <ShieldCheck    className="w-6 h-6 text-white" />,
];

/* ── Main Component ── */
const Services = () => {
  const { t, i18n } = useTranslation(['services', 'common']);
  const isRTL = i18n.language === 'ar';
  usePageTitle(t('common:nav.services'));

  const serviceKeys = ['local', 'international', 'express', 'warehousing', 'customs', 'supply'];
  const processKeys = ['step1', 'step2', 'step3', 'step4'];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-28 pb-20">
        {/* decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[450px] h-[450px] rounded-full border border-white/5" />
        </div>
        {/* floating service tags */}
        <div className="absolute top-1/4 left-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, -12, 0] }} transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl px-4 py-2 text-white text-sm font-medium"
          >
            🚚 Local Shipping
          </motion.div>
        </div>
        <div className="absolute bottom-1/3 right-10 hidden lg:block">
          <motion.div
            animate={{ y: [0, 12, 0] }} transition={{ repeat: Infinity, duration: 3.5, ease: 'easeInOut' }}
            className="bg-primary-500/30 backdrop-blur-sm border border-primary-400/30 rounded-xl px-4 py-2 text-white text-sm font-medium"
          >
            ✈️ International Cargo
          </motion.div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge label={t('services:hero.badge')} />
          </motion.div>
          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            {t('services:hero.title')}
          </motion.h1>
          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            {t('services:hero.subtitle')}
          </motion.p>
          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all hover:-translate-y-0.5"
            >
              {t('common:buttons.getQuote')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── SERVICES GRID ─────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('services:services.title')} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services:services.subtitle')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceKeys.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8 }}
                className="group bg-white rounded-2xl border border-gray-100 hover:border-transparent hover:shadow-2xl hover:shadow-gray-200/60 transition-all overflow-hidden"
              >
                {/* top accent bar */}
                <div className={`h-1.5 w-full ${serviceColors[i]}`} />
                <div className="p-8">
                  {/* icon */}
                  <div className={`w-14 h-14 ${serviceColors[i]} rounded-2xl flex items-center justify-center text-white mb-6 shadow-lg`}>
                    {serviceIcons[key]}
                  </div>
                  {/* tag */}
                  <span className="inline-block text-xs font-semibold text-primary-600 bg-primary-50 px-2.5 py-0.5 rounded-full mb-3">
                    {t(`services:services.${key}.tag`)}
                  </span>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {t(`services:services.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`services:services.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── HOW IT WORKS ─────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('services:process.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('services:process.title')}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t('services:process.subtitle')}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-primary-100 z-0" />

            {processKeys.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative z-10 text-center"
              >
                {/* step number circle */}
                <div className="flex justify-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-primary-500 flex items-center justify-center shadow-lg shadow-primary-500/30 ring-4 ring-white">
                    {processIcons[i]}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <span className="block text-xs font-bold text-primary-500 mb-2">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">
                    {t(`services:process.${key}.title`)}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`services:process.${key}.desc`)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
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
            className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            {t('services:cta.button')}
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Services;
