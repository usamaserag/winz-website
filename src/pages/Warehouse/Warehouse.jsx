import { motion } from 'framer-motion';
import { Warehouse, Package, ShieldCheck, Clock, CheckCircle2, BarChart3, RefreshCw, Box } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

const services = [
  {
    icon: <ShieldCheck className="w-7 h-7 text-primary-500" />,
    title: 'Bonded Warehousing',
    desc:  'Optimise your cash flow by storing uncleared goods and deferring duty and VAT payments until the items enter the local market.',
  },
  {
    icon: <Clock className="w-7 h-7 text-primary-500" />,
    title: 'Short & Long-Term Storage',
    desc:  'Scalable solutions tailored to your inventory cycles and seasonal demands — from a few days to several months.',
  },
  {
    icon: <RefreshCw className="w-7 h-7 text-primary-500" />,
    title: 'Value-Added Services',
    desc:  'Professional re-packing, labelling, and palletising to ensure your goods are retail-ready or prepared for safe transit.',
  },
  {
    icon: <Box className="w-7 h-7 text-primary-500" />,
    title: 'Pick & Pack Operations',
    desc:  'Expert team ready to execute pick-and-pack operations at a moment\'s notice, with full precision and care.',
  },
  {
    icon: <BarChart3 className="w-7 h-7 text-primary-500" />,
    title: 'Inventory Management',
    desc:  'Precise inventory tracking and management to keep your supply chain running smoothly at all times.',
  },
  {
    icon: <Package className="w-7 h-7 text-primary-500" />,
    title: 'Container Unloading',
    desc:  'Professional unpacking and container unloading services integrated into your receiving workflow.',
  },
];

const benefits = [
  'Secure, compliant storage environment',
  'Bonded warehouse duty deferral',
  'Scalable short & long-term solutions',
  'Professional re-packing & labelling',
  'Expert palletising services',
  'Pick-and-pack on demand',
  'Precise inventory management',
  'Container unloading included',
];

const WarehousePage = () => {
  usePageTitle('Warehousing Solutions');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      <PageHero
        badge="Warehousing & Value-Added Services"
        title="Advanced Warehousing &"
        highlight="Value-Added Services"
        description="Strategic storage and fulfillment across the European supply chain."
      />

      {/* ── INTRO ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
                More Than Just Space
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                A Strategic Warehousing Ecosystem
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                Winz Logistics offers more than just space. We provide a strategic warehousing ecosystem designed to streamline your supply chain and reduce overhead. Our facilities are equipped to manage your inventory with precision, whether for a few days or several months.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                With Winz Logistics, your cargo is stored in a <strong className="text-primary-600">secure, compliant environment</strong>, backed by an expert team ready to execute pick-and-pack operations at a moment's notice.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="relative"
            >
              <div className="rounded-3xl overflow-hidden bg-gradient-to-br from-primary-50 to-primary-100 border border-primary-100 shadow-2xl shadow-primary-500/10 aspect-video flex items-center justify-center">
                <div className="text-center p-8">
                  <Warehouse className="w-24 h-24 text-primary-400 mx-auto mb-4 opacity-60" />
                  <p className="text-primary-700 font-semibold text-lg">Strategic Warehousing Ecosystem</p>
                  <p className="text-primary-500 text-sm mt-1">Secure · Compliant · Efficient</p>
                </div>
              </div>
              <div className="absolute -bottom-5 left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3 border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-primary-500 flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900 text-sm">Bonded Warehouse</p>
                  <p className="text-xs text-gray-500">Duty & VAT Deferral</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              Our Services
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Complete Warehousing Capabilities
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((s, i) => (
              <motion.div
                key={s.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.08 }}
                className="relative bg-white rounded-3xl p-8 border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-1.5 h-full bg-primary-500 rounded-r-full" />
                <div className="w-14 h-14 bg-primary-50 rounded-2xl flex items-center justify-center mb-6">
                  {s.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              Key Benefits
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything Your Inventory Needs
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.06 }}
                className="flex items-start gap-3 bg-gray-50 rounded-xl p-5 border border-gray-100 shadow-sm"
              >
                <CheckCircle2 className="w-5 h-5 text-primary-500 flex-shrink-0 mt-0.5" />
                <span className="text-gray-700 font-medium text-sm">{b}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>
        <motion.div
          initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
          className="relative z-10 max-w-4xl mx-auto px-4 text-center"
        >
          <Warehouse className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Cargo. Stored Securely. Ready Instantly.
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            With Winz Logistics, your inventory is managed with precision in a secure, fully compliant facility — backed by a team ready to act at a moment's notice.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default WarehousePage;
