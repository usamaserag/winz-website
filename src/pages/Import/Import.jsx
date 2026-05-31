import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShieldCheck, Clock, Globe, FileCheck, CheckCircle2, Package, ArrowDownToLine } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import LogisticsGridPattern from '../../components/logistics/LogisticsGridPattern';
import LogisticsStatsCard from '../../components/logistics/LogisticsStatsCard';
import SectionBadge from '../../components/logistics/SectionBadge';
import { fadeUp, staggerContainer } from '../../components/logistics/motionVariants';

const FEATURE_KEYS = ['compliance', 'speed', 'network', 'accuracy'];

const FEATURE_ICONS = {
  compliance: ShieldCheck,
  speed: Clock,
  network: Globe,
  accuracy: FileCheck,
};

const Import = () => {
  const { t } = useTranslation('import');
  usePageTitle(t('import:meta.title'));

  const benefits = t('benefits.items', { returnObjects: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden"
    >
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-slate-200">
        <LogisticsGridPattern variant="light" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100">
                <ArrowDownToLine size={16} />
                <span>{t('hero.badge')}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.15] mb-6">
                {t('hero.title')}{' '}
                <span className="text-primary-600">{t('hero.highlight')}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-slate-600 mb-8 leading-relaxed">
                {t('hero.description')}
              </motion.p>
            </motion.div>

            <div className="hidden lg:block">
              <LogisticsStatsCard
                icon={Package}
                headline={t('hero.stats.headline')}
                subline={t('hero.stats.subline')}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-950 text-white relative">
        <LogisticsGridPattern variant="dark" className="opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-4xl mx-auto mb-16">
            <SectionBadge label={t('landscape.badge')} variant="dark" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('landscape.title')}</h2>
            <p className="text-slate-400 text-lg mb-4">{t('landscape.paragraph1')}</p>
            <p className="text-slate-400 text-lg">{t('landscape.paragraph2')}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {FEATURE_KEYS.map((key) => {
              const Icon = FEATURE_ICONS[key];
              return (
                <motion.div
                  key={key}
                  variants={fadeUp}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
                >
                  <div className="mb-4">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="font-bold text-lg mb-2">{t(`features.${key}.title`)}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{t(`features.${key}.desc`)}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <h2 className="text-3xl font-bold text-navy-900 text-center mb-12">{t('benefits.title')}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {Array.isArray(benefits) &&
              benefits.map((item) => (
                <div key={item} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
          </div>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Import;
