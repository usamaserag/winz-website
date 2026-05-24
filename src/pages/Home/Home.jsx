import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, ShieldCheck, PackagePlus, PackageOpen,
  Route, Truck, Warehouse, Award, Package, Users
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import HomeHero from '../../components/logistics/HomeHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import LogisticsGridPattern from '../../components/logistics/LogisticsGridPattern';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

const services = [
  {
    icon:  <PackagePlus className="w-7 h-7 text-primary-500" />,
    title: 'Import',
    desc:  'Seamless import customs clearance across all European seaports and border crossings — fully compliant, fully managed.',
    path:  '/import',
    badge: 'Customs Clearance',
  },
  {
    icon:  <PackageOpen className="w-7 h-7 text-primary-500" />,
    title: 'Export',
    desc:  'Navigate dual-use controls, preferential origin, and VAT proof-of-exit with expert export clearance support.',
    path:  '/export',
    badge: 'Customs Clearance',
  },
  {
    icon:  <Route className="w-7 h-7 text-primary-500" />,
    title: 'Transit',
    desc:  'Uninterrupted cross-border movement with T1/T2 declarations and NCTS digital filing handled end-to-end.',
    path:  '/transit',
    badge: 'Customs Clearance',
  },
  {
    icon:  <Truck className="w-7 h-7 text-primary-500" />,
    title: 'Transport',
    desc:  'Full-scale container haulage for 20ft, 40ft, and 45ft containers — from port terminal to your doorstep.',
    path:  '/transport',
    badge: 'Inland Logistics',
  },
  {
    icon:  <Warehouse className="w-7 h-7 text-primary-500" />,
    title: 'Warehouse',
    desc:  'Bonded storage, short & long-term solutions, pick-and-pack, palletising, and duty deferral — all under one roof.',
    path:  '/warehouse',
    badge: 'Storage & Value-Added',
  },
];

const stats = [
  { value: '14+', label: 'Years of Experience' },
  { value: '100%', label: 'EU Compliance' },
  { value: 'All', label: 'European Ports' },
  { value: '24/7', label: 'Expert Support' },
];

const pillars = [
  { icon: <Award className="w-6 h-6 text-primary-500" />, title: '14+ Years Expertise', desc: 'Deep knowledge of EU customs legislation and cross-border procedures.' },
  { icon: <ShieldCheck className="w-6 h-6 text-primary-500" />, title: 'Full Compliance Guaranteed', desc: 'Every shipment processed to the highest regulatory standards — no exceptions.' },
  { icon: <Globe className="w-6 h-6 text-primary-500" />, title: 'Pan-European Network', desc: "The region's most extensive neutral customs network at every port and crossing." },
  { icon: <Package className="w-6 h-6 text-primary-500" />, title: 'All Cargo Types', desc: 'From perishable food to general merchandise and oversized freight.' },
  { icon: <Truck className="w-6 h-6 text-primary-500" />, title: 'End-to-End Solutions', desc: 'Customs clearance, haulage, and warehousing — fully integrated under one partner.' },
  { icon: <Users className="w-6 h-6 text-primary-500" />, title: 'Dedicated Specialists', desc: 'A team of customs experts assigned to manage your account personally.' },
];

const Home = () => {
  usePageTitle('');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <HomeHero />

      <section className="py-12 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-navy-900 mb-1">{s.value}</p>
                <p className="text-slate-500 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <SectionBadge label="Who We Are" />
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6">
                Winz Logistics — Your Trusted European Customs Partner
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6 text-lg">
                Headquartered to serve the European market, we specialise in bridging the gap between global suppliers and the EU. With over 14 years of experience, we handle all customs formalities at every European seaport and border crossing — so you can focus on your core business.
              </p>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-primary-600 font-semibold hover:text-primary-700 transition-colors group"
              >
                Discover Our Story
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
              {pillars.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-5 border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-navy-900 text-sm mb-1">{p.title}</h3>
                  <p className="text-slate-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
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
            <SectionBadge label="Our Services" />
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">
              Every Step of Your Cargo&apos;s Journey
            </h2>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              From customs clearance to inland haulage and secure storage — we manage every stage so your supply chain never skips a beat.
            </p>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s, i) => (
              <motion.div
                key={s.path}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-slate-50 rounded-2xl p-8 border border-slate-200 hover:border-primary-200 hover:shadow-lg transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-2xl" />
                <span className="inline-block py-0.5 px-3 rounded-full bg-primary-100 text-primary-700 text-xs font-semibold mb-4">
                  {s.badge}
                </span>
                <div className="w-14 h-14 bg-white rounded-xl shadow-sm border border-slate-200 flex items-center justify-center mb-5">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-navy-900 mb-3">{s.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6">{s.desc}</p>
                <Link
                  to={s.path}
                  className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm hover:text-primary-700 transition-colors group/link"
                >
                  Learn More
                  <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
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
            <SectionBadge label="Why Choose Us" variant="dark" />
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Businesses Trust Winz Logistics
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-colors"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-5">
                  {p.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
