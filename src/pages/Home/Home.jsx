import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import {
  ArrowRight, Globe, ShieldCheck, PackagePlus, PackageOpen,
  Route, Truck, Warehouse, Award, Package, Users, Plane, FileSearch, Zap, Container, CheckSquare
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import HomeHero from '../../components/logistics/HomeHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import LogisticsGridPattern from '../../components/logistics/LogisticsGridPattern';

const SERVICE_KEYS = [
  'import', 'export', 'transit', 'transport', 'warehouse',
  'air_freight', 'road_freight', 'hs_code', 'fast_track', 'fcl', 'lcl', 'consulting'
];

const SERVICE_ICONS = {
  import: PackagePlus,
  export: PackageOpen,
  transit: Route,
  transport: Truck,
  warehouse: Warehouse,
  air_freight: Plane,
  road_freight: Truck,
  hs_code: FileSearch,
  fast_track: Zap,
  fcl: Container,
  lcl: Package,
  consulting: CheckSquare,
};

const SERVICE_PATHS = {
  import: '/import',
  export: '/export',
  transit: '/transit',
  transport: '/transport',
  warehouse: '/warehouse',
  air_freight: '/air-freight-customs-clearance',
  road_freight: '/road-freight-customs-clearance',
  hs_code: '/hs-code-classification',
  fast_track: '/fast-track-customs-clearance',
  fcl: '/fcl-customs-clearance',
  lcl: '/lcl-customs-clearance',
  consulting: '/customs-consulting',
};

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

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="reveal-on-scroll">
              <SectionBadge label={t('home:aboutPreview.badge')} />
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                {t('home:aboutPreview.title')}
              </h2>
              <p className="text-slate-600 leading-relaxed mb-4 text-lg">
                {t('home:aboutPreview.description1')}
              </p>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                {t('home:aboutPreview.description2')}
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
              >
                {t('home:aboutPreview.cta')}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {PILLAR_KEYS.slice(0, 4).map((key) => {
                const Icon = PILLAR_ICONS[key];
                return (
                  <div
                    key={key}
                    className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all reveal-on-scroll"
                  >
                    <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                      <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                    </div>
                    <h3 className="font-bold text-navy-900 text-sm mb-1">
                      {t(`home:whyChoose.pillars.${key}.title`)}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed">
                      {t(`home:whyChoose.pillars.${key}.desc`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <SectionBadge label={t('home:services.badge')} />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              {t('home:services.title')}
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              {t('home:services.description')}
            </p>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mt-6" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7 mb-12">
            {SERVICE_KEYS.map((key) => {
              const Icon = SERVICE_ICONS[key];
              return (
                <div
                  key={key}
                  className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all overflow-hidden reveal-on-scroll flex flex-col h-full"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                  <span className="inline-block py-0.5 px-3 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4 self-start">
                    {t(`home:services.cards.${key}.badge`)}
                  </span>
                  <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-primary-500" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-900 mb-3">
                    {t(`home:services.cards.${key}.title`)}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed mb-6 flex-grow">
                    {t(`home:services.cards.${key}.desc`)}
                  </p>
                  <Link
                    to={SERVICE_PATHS[key]}
                    className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/link mt-auto"
                  >
                    {t('home:services.cta')}
                    <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" aria-hidden="true" />
                  </Link>
                </div>
              );
            })}
          </div>

          <div className="text-center reveal-on-scroll">
            <Link
              to="/services"
              className="inline-block bg-primary-500 text-white font-bold px-10 py-3.5 rounded-lg hover:bg-primary-600 transition-colors"
            >
              {t('home:services.viewAllCta')}
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-950 relative overflow-hidden">
        <LogisticsGridPattern variant="dark" className="opacity-50" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 reveal-on-scroll">
            <SectionBadge label={t('home:whyChoose.badge')} variant="dark" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t('home:whyChoose.title')}
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PILLAR_KEYS.map((key) => {
              const Icon = PILLAR_ICONS[key];
              return (
                <div
                  key={key}
                  className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors reveal-on-scroll"
                >
                  <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-5">
                    <Icon className="w-6 h-6 text-primary-500" aria-hidden="true" />
                  </div>
                  <h3 className="font-bold text-white mb-2">
                    {t(`home:whyChoose.pillars.${key}.title`)}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {t(`home:whyChoose.pillars.${key}.desc`)}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none opacity-[0.07] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:2.5rem_2.5rem]"
          aria-hidden="true"
        />
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center reveal-on-scroll">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('home:finalCta.title')}
          </h2>
          <p className="text-primary-100 text-lg mb-8">{t('home:finalCta.description')}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-block bg-white text-primary-700 font-bold px-10 py-3.5 rounded-lg hover:bg-primary-50 transition-colors"
            >
              {t('home:finalCta.button1')}
            </Link>
            <Link
              to="/faq"
              className="inline-block border border-white text-white font-bold px-10 py-3.5 rounded-lg hover:bg-white/10 transition-colors"
            >
              {t('home:finalCta.button2')}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
