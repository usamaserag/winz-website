import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Globe, Truck, Warehouse, Package,
  CheckCircle2, ArrowRight, Snowflake, FileText,
  Ship, Star, Clock
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

/* ─── animation variants ─── */
const fadeUp    = { hidden: { opacity: 0, y: 28  }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };
const fadeLeft  = { hidden: { opacity: 0, x: -36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6  } } };
const fadeRight = { hidden: { opacity: 0, x:  36 }, visible: { opacity: 1, x: 0, transition: { duration: 0.6  } } };

const SectionBadge = ({ label }) => (
  <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
    {label}
  </span>
);

/* ─── Why Choose data ─── */
const reasons = [
  {
    icon: <Star       className="w-6 h-6 text-primary-500" />,
    title: '14+ Years of Expertise',
    desc:  'Deep knowledge of EU customs legislation and border procedures built over a decade of dedicated practice.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary-500" />,
    title: 'Comprehensive Customs Services',
    desc:  'Specialised in import, export, and transit formalities, ensuring full compliance at every step.',
  },
  {
    icon: <Globe      className="w-6 h-6 text-primary-500" />,
    title: 'Strategic European Coverage',
    desc:  'Handling documentation and clearance at all major European ports and border crossings.',
  },
  {
    icon: <Snowflake  className="w-6 h-6 text-primary-500" />,
    title: 'Specialised Food Handling',
    desc:  'Expert handling for frozen, chilled, and fresh food products, including vegetables and perishables.',
  },
  {
    icon: <Package    className="w-6 h-6 text-primary-500" />,
    title: 'All-Cargo Capability',
    desc:  'From containerised cargo to general freight, we manage all product types from across the globe.',
  },
  {
    icon: <Warehouse  className="w-6 h-6 text-primary-500" />,
    title: 'Warehousing Solutions',
    desc:  'Secure storage options including bonded warehousing to optimise your supply chain.',
  },
];

/* ─── Core Services data ─── */
const services = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-primary-500" />,
    title: 'Expert Customs Clearance in Europe',
    desc:  'We manage all customs matters for goods entering Europe from around the world.',
    items: [
      { icon: <Snowflake className="w-4 h-4" />, text: 'Frozen & Chilled Foodstuffs — Specialised handling for temperature-sensitive cargo (food & vegetables).' },
      { icon: <Package   className="w-4 h-4" />, text: 'General Merchandise — Efficient clearance for all cargo types.' },
      { icon: <FileText  className="w-4 h-4" />, text: 'Documentation — Commercial Invoices, Packing Lists, Certificates of Origin, and Transit Documentation T1–T2.' },
    ],
  },
  {
    icon: <Ship className="w-7 h-7 text-primary-500" />,
    title: 'Container Transport & Shipping',
    desc:  'Leveraging a strong network, we manage the entire maritime or land transport process, ensuring your goods arrive safely and on time.',
    items: [],
  },
  {
    icon: <Warehouse className="w-7 h-7 text-primary-500" />,
    title: 'Comprehensive Warehousing',
    desc:  'Whether you need short-term storage during clearance or long-term solutions, we provide:',
    items: [
      { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Secure storage.' },
      { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Bonded warehouse facilities.' },
      { icon: <CheckCircle2 className="w-4 h-4" />, text: 'Unpacking and container unloading services.' },
    ],
  },
];

/* ─── Stats ─── */
const stats = [
  { value: '14+',  label: 'Years of Experience' },
  { value: '100%', label: 'EU Compliance Rate'  },
  { value: 'All',  label: 'European Ports Covered' },
  { value: '24/7', label: 'Support Available'   },
];

/* ════════════════════════════════════ PAGE ════════════════════════════════════ */
const About = () => {
  usePageTitle('About Us');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ─── HERO ─── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-28 pb-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[450px] h-[450px] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <SectionBadge label="About Winz Logistics" />
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Your Trusted Partner in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              European Customs & Logistics
            </span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Over 14 years of dedicated experience in customs clearance and international logistics — bridging the gap between global suppliers and the European Union.
          </motion.p>

        </div>
      </section>

      {/* ─── STATS ─── */}
      <section className="py-14 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="text-center p-8 bg-gray-50 rounded-2xl border border-gray-100"
              >
                <p className="text-4xl md:text-5xl font-extrabold text-primary-500 mb-2">{s.value}</p>
                <p className="text-gray-600 font-medium text-sm">{s.label}</p>
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
              <SectionBadge label="Welcome to Winz Logistics" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                14 Years of Unparalleled Customs Expertise
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                Headquartered to serve the European market, we specialise in bridging the gap between global suppliers and the European Union, ensuring seamless, fast, and compliant movement of goods.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                We understand that navigating customs regulations can be complex. That is why we provide a <strong className="text-primary-600">comprehensive customs service package</strong>, handling all formalities at all European seaports and border crossings. Our goal is to handle the logistics complexity, allowing you to focus on your core business.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100 shadow-2xl shadow-primary-500/10 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <Globe className="w-24 h-24 text-primary-400 mx-auto mb-4 opacity-60" />
                  <p className="text-primary-700 font-semibold text-lg">Pan-European Customs Network</p>
                  <p className="text-primary-500 text-sm mt-1">All Ports & Border Crossings</p>
                </div>
              </div>
              {/* floating badge */}
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Fast Clearance</p>
                  <p className="text-xs text-gray-500">Minimise Delays</p>
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
            <SectionBadge label="Why Choose Us" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Winz Logistics?
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {reasons.map((r, i) => (
              <motion.div
                key={r.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                whileHover={{ y: -8 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all bg-white"
              >
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <div className="[&>svg]:group-hover:text-white transition-colors duration-300">
                    {r.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{r.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{r.desc}</p>
              </motion.div>
            ))}
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
            <SectionBadge label="What We Do" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Our Core Services</h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.1 }}
                className="relative bg-gray-50 rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500 rounded-r-full" />
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-5">{s.desc}</p>
                {s.items.length > 0 && (
                  <ul className="space-y-3">
                    {s.items.map((item) => (
                      <li key={item.text} className="flex items-start gap-2.5 text-sm text-gray-600">
                        <span className="text-primary-500 flex-shrink-0 mt-0.5">{item.icon}</span>
                        {item.text}
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
            Let Winz Logistics Simplify Your International Trade
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Contact us today to handle your logistics seamlessly. We take care of the complexity so you can focus on growing your business.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Contact Us Today
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default About;
