import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ShieldCheck, Clock, Globe, FileCheck, CheckCircle2, Package, ArrowDownToLine } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

const fadeUp = { hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6 } } };
const staggerContainer = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } } };

const features = [
  { icon: <ShieldCheck className="w-8 h-8 text-primary-600" />, title: 'Full EU Compliance', desc: 'Complete adherence to EU regulatory frameworks and national procedures.' },
  { icon: <Clock className="w-8 h-8 text-primary-600" />, title: 'Fast Processing', desc: 'Minimise delays with our streamlined digital customs workflows.' },
  { icon: <Globe className="w-8 h-8 text-primary-600" />, title: 'Pan-European Network', desc: 'The region\'s most extensive neutral customs network at your service.' },
  { icon: <FileCheck className="w-8 h-8 text-primary-600" />, title: 'Document Accuracy', desc: 'Zero-error documentation standards that keep your cargo moving.' },
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

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 overflow-x-hidden">
      {/* ── HERO (Split Layout) ── */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden bg-white">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-40"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100 shadow-sm">
                <ArrowDownToLine size={16} />
                <span>Inbound Logistics Excellence</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-5xl lg:text-6xl font-black text-gray-900 tracking-tight leading-[1.1] mb-6">
                Master European Import Compliance with <span className="text-primary-600 relative">
                  Winz Logistics
                  <svg className="absolute w-full h-3 -bottom-1 left-0 text-primary-200" viewBox="0 0 100 10" preserveAspectRatio="none"><path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="transparent"/></svg>
                </span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-gray-600 mb-8 leading-relaxed">
                Optimizing Your Supply Chain Through Expert Customs Solutions
              </motion.p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 20 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="relative hidden lg:block"
            >
              <motion.div 
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full aspect-square max-w-md mx-auto"
              >
                {/* Back shadow shape */}
                <motion.div 
                  animate={{ rotate: [6, 12, 6] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute inset-0 bg-gradient-to-tr from-primary-200/60 to-primary-50/60 rounded-[3rem] transform"
                ></motion.div>
                
                {/* Main Card */}
                <div className="absolute inset-0 bg-white rounded-[3rem] shadow-2xl border border-gray-100 transform -rotate-3 p-8 flex flex-col justify-center items-center text-center hover:-translate-y-2 transition-transform duration-500">
                  <div className="w-24 h-24 bg-primary-50 rounded-full flex items-center justify-center mb-6 shadow-inner">
                    <Package className="w-12 h-12 text-primary-600" />
                  </div>
                  <h3 className="text-3xl font-black text-gray-900 mb-2">14+ Years</h3>
                  <p className="text-gray-500 font-medium">of specialised expertise</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES (Horizontal Grid) ── */}
      <section className="py-24 bg-gray-900 text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-4xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Navigating the European Import Landscape</h2>
            <p className="text-gray-400 text-lg mb-4">
              Navigating the European import landscape is often a daunting task. Between the intricate EU regulatory frameworks, stringent documentation standards, and the nuances of individual national procedures, businesses are frequently exposed to costly delays and compliance risks.
            </p>
            <p className="text-gray-400 text-lg">
              Winz Logistics removes these barriers, offering seamless import customs clearance services across the continent. Leveraging over 14 years of specialised expertise and the region's most extensive neutral customs network, we ensure your cargo is processed efficiently and remains fully compliant.
            </p>
          </motion.div>

          <motion.div 
            variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {features.map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="bg-gray-800 rounded-2xl p-8 border border-gray-700 hover:border-primary-500/50 transition-colors">
                <div className="bg-gray-900 w-14 h-14 rounded-lg flex items-center justify-center mb-6 border border-gray-700">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── BENEFITS (List Style) ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="lg:col-span-5">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Winz for Import Clearance</h2>
            </motion.div>
            
            <div className="lg:col-span-7">
              <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {benefits.map((b, i) => (
                  <motion.div key={i} variants={fadeUp} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100">
                    <div className="w-8 h-8 rounded-full bg-primary-100 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 h-5 text-primary-600" />
                    </div>
                    <span className="text-gray-800 font-medium">{b}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 bg-primary-600 text-white text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Partner with Winz Logistics Today</h2>
          <p className="text-primary-100 text-lg">Reduce your overhead and keep your focus where it belongs — on growing your business. Let our experts handle every aspect of your European import compliance.</p>
        </motion.div>
      </section>
    </div>
  );
};

export default Import;
