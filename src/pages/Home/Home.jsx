import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Globe, ShieldCheck, PackagePlus, PackageOpen,
  Route, Truck, Warehouse, Star, Package, Users
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

const fadeUp   = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } } };
const fadeLeft = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6  } } };
const fadeRight= { hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6  } } };

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    }
  }
};

/* ── Journey service cards ── */
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

/* ── Why Winz stats ── */
const stats = [
  { value: '14+', label: 'Years of Experience' },
  { value: '100%', label: 'EU Compliance' },
  { value: 'All', label: 'European Ports' },
  { value: '24/7', label: 'Expert Support' },
];

/* ── Why Winz pillars ── */
const pillars = [
  { icon: <Star       className="w-6 h-6 text-primary-500" />, title: '14+ Years Expertise',         desc: 'Deep knowledge of EU customs legislation and cross-border procedures.' },
  { icon: <ShieldCheck className="w-6 h-6 text-primary-500" />, title: 'Full Compliance Guaranteed',   desc: 'Every shipment processed to the highest regulatory standards — no exceptions.' },
  { icon: <Globe      className="w-6 h-6 text-primary-500" />, title: 'Pan-European Network',          desc: 'The region\'s most extensive neutral customs network at every port and crossing.' },
  { icon: <Package    className="w-6 h-6 text-primary-500" />, title: 'All Cargo Types',              desc: 'From perishable food to general merchandise and oversized freight.' },
  { icon: <Truck      className="w-6 h-6 text-primary-500" />, title: 'End-to-End Solutions',          desc: 'Customs clearance, haulage, and warehousing — fully integrated under one partner.' },
  { icon: <Users      className="w-6 h-6 text-primary-500" />, title: 'Dedicated Specialists',        desc: 'A team of customs experts assigned to manage your account personally.' },
];

/* ════════════════════════════════════ PAGE ════════════════════════════════════ */
const Home = () => {
  usePageTitle('');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900">
        
        {/* Globe and Planetary System */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Outer Ring */}
          <div className="absolute w-[800px] h-[800px] rounded-full border border-white/5 animate-[spin_60s_linear_infinite]">
            <div className="absolute top-[14%] right-[14%] w-6 h-6 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600 shadow-[0_0_30px_rgba(99,102,241,0.8)]"></div>
          </div>
          
          {/* Middle Ring */}
          <div className="absolute w-[550px] h-[550px] rounded-full border border-white/10 border-dashed animate-[spin_40s_linear_infinite_reverse]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-[0_0_20px_white]"></div>
            
            {/* Small Moon orbiting the middle planet */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 animate-[spin_4s_linear_infinite]">
               <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/80"></div>
            </div>
          </div>

          {/* Inner Ring */}
          <div className="absolute w-[320px] h-[320px] rounded-full border border-primary-500/20 animate-[spin_25s_linear_infinite]">
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-6 h-6 rounded-full bg-primary-400 shadow-[0_0_25px_rgba(56,189,248,0.9)]"></div>
          </div>
          
          {/* Core glow */}
          <div className="absolute w-40 h-40 rounded-full bg-primary-500/20 blur-[60px]"></div>
        </div>

        <motion.div 
          variants={staggerContainer}
          initial="hidden" 
          animate="visible"
          className="relative z-10 max-w-5xl mx-auto px-4 text-center mt-16"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block py-1.5 px-5 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-sm font-semibold tracking-widest mb-8 uppercase shadow-[0_0_15px_rgba(56,189,248,0.15)] backdrop-blur-sm"
          >
            Winz Logistics
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-5xl md:text-7xl font-extrabold text-white tracking-tight leading-tight mb-6 drop-shadow-lg"
          >
            Your Trusted Partner in <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-blue-300">
              European Logistics
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mt-8"
          >
            14 years of expertise in customs clearance, container transport, and warehousing across Europe.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── STATS STRIP ─── */}
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="text-center"
              >
                <p className="text-4xl font-extrabold text-primary-500 mb-1">{s.value}</p>
                <p className="text-gray-500 text-sm font-medium">{s.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── ABOUT TEASER ─── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
                Who We Are
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Winz Logistics — Your Trusted European Customs Partner
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6 text-lg">
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
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="grid grid-cols-2 gap-5"
            >
              {pillars.slice(0, 4).map((p, i) => (
                <motion.div
                  key={p.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white rounded-2xl p-5 border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
                >
                  <div className="w-10 h-10 bg-primary-50 rounded-xl flex items-center justify-center mb-3">
                    {p.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 text-sm mb-1">{p.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{p.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── SERVICES JOURNEY ─── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Every Step of Your Cargo's Journey
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              From customs clearance to inland haulage and secure storage — we manage every stage so your supply chain never skips a beat.
            </p>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full mt-6" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {services.map((s, i) => (
              <motion.div
                key={s.path}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="group relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all overflow-hidden"
              >
                {/* top accent bar */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary-400 to-primary-600 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-t-3xl" />

                <span className="inline-block py-0.5 px-3 rounded-full bg-primary-100 text-primary-600 text-xs font-semibold mb-4">
                  {s.badge}
                </span>

                <div className="w-14 h-14 bg-white rounded-2xl shadow-sm border border-gray-100 flex items-center justify-center mb-5">
                  {s.icon}
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{s.desc}</p>

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

      {/* ─── WHY WINZ FULL ─── */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-5">
          <div className="w-[900px] h-[900px] rounded-full border-2 border-primary-400" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-sm font-semibold tracking-wide mb-4">
              Why Choose Us
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Businesses Trust Winz Logistics
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 bg-primary-500/20 rounded-xl flex items-center justify-center mb-5">
                  {p.icon}
                </div>
                <h3 className="font-bold text-white mb-2">{p.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── FOOTER CTA ─── */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <Globe className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to Simplify Your European Logistics?
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            Let Winz Logistics handle every step — from customs clearance to your doorstep. Focus on your business while we take care of the complexity.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default Home;
