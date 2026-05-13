import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Search, MapPin, Package, Clock, CheckCircle2, Truck,
  Zap, Bell, History, ChevronRight, ArrowRight
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

/* ── animation variants ── */
const fadeUp  = { hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5 } } };
const fadeIn  = { hidden: { opacity: 0 },         visible: { opacity: 1,      transition: { duration: 0.45 } } };

/* ── helper ── */
const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

/* demo timeline steps */
const DEMO_ID = 'WINZ-2024-00123456';

const TimelineStep = ({ icon, title, desc, status, isLast }) => {
  const isCompleted = status === 'done';
  const isActive    = status === 'active';

  return (
    <div className="flex gap-4">
      {/* vertical line + dot */}
      <div className="flex flex-col items-center">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 z-10 shadow
          ${isCompleted ? 'bg-primary-500 text-white' : isActive ? 'bg-primary-100 border-2 border-primary-500 text-primary-600' : 'bg-gray-100 text-gray-400'}`}>
          {icon}
        </div>
        {!isLast && (
          <div className={`w-0.5 flex-1 my-1 min-h-8 ${isCompleted ? 'bg-primary-400' : 'bg-gray-200'}`} />
        )}
      </div>

      {/* content */}
      <div className={`pb-8 ${isLast ? '' : ''}`}>
        <p className={`font-bold text-sm mb-0.5 ${isCompleted ? 'text-primary-600' : isActive ? 'text-gray-900' : 'text-gray-400'}`}>
          {title}
        </p>
        <p className={`text-sm leading-relaxed ${isCompleted || isActive ? 'text-gray-600' : 'text-gray-400'}`}>
          {desc}
        </p>
      </div>
    </div>
  );
};

/* ── Main Component ── */
const Tracking = () => {
  const { t, i18n } = useTranslation(['tracking', 'common']);
  const isRTL = i18n.language === 'ar';
  usePageTitle(t('common:nav.tracking'));

  const [inputValue, setInputValue] = useState('');
  const [tracking, setTracking]     = useState(false);
  const [showResult, setShowResult] = useState(false);

  const handleTrack = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setTracking(true);
    setTimeout(() => {
      setTracking(false);
      setShowResult(true);
    }, 1500);
  };

  const timelineSteps = [
    { key: 'orderPlaced',     icon: <Package    className="w-5 h-5" />, status: 'done'   },
    { key: 'pickedUp',        icon: <CheckCircle2 className="w-5 h-5" />, status: 'done' },
    { key: 'inTransit',       icon: <Truck      className="w-5 h-5" />, status: 'active' },
    { key: 'outForDelivery',  icon: <MapPin     className="w-5 h-5" />, status: 'pending'},
    { key: 'delivered',       icon: <CheckCircle2 className="w-5 h-5" />, status: 'pending'},
  ];

  const statusDetails = [
    { label: t('tracking:status.id'),          value: DEMO_ID },
    { label: t('tracking:status.origin'),      value: t('tracking:demo.originCity') },
    { label: t('tracking:status.destination'), value: t('tracking:demo.destCity') },
    { label: t('tracking:status.eta'),         value: t('tracking:demo.etaValue') },
    { label: t('tracking:status.weight'),      value: t('tracking:demo.weightValue') },
    { label: t('tracking:status.type'),        value: t('tracking:demo.typeValue') },
  ];

  const features = [
    { key: 'realtime',      icon: <Zap     className="w-7 h-7 text-primary-500" /> },
    { key: 'notifications', icon: <Bell    className="w-7 h-7 text-primary-500" /> },
    { key: 'history',       icon: <History className="w-7 h-7 text-primary-500" /> },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─────────────── HERO + SEARCH ─────────────── */}
      <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-28 pb-20">
        {/* decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 w-full max-w-3xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge label={t('tracking:hero.badge')} />
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            {t('tracking:hero.title')}
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg text-gray-300 mb-10"
          >
            {t('tracking:hero.subtitle')}
          </motion.p>

          {/* Search Box */}
          <motion.div
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.3 }}
          >
            <form onSubmit={handleTrack} className="relative">
              <div className="flex flex-col sm:flex-row gap-3 bg-white/10 backdrop-blur-md p-3 rounded-2xl border border-white/20 shadow-2xl">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
                  <input
                    type="text"
                    dir="ltr"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder={t('tracking:form.placeholder')}
                    className="w-full pl-12 pr-4 py-3.5 bg-white rounded-xl text-gray-900 font-medium placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <button
                  type="submit"
                  disabled={tracking}
                  className="flex items-center justify-center gap-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-70 text-white font-bold px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-primary-500/30 whitespace-nowrap"
                >
                  {tracking ? (
                    <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('tracking:form.button')}
                      <ArrowRight className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`} />
                    </>
                  )}
                </button>
              </div>
              <p className="text-gray-400 text-xs mt-3">{t('tracking:form.hint')}</p>
            </form>

            {/* Quick fill demo */}
            <button
              onClick={() => setInputValue(DEMO_ID)}
              className="mt-4 text-primary-400 hover:text-primary-300 text-sm underline underline-offset-2 transition-colors"
            >
              Try demo: {DEMO_ID}
            </button>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── TRACKING RESULT ─────────────── */}
      <AnimatePresence>
        {showResult && (
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-16 bg-gray-50"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Status header */}
              <div className="bg-primary-500 text-white rounded-2xl px-8 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 shadow-xl shadow-primary-500/30">
                <div>
                  <p className="text-primary-100 text-sm mb-1">{t('tracking:status.title')}</p>
                  <h2 className="text-2xl font-extrabold">{t('tracking:timeline.inTransit')}</h2>
                </div>
                <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
                  <Truck className="w-5 h-5" />
                  <span className="font-semibold text-sm" dir="ltr">{inputValue || DEMO_ID}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                {/* Details */}
                <div className="lg:col-span-2 bg-white rounded-2xl p-6 border border-gray-100 shadow-md h-fit">
                  <h3 className="font-bold text-gray-900 mb-5 text-lg">{t('tracking:status.title')}</h3>
                  <div className="space-y-4">
                    {statusDetails.map((d) => (
                      <div key={d.label} className="flex items-start justify-between gap-4">
                        <span className="text-sm text-gray-500 flex-shrink-0">{d.label}</span>
                        <span className="text-sm font-semibold text-gray-900 text-right">{d.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Timeline */}
                <div className="lg:col-span-3 bg-white rounded-2xl p-6 border border-gray-100 shadow-md">
                  <h3 className="font-bold text-gray-900 mb-6 text-lg">{t('tracking:timeline.title')}</h3>
                  <div className="space-y-0">
                    {timelineSteps.map((step, i) => (
                      <TimelineStep
                        key={step.key}
                        icon={step.icon}
                        title={t(`tracking:timeline.${step.key}`)}
                        desc={t(`tracking:timeline.${step.key}Desc`)}
                        status={step.status}
                        isLast={i === timelineSteps.length - 1}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ─────────────── FEATURES ─────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('tracking:features.title')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div
                key={f.key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all bg-white text-center"
              >
                <div className="w-16 h-16 bg-primary-50 group-hover:bg-primary-500 rounded-2xl flex items-center justify-center mx-auto mb-6 transition-colors duration-300">
                  <div className="group-hover:[&>svg]:text-white transition-colors duration-300">
                    {f.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  {t(`tracking:features.${f.key}.title`)}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {t(`tracking:features.${f.key}.desc`)}
                </p>
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
            {t('common:buttons.getQuote')}
          </h2>
          <p className="text-primary-100 text-lg mb-8">
            Ready to ship? Contact our team for a tailored quote.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            {t('common:nav.contact')}
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Tracking;
