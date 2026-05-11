import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Zap, ShieldCheck, Lightbulb, Users, Globe, Star,
  Target, Eye, CheckCircle2, ArrowRight
} from 'lucide-react';
import useCountUp from '../../hooks/useCountUp';
import usePageTitle from '../../hooks/usePageTitle';

/* ── helpers ── */
const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-brand-50 text-brand-600 border border-brand-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

/** Animated stat card — counts up from 0 when scrolled into view */
const StatCard = ({ target, suffix, label, delay = 0 }) => {
  const { ref, count } = useCountUp(target);
  return (
    <motion.div
      ref={ref}
      initial="hidden" whileInView="visible" viewport={{ once: true }}
      variants={fadeUp}
      transition={{ delay }}
      className="text-center p-8 bg-white rounded-2xl shadow-lg shadow-gray-200/40 border border-gray-100"
    >
      <p className="text-4xl md:text-5xl font-extrabold text-brand-500 mb-2 tabular-nums">
        {count.toLocaleString()}{suffix}
      </p>
      <p className="text-gray-600 font-medium text-sm">{label}</p>
    </motion.div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55 } },
};

const fadeLeft  = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };
const fadeRight = { hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6 } } };

/* value icon map – only icons confirmed in lucide-react ≤ 0.292 */
const valueIcons = {
  speed:       <Zap        className="w-6 h-6 text-brand-500" />,
  integrity:   <ShieldCheck className="w-6 h-6 text-brand-500" />,
  innovation:  <Lightbulb  className="w-6 h-6 text-brand-500" />,
  partnership: <Users      className="w-6 h-6 text-brand-500" />,
  global:      <Globe      className="w-6 h-6 text-brand-500" />,
  reliability: <Star       className="w-6 h-6 text-brand-500" />,
};

/* ── Page ── */
const About = () => {
  const { t, i18n } = useTranslation(['about', 'common']);
  const isRTL = i18n.language === 'ar';
  usePageTitle(t('common:nav.about'));

  const stats = [
    { target: 500000, suffix: '+',  label: t('about:stats.shipments') },
    { target: 12000,  suffix: '+',  label: t('about:stats.clients') },
    { target: 80,     suffix: '+',  label: t('about:stats.countries') },
    { target: 98,     suffix: '%',  label: t('about:stats.satisfaction') },
  ];

  const values = ['speed', 'integrity', 'innovation', 'partnership', 'global', 'reliability'];

  const storyMinis = [
    { val: '10+',  lbl: t('about:story.yearsLabel') },
    { val: '80+',  lbl: t('about:story.countriesLabel') },
    { val: '300+', lbl: t('about:story.teamLabel') },
  ];

  return (
    <div className="flex flex-col min-h-screen">

      {/* ─────────────── HERO ─────────────── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-brand-900 to-gray-900 pt-28 pb-20">
        {/* decorative rings */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[450px] h-[450px] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge label={t('about:hero.badge')} />
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            {t('about:hero.title')}
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10"
          >
            {t('about:hero.subtitle')}
          </motion.p>

          <motion.div initial="hidden" animate="visible" variants={fadeUp} transition={{ delay: 0.3 }}>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-4 rounded-full shadow-xl shadow-brand-500/30 hover:shadow-brand-500/50 transition-all hover:-translate-y-0.5"
            >
              {t('common:buttons.getQuote')}
              <ArrowRight className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ─────────────── STATS ─────────────── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <StatCard
                key={s.label}
                target={s.target}
                suffix={s.suffix}
                label={s.label}
                delay={i * 0.08}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── STORY ─────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

            {/* text */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <SectionBadge label={t('about:story.badge')} />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('about:story.title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-5">{t('about:story.p1')}</p>
              <p className="text-gray-600 leading-relaxed mb-10">{t('about:story.p2')}</p>
              <div className="flex flex-wrap gap-8">
                {storyMinis.map((m) => (
                  <div key={m.lbl} className="text-center">
                    <p className="text-3xl font-extrabold text-brand-500">{m.val}</p>
                    <p className="text-sm text-gray-500 mt-1">{m.lbl}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* visual */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-brand-50 to-brand-100 border border-brand-100 shadow-2xl shadow-brand-500/10 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <Globe className="w-24 h-24 text-brand-400 mx-auto mb-4 opacity-60" />
                  <p className="text-brand-700 font-semibold text-lg">Global Logistics Network</p>
                </div>
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center flex-shrink-0">
                  <CheckCircle2 className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">ISO Certified</p>
                  <p className="text-xs text-gray-500">Quality Assured</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── MISSION & VISION ─────────────── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('about:mission.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">{t('about:mission.title')}</h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Mission */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}
              className="relative bg-white p-10 rounded-3xl shadow-lg border border-gray-100 overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-500 rounded-r-full" />
              <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-brand-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('about:mission.mission.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('about:mission.mission.desc')}</p>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="relative bg-gray-900 p-10 rounded-3xl shadow-lg overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-1.5 h-full bg-brand-400 rounded-r-full" />
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Eye className="w-7 h-7 text-brand-400" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{t('about:mission.vision.title')}</h3>
              <p className="text-gray-400 leading-relaxed">{t('about:mission.vision.desc')}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─────────────── VALUES ─────────────── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('about:values.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('about:values.title')}</h2>
            <div className="w-20 h-1 bg-brand-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden" whileInView="visible" viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-xl hover:shadow-brand-500/10 transition-all bg-white"
              >
                <div className="w-12 h-12 bg-brand-50 group-hover:bg-brand-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <div className="group-hover:text-white [&>svg]:group-hover:text-white transition-colors duration-300">
                    {valueIcons[key]}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`about:values.${key}.title`)}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{t(`about:values.${key}.desc`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────────── CTA ─────────────── */}
      <section className="py-20 bg-gradient-to-br from-brand-600 to-brand-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('about:cta.title')}</h2>
          <p className="text-brand-100 text-lg mb-8">{t('about:cta.subtitle')}</p>
          <Link
            to="/contact"
            className="inline-block bg-white text-brand-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            {t('about:cta.button')}
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
