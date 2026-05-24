import { motion } from 'framer-motion';
import { ShieldCheck, Globe, FileCheck, BarChart3, AlertTriangle, Check } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import { fadeUp } from '../../components/logistics/motionVariants';

const features = [
  { icon: <ShieldCheck className="w-7 h-7 text-primary-600" />, title: 'Dual-Use Controls', desc: 'Expert handling of dual-use goods regulations and licensing requirements.' },
  { icon: <FileCheck className="w-7 h-7 text-primary-600" />, title: 'Preferential Origin', desc: 'Accurate preferential origin documentation to unlock trade agreement benefits.' },
  { icon: <Globe className="w-7 h-7 text-primary-600" />, title: 'Pan-European Presence', desc: 'Comprehensive coverage across all EU member states and beyond.' },
  { icon: <BarChart3 className="w-7 h-7 text-primary-600" />, title: 'Digital Infrastructure', desc: 'Advanced digital systems for real-time customs tracking and reporting.' },
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen bg-slate-50 text-slate-800 overflow-x-hidden"
    >
      <PageHero
        badge="Outbound Operations"
        title="Secure Your Global Reach with"
        highlight="Winz Logistics"
        description="Empowering European businesses to export with confidence, compliance, and zero friction."
      />

      <section className="border-y border-slate-200 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-center md:text-left">
            <div className="w-14 h-14 bg-amber-50 rounded-xl flex items-center justify-center shrink-0 border border-amber-200">
              <AlertTriangle className="w-7 h-7 text-amber-600" />
            </div>
            <p className="text-slate-600 text-lg max-w-4xl leading-relaxed">
              <strong className="text-navy-900 font-semibold">The Cost of Non-Compliance:</strong>{' '}
              A minor documentation error can quickly escalate into stranded shipments. Choose Winz to ensure your cargo remains compliant and schedules stay on track.
            </p>
          </div>
        </motion.div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center"
          >
            <div className="order-2 lg:order-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {features.map((f, i) => (
                <motion.div
                  key={f.title}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeUp}
                  transition={{ delay: i * 0.08 }}
                  className="bg-white p-6 rounded-xl border border-slate-200 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 bg-primary-50 rounded-xl flex items-center justify-center mb-5">
                    {f.icon}
                  </div>
                  <h3 className="text-navy-900 font-bold mb-2 text-lg">{f.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="order-1 lg:order-2"
            >
              <SectionBadge label="Export Clearance" />
              <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-6 leading-tight">
                The Path to Global Markets
              </h2>
              <p className="text-slate-600 text-lg leading-relaxed mb-6">
                Every successful export is a milestone of growth. However, the path is often obstructed by a complex maze of dual-use controls, preferential origin requirements, and strict VAT proof-of-exit regulations.
              </p>
              <div className="w-16 h-1 bg-primary-500 rounded-full" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-navy-900 mb-4">Export With Certainty</h2>
            <p className="text-slate-500 text-lg">Why industry leaders trust Winz Logistics.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
            {benefits.map((b, i) => (
              <motion.div
                key={b}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.05 }}
                className="bg-slate-50 border border-slate-200 p-6 rounded-xl flex gap-4 items-start hover:border-primary-200 hover:shadow-sm transition-all"
              >
                <div className="w-10 h-10 bg-primary-50 rounded-lg flex items-center justify-center shrink-0 border border-primary-100">
                  <Check className="w-5 h-5 text-primary-600" />
                </div>
                <h3 className="text-base font-semibold text-navy-900 leading-relaxed">{b}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 bg-navy-950">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="text-center px-4 max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">Grow Without Borders</h2>
          <p className="text-lg text-slate-400">
            We provide the strategic expertise required to navigate shifting standards. Your cargo stays compliant, your schedules stay on track.
          </p>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Export;
