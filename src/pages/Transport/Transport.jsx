import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Truck, Container, MapPin, Clock, CheckCircle2, ShieldCheck, Globe } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

const CONTAINER_KEYS = ['twenty', 'forty', 'fortyFive'];
const FEATURE_KEYS = ['allTypes', 'doorDelivery', 'scheduling', 'security', 'network', 'management'];

const FEATURE_ICONS = {
  allTypes: Truck,
  doorDelivery: MapPin,
  scheduling: Clock,
  security: ShieldCheck,
  network: Globe,
  management: Container,
};

const Transport = () => {
  const { t } = useTranslation('transport');
  usePageTitle(t('transport:meta.title'));

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
                {t('approach.badge')}
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">{t('approach.title')}</h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">{t('approach.paragraph1')}</p>
              <p className="text-gray-600 leading-relaxed text-lg">{t('approach.paragraph2')}</p>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              className="flex flex-col gap-5"
            >
              {CONTAINER_KEYS.map((key, i) => (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Container className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-primary-600 mb-1">
                      {t(`containerSizes.${key}.size`)}
                    </p>
                    <p className="text-gray-500 text-sm">{t(`containerSizes.${key}.desc`)}</p>
                  </div>
                </motion.div>
              ))}
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
              {t('features.badge')}
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{t('features.title')}</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {FEATURE_KEYS.map((key, i) => {
              const Icon = FEATURE_ICONS[key];
              return (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all bg-white"
                >
                  <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                    <Icon className="w-6 h-6 text-primary-500 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{t(`features.${key}.title`)}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{t(`features.${key}.desc`)}</p>
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
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
          <Truck className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('cta.title')}</h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">{t('cta.description')}</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Transport;
