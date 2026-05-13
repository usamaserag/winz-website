import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShieldCheck, Clock, Globe, FileCheck, ArrowRight, CheckCircle2, Package } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

const fadeUp = { hidden: { opacity: 0, y: 28 }, visible: { opacity: 1, y: 0, transition: { duration: 0.55 } } };

const features = [
  { icon: <ShieldCheck className="w-6 h-6 text-primary-500" />, title: 'Full EU Compliance', desc: 'Complete adherence to EU regulatory frameworks and national procedures.' },
  { icon: <Clock className="w-6 h-6 text-primary-500" />, title: 'Fast Processing', desc: 'Minimise delays with our streamlined digital customs workflows.' },
  { icon: <Globe className="w-6 h-6 text-primary-500" />, title: 'Pan-European Network', desc: 'The region\'s most extensive neutral customs network at your service.' },
  { icon: <FileCheck className="w-6 h-6 text-primary-500" />, title: 'Document Accuracy', desc: 'Zero-error documentation standards that keep your cargo moving.' },
];

const benefits = [
  'Reduction in customs processing time',
  'Full compliance with EU import regulations',
  'Dedicated customs specialist assigned to your account',
  'Real-time shipment status updates',
  'Seamless coordination with EU port authorities',
  'Cost-optimised duty and tax management',
];

const Import = () => {
  usePageTitle('Import Customs Clearance');
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
              Import Customs Clearance
            </span>
          </motion.div>

          <motion.h1
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-white tracking-tight leading-tight mb-6"
          >
            Master European Import Compliance with{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-400 to-primary-300">
              Winz Logistics
            </span>
          </motion.h1>

          <motion.p
            initial="hidden" animate="visible" variants={fadeUp}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          >
            Optimizing Your Supply Chain Through Expert Customs Solutions
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
                Navigating the European Import Landscape
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                Navigating the European import landscape is often a daunting task. Between the intricate EU regulatory frameworks, stringent documentation standards, and the nuances of individual national procedures, businesses are frequently exposed to costly delays and compliance risks.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Winz Logistics removes these barriers, offering seamless import customs clearance services across the continent. Leveraging over <strong className="text-primary-600">14 years of specialised expertise</strong> and the region's most extensive neutral customs network, we ensure your cargo is processed efficiently and remains fully compliant.
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

      {/* ── BENEFITS ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              What You Get
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose Winz for Import Clearance
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="flex items-start gap-3 bg-white rounded-xl p-5 border border-gray-100 shadow-sm"
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
          <Package className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Partner with Winz Logistics Today
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Reduce your overhead and keep your focus where it belongs — on growing your business. Let our experts handle every aspect of your European import compliance.
          </p>
          <Link
            to="/contact"
            className="inline-block bg-white text-primary-600 font-bold px-10 py-4 rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transition-all"
          >
            Contact Our Import Team
          </Link>
        </motion.div>
      </section>

    </div>
  );
};

export default Import;
