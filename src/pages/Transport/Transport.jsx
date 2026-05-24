import { motion } from 'framer-motion';
import { Truck, Container, MapPin, Clock, CheckCircle2, ShieldCheck, Globe, ArrowRight } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import { fadeUp, fadeLeft, fadeRight } from '../../components/logistics/motionVariants';

const containerSizes = [
  { size: '20ft', desc: 'Standard container for general cargo and dry goods.' },
  { size: '40ft', desc: 'High-capacity haulage for larger shipments.' },
  { size: '45ft', desc: 'Extended capacity for bulk or oversized loads.' },
];

const features = [
  { icon: <Truck       className="w-6 h-6 text-primary-500" />, title: 'All Container Types',      desc: 'Standard dry vans, high cubes, and specialised containers — we handle them all.' },
  { icon: <MapPin      className="w-6 h-6 text-primary-500" />, title: 'Port-to-Door Delivery',    desc: 'Seamless transition from the quay directly to your specified address.' },
  { icon: <Clock       className="w-6 h-6 text-primary-500" />, title: 'Precise Scheduling',       desc: 'Reliable transport network with strict schedule adherence to minimise delays.' },
  { icon: <ShieldCheck className="w-6 h-6 text-primary-500" />, title: 'Secure Haulage',           desc: 'Full cargo security throughout the inland journey, from port terminal to destination.' },
  { icon: <Globe       className="w-6 h-6 text-primary-500" />, title: 'Wide Network',             desc: 'Extensive inland transport coverage across European destinations.' },
  { icon: <Container   className="w-6 h-6 text-primary-500" />, title: 'End-to-End Management',   desc: 'Our logistics team manages every step of the haulage process on your behalf.' },
];

const benefits = [
  'Post-clearance haulage coordination',
  '20ft, 40ft, and 45ft container capability',
  'Dry van and high cube container support',
  'Real-time cargo tracking',
  'Flexible delivery scheduling',
  'Complete inland logistics management',
];

const Transport = () => {
  usePageTitle('Container Transport');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">

      <PageHero
        badge="Container Transport & Haulage"
        title="Full-Scale Container Haulage"
        highlight="Solutions"
        description="From port terminals to your doorstep with Winz Logistics."
      />

      {/* ── INTRO ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeLeft}>
              <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
                Our Approach
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Bridging Customs Clearance & Final Delivery
              </h2>
              <p className="text-gray-600 leading-relaxed mb-5 text-lg">
                At Winz Logistics, we bridge the gap between customs clearance and final delivery. We specialise in coordinating professional container trucking services for all equipment sizes — ensuring your cargo moves swiftly from the port to its final destination.
              </p>
              <p className="text-gray-600 leading-relaxed text-lg">
                Once your shipment clears customs, our logistics team manages the entire haulage process. Whether you are handling standard dry vans, high cubes, or specialised containers, Winz Logistics guarantees a seamless transition from the quay to your specified address.
              </p>
            </motion.div>

            {/* Container size cards */}
            <motion.div
              initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeRight}
              className="flex flex-col gap-5"
            >
              {containerSizes.map((c, i) => (
                <motion.div
                  key={c.size}
                  initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                  transition={{ delay: i * 0.1 }}
                className="flex items-center gap-6 bg-gray-50 rounded-2xl p-6 border border-gray-100 hover:border-primary-200 hover:shadow-md transition-all"
                >
                  <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                    <Container className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <p className="text-2xl font-extrabold text-primary-600 mb-1">{c.size}</p>
                    <p className="text-gray-500 text-sm">{c.desc}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
            className="text-center mb-16"
          >
            <span className="inline-block py-1 px-4 rounded-full bg-primary-50 text-primary-600 border border-primary-200 text-sm font-semibold tracking-wide mb-4">
              What We Offer
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              End-to-End Inland Logistics
            </h2>
            <div className="w-20 h-1 bg-primary-500 mx-auto rounded-full" />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}
                transition={{ delay: i * 0.07 }}
                className="group p-8 rounded-2xl border border-gray-100 hover:border-primary-200 hover:shadow-xl hover:shadow-primary-500/10 transition-all bg-white"
              >
                <div className="w-12 h-12 bg-primary-50 group-hover:bg-primary-500 rounded-xl flex items-center justify-center mb-5 transition-colors duration-300">
                  <div className="[&>svg]:group-hover:text-white transition-colors duration-300">
                    {f.icon}
                  </div>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
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
              A Complete Transport Solution
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
            With Reliable Transport & Precise Scheduling
          </h2>
          <p className="text-primary-100 text-lg max-w-2xl mx-auto">
            We take the complexity out of inland logistics, providing you with a complete, end-to-end solution from port clearance to final delivery.
          </p>
        </motion.div>
      </section>

    </div>
  );
};

export default Transport;
