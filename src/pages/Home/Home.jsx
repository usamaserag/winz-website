import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Globe, ShieldCheck, PackagePlus, PackageOpen,
  Route, Truck, Warehouse, Award, Package, Users
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import HomeHero from '../../components/logistics/HomeHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import LogisticsGridPattern from '../../components/logistics/LogisticsGridPattern';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

const SERVICE_KEYS = ['import', 'export', 'transit', 'transport', 'warehouse'];

const SERVICE_ICONS = {
  import: PackagePlus,
  export: PackageOpen,
  transit: Route,
  transport: Truck,
  warehouse: Warehouse,
};

const SERVICE_PATHS = {
  import: '/import',
  export: '/export',
  transit: '/transit',
  transport: '/transport',
  warehouse: '/warehouse',
};

const STAT_ITEMS = [
  { key: 'experience', value: '14+' },
  { key: 'compliance', value: '100%' },
  { key: 'ports', value: 'All' },
];

const PILLAR_KEYS = ['expertise', 'compliance', 'network', 'cargo', 'solutions', 'team'];

const PILLAR_ICONS = {
  expertise: Award,
  compliance: ShieldCheck,
  network: Globe,
  cargo: Package,
  solutions: Truck,
  team: Users,
};

const Home = () => {
  const { t } = useTranslation(['home', 'common']);
  usePageTitle(t('home:meta.title'));

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HomeHero />

      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {STAT_ITEMS.map((s, i) => (
              <motion.div
                key={s.key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-navy-900 mb-1">{s.value}</p>
                <p className="text-slate-500 text-sm font-medium">{t(`home:stats.${s.key}`)}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <SectionBadge label={t('home:aboutPreview.badge')} />
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                {t('home:aboutPreview.title')}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                {t('home:aboutPreview.description')}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
              >
                {t('home:aboutPreview.cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeRight}
              className="grid grid-cols-2 gap-5"
            >
              {PILLAR_KEYS.slice(0, 4).map((key, i) => {
                const Icon = PILLAR_ICONS[key];
                return (
                  <motion.div
                    key={key}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={fadeUp}
                    transition={{ delay: i * 0.08 }}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all"
                  >
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary-500" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1">
                      {t(`home:whyChoose.pillars.${key}.title`)}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t(`home:whyChoose.pillars.${key}.desc`)}
                    </p>
                  </motion.div>
                );
              })}
            </motion.div>
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
            <SectionBadge label={t('home:services.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('home:services.title')}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {t('home:services.description')}
            </p>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
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
                  className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <span className="inline-block py-0.5 px-3 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4">
                    {t(`home:services.cards.${key}.badge`)}
                  </span>
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-primary-500" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {t(`home:services.cards.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6">
                    {t(`home:services.cards.${key}.desc`)}
                  </p>
                  <Link
                    to={SERVICE_PATHS[key]}
                    className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/link"
                  >
                    {t('home:services.cta')}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <LogisticsGridPattern variant="dark" className="opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <SectionBadge label={t('home:whyChoose.badge')} variant="dark" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home:whyChoose.title')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLAR_KEYS.map((key, i) => {
              const Icon = PILLAR_ICONS[key];
              return (
                <motion.div
                  key={key}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.07 }}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary-500" />
                  </div>
                  <h3 className="font-bold text-white mb-2">
                    {t(`home:whyChoose.pillars.${key}.title`)}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(`home:whyChoose.pillars.${key}.desc`)}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
