import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  ShieldCheck, Globe, Truck, Warehouse, Package,
  CheckCircle2, Snowflake, FileText,
  Ship, Award, Clock
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

/* ─── animation variants ─── */
const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

const REASON_KEYS = ['expertise', 'customs', 'coverage', 'food', 'cargo', 'warehousing'];
const REASON_ICONS = {
  expertise: Award,
  customs: ShieldCheck,
  coverage: Globe,
  food: Snowflake,
  cargo: Package,
  warehousing: Warehouse,
};

const SERVICES = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-primary-500" />,
    key: 'customs',
    itemIcons: [Snowflake, Package, FileText],
  },
  {
    icon: <Ship className="w-7 h-7 text-primary-500" />,
    key: 'transport',
    itemIcons: [],
  },
  {
    icon: <Warehouse className="w-7 h-7 text-primary-500" />,
    key: 'warehouse',
    itemIcons: [CheckCircle2, CheckCircle2, CheckCircle2],
  },
];

/* ─── Stats ─── */
const STATS = [
  { value: '14+', key: 'experience' },
  { value: '100%', key: 'complianceRate' },
  { value: 'All', key: 'portsCovered' },
  { value: '3', key: 'services' },
];

/* ════════════════════════════════════ PAGE ════════════════════════════════════ */
const About = () => {
  const { t } = useTranslation('about');
  usePageTitle(t('about:meta.title'));

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      <PageHero
        badge={t('about:hero.badge')}
        title={t('about:hero.title')}
        highlight={t('about:hero.highlight')}
        description={t('about:hero.description')}
      />

      {/* ─── STATS ─── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {STATS.map((s, i) => (
              <motion.div
                key={s.key}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-primary-500 mb-2">{s.value}</p>
                <p className="text-gray-600 font-medium text-sm">{t(`about:stats.${s.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WELCOME / INTRO ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <SectionBadge label={t('about:welcome.badge')} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {t('about:welcome.title')}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                {t('about:welcome.paragraph1')}
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                {t('about:welcome.paragraph2')}
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100 shadow-2xl shadow-primary-500/10 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <Globe className="w-24 h-24 text-primary-400 mx-auto mb-4 opacity-60" />
                  <p className="text-primary-700 font-semibold text-lg">{t('about:welcome.networkTitle')}</p>
                  <p className="text-primary-500 text-sm mt-1">{t('about:welcome.networkSubtitle')}</p>
                </div>
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t('about:welcome.badgeTitle')}</p>
                  <p className="text-xs text-gray-500">{t('about:welcome.badgeSubtitle')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHY CHOOSE ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('about:whyChoose.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t('about:whyChoose.title')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {REASON_KEYS.map((key, i) => {
              const Icon = REASON_ICONS[key];
              return (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all bg-white"
              >
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <div className="[&>svg]:group-hover:text-white transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`about:whyChoose.reasons.${key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`about:whyChoose.reasons.${key}.desc`)}</p>
              </motion.div>
            )})}
          </div>
        </div>
      </section>

      {/* ─── CORE SERVICES ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('about:coreServices.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about:coreServices.title')}</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.key}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500 rounded-r-full" />
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`about:coreServices.${s.key}.title`)}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{t(`about:coreServices.${s.key}.desc`)}</p>
                {s.itemIcons.length > 0 && (
                  <ul className="space-y-3">
                    {s.itemIcons.map((Icon, itemIdx) => (
                      <li key={`${s.key}-${itemIdx}`} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="text-primary-500 flex-shrink-0 mt-0.5"><Icon className="w-4 h-4" /></span>
                        {t(`about:coreServices.${s.key}.items.${itemIdx}`)}
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA ─── */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <Truck className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('about:cta.title')}
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            {t('about:cta.description')}
          </p>

        </motion.div>
      </section>

    </div>
  );
};

export default About;
