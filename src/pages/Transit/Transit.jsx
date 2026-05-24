import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  ArrowRight, CheckCircle2, FileText, ShieldCheck,
  Clock, Globe, Zap, AlertTriangle
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';

import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';
import PageHero from '../../components/logistics/PageHero';

const features = [
  {
    icon: <FileText   className="w-6 h-6 text-primary-500" />,
    title: 'T1 / T2 Declarations',
    desc:  'Precise preparation and submission of T1 and T2 transit declarations, fully compliant with EU requirements.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary-500" />,
    title: 'Guarantee Facilities',
    desc:  'Robust guarantee management to cover customs duties and ensure uninterrupted cross-border movement.',
  },
  {
    icon: <Zap        className="w-6 h-6 text-primary-500" />,
    title: 'NCTS Digital Filing',
    desc:  'Expert handling of New Computerised Transit System (NCTS) protocols and strict electronic filing deadlines.',
  },
  {
    icon: <Globe      className="w-6 h-6 text-primary-500" />,
    title: 'Pan-European Coverage',
    desc:  'The region\'s most extensive neutral customs network, covering all European borders and crossings.',
  },
  {
    icon: <Clock      className="w-6 h-6 text-primary-500" />,
    title: 'On-Time Delivery',
    desc:  'Strict schedule adherence ensures your cargo reaches its destination without delays or bottlenecks.',
  },
  {
    icon: <ShieldCheck className="w-6 h-6 text-primary-500" />,
    title: '14 Years of Experience',
    desc:  'Deep expertise in transit procedures built over 14 years of managing complex cross-border movements.',
  },
];

const benefits = [
  'Full T1 & T2 transit declaration management',
  'NCTS compliant digital filing',
  'Comprehensive guarantee coverage',
  'Real-time shipment tracking across borders',
  'Zero administrative bottlenecks',
  'Dedicated transit specialists for every shipment',
  'Compliance at all European border checkpoints',
  'Worry-free, on-time delivery guaranteed',
];

const Transit = () => {
  usePageTitle('Transit Customs Clearance');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      <PageHero
        badge="Transit Customs Clearance"
        title="Uninterrupted Transit Across Europe with"
        highlight="Winz Logistics"
        description="Ensuring seamless cross-border movement for your global cargo."
      />

      {/* ── CHALLENGE ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
                The Challenge
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Navigating Europe's Complex Transit Landscape
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                Navigating Europe's borders requires more than just transportation — it demands precise transit management. Between T1/T2 declarations, complex guarantee requirements, and strict NCTS digital filing deadlines, transit procedures can easily become a bottleneck.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Without expert oversight, these regulatory checkpoints often lead to administrative burdens, unexpected costs, and costly delivery delays. Winz Logistics keeps your supply chain in motion by eliminating the friction of border crossings.
              </p>
            </motion.div>

            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
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
              <h3 className="text-xl font-bold text-gray-900 mb-3">The Cost of Transit Delays</h3>
              <p className="text-gray-600 leading-relaxed">
                Administrative bottlenecks at border checkpoints don't just cost time — they cost money. Missed NCTS filing deadlines, insufficient guarantee coverage, or incorrect T1/T2 documentation can result in shipment holds, financial penalties, and damaged client relationships. With Winz Logistics, these risks are eliminated before they arise.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── OUR SOLUTION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              Our Solution
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What You Get with Winz Transit Services
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 max-w-6xl mx-auto">
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
          <Globe className="w-12 h-12 text-primary-200 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Move Your Cargo Across Europe — Without a Hitch
          </h2>
          <p className="text-primary-100 text-lg mb-8 max-w-2xl mx-auto">
            Leveraging 14 years of experience and the region's most extensive neutral customs network, Winz Logistics ensures your shipments move compliant, on time, and worry-free.
          </p>

        </motion.div>
      </section>

    </div>
  );
};

export default Transit;
