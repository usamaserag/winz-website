import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  CheckCircle2, FileText, ShieldCheck, Clock, Globe, Zap, AlertTriangle
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';
import PageHero from '../../components/logistics/PageHero';

const FEATURE_KEYS = ['declarations', 'guarantee', 'ncts', 'coverage', 'delivery', 'experience'];

const FEATURE_ICONS = {
  declarations: FileText,
  guarantee: ShieldCheck,
  ncts: Zap,
  coverage: Globe,
  delivery: Clock,
  experience: ShieldCheck,
};

const Transit = () => {
  const { t } = useTranslation('transit');
  usePageTitle(t('transit:meta.title'));

  const benefits = t('solution.benefits', { returnObjects: true });

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <PageHero
        badge={t('hero.badge')}
        title={t('hero.title')}
        highlight={t('hero.highlight')}
        description={t('hero.description')}
      />

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
                {t('challenge.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('challenge.title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">{t('challenge.paragraph1')}</p>
              <p className="text-gray-600 leading-relaxed text-lg">{t('challenge.paragraph2')}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {FEATURE_KEYS.map((key, i) => {
                const Icon = FEATURE_ICONS[key];
                return (
                  <motion.div
                    key={key}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ delay: i * 0.08 }}
                    className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
                  >
                    <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="font-bold text-gray-900 mb-2">{t(`features.${key}.title`)}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{t(`features.${key}.desc`)}</p>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="bg-amber-50 border border-amber-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{t('risk.title')}</h3>
              <p className="text-gray-600 leading-relaxed">{t('risk.description')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              {t('solution.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('solution.title')}</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {Array.isArray(benefits) &&
              benefits.map((item, i) => (
                <motion.div
                  key={item}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="flex items-start gap-3 bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm"
                >
                  <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 font-medium text-sm">{item}</span>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <Globe className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">{t('cta.description')}</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Transit;
