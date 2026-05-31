import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  Warehouse as WarehouseIcon,
  Package,
  ShieldCheck,
  Clock,
  CheckCircle2,
  BarChart3,
  RefreshCw,
  Box,
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

const SERVICE_KEYS = ['bonded', 'storage', 'valueAdded', 'pickPack', 'inventory', 'unloading'];

const SERVICE_ICONS = {
  bonded: ShieldCheck,
  storage: Clock,
  valueAdded: RefreshCw,
  pickPack: Box,
  inventory: BarChart3,
  unloading: Package,
};

const WarehousePage = () => {
  const { t } = useTranslation('warehouse');
  usePageTitle(t('warehouse:meta.title'));

  const benefits = t('benefits.items', { returnObjects: true });

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
                {t('intro.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('intro.title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">{t('intro.paragraph1')}</p>
              <p className="text-gray-600 leading-relaxed text-lg">{t('intro.paragraph2')}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100 shadow-2xl shadow-primary-500/10 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <WarehouseIcon className="w-24 h-24 text-primary-400 mx-auto mb-4 opacity-60" />
                  <p className="text-primary-700 font-semibold text-lg">{t('intro.visualTitle')}</p>
                  <p className="text-primary-500 text-sm mt-1">{t('intro.visualSubtitle')}</p>
                </div>
              </div>
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">{t('intro.floatingCardTitle')}</p>
                  <p className="text-xs text-gray-500">{t('intro.floatingCardSubtitle')}</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              {t('services.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('services.title')}</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICE_KEYS.map((key, i) => {
              const Icon = SERVICE_ICONS[key];
              return (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500 rounded-r-full" />
                  <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{t(`services.${key}.title`)}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{t(`services.${key}.desc`)}</p>
                </motion.div>
              );
            })}
          </div>
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
              {t('benefits.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('benefits.title')}</h2>
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
                  transition={{ delay: i * 0.06 }}
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
          <WarehouseIcon className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">{t('cta.description')}</p>
        </motion.div>
      </section>
    </div>
  );
};

export default WarehousePage;
