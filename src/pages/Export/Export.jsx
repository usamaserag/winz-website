import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Globe, FileCheck, ArrowRight, CheckCircle2, Truck, BarChart3, AlertTriangle } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

const features = [
  { icon: <ShieldCheck className="w-6 h-6 text-primary-500" />, title: 'Dual-Use Controls', desc: 'Expert handling of dual-use goods regulations and licensing requirements.' },
  { icon: <FileCheck className="w-6 h-6 text-primary-500" />, title: 'Preferential Origin', desc: 'Accurate preferential origin documentation to unlock trade agreement benefits.' },
  { icon: <Globe className="w-6 h-6 text-primary-500" />, title: 'Pan-European Presence', desc: 'Comprehensive coverage across all EU member states and beyond.' },
  { icon: <BarChart3 className="w-6 h-6 text-primary-500" />, title: 'Digital Infrastructure', desc: 'Advanced digital systems for real-time customs tracking and reporting.' },
];

const benefits = [
  'VAT proof-of-exit compliance guaranteed',
  'Zero documentation errors policy',
  'Preferred customs partner status at key EU ports',
  'Proactive regulatory change management',
  'Full audit trail for every export transaction',
  'Strategic advice on export licensing',
];

const Export = () => {
  usePageTitle('Export Customs Clearance');
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-primary-900 to-gray-900 pt-28 pb-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[700px] h-[700px] rounded-full border border-white/5" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[450px] h-[450px] rounded-full border border-white/5" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <motion.div initial="hidden" animate="visible" variants={fadeUp}>
            <span className="inline-block py-1 px-4 rounded-full bg-primary-500/20 text-primary-300 border border-primary-500/30 text-sm font-semibold tracking-wide mb-6">
              Export Customs Clearance
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Secure Your Global Reach with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              Winz Logistics
            </span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Empowering European Businesses to Export with Absolute Confidence
          </motion.p>

        </div>
      </section>

      {/* ── CHALLENGE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
                The Challenge
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The Path to Global Markets
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                Every successful export is a milestone of growth and international expansion. However, the path to global markets is often obstructed by a complex maze of dual-use controls, preferential origin requirements, and strict VAT proof-of-exit regulations.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                In the world of logistics, a minor documentation error can quickly escalate into stranded shipments at the border or unexpected financial penalties. Winz Logistics simplifies this complexity with <strong className="text-primary-600">14+ years of proven reliability</strong> and a comprehensive pan-European presence.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
              transition={{ delay: 0.15 }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-6"
            >
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-lg hover:shadow-primary-500/10 transition-all"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-4">
                    {f.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── RISK CALLOUT ── */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="bg-amber-50 border border-amber-200 rounded-3xl p-8 md:p-12 flex flex-col md:flex-row items-start gap-6"
          >
            <div className="w-14 h-14 bg-amber-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Cost of Non-Compliance</h3>
              <p className="text-gray-600 leading-relaxed">
                A minor documentation error can quickly escalate into stranded shipments at the border or unexpected financial penalties. By choosing Winz Logistics as your customs partner, you ensure your cargo remains compliant, your schedules stay on track, and your business continues to grow without borders.
              </p>
            </div>
          </motion.div>
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
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Winz for Export Clearance
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
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
          <Truck className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Grow Without Borders
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            We provide the strategic expertise and digital infrastructure required to navigate shifting standards. Your cargo stays compliant, your schedules stay on track.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Contact Our Export Team
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Export;
