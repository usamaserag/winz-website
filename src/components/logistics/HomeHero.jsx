import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Truck, MapPin, ShieldCheck } from 'lucide-react';
import LogisticsGridPattern from './LogisticsGridPattern';
import EuropeRouteMap from './EuropeRouteMap';
import { fadeUp, fadeRight, staggerContainer } from './motionVariants';

const HomeHero = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
    <LogisticsGridPattern variant="dark" />
    <EuropeRouteMap className="absolute right-0 top-1/2 -translate-y-1/2 w-[min(100%,900px)] h-auto opacity-30 hidden lg:block" />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28 lg:py-32">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="text-center lg:text-left"
        >
          <motion.span
            variants={fadeUp}
            className="inline-block py-1.5 px-4 rounded-full bg-primary-500/15 text-primary-200 border border-primary-400/25 text-xs font-semibold tracking-widest mb-6 uppercase"
          >
            European Logistics & Customs
          </motion.span>

          <motion.h1
            variants={fadeUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
          >
            Trusted partner for{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
              cross-border cargo
            </span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            className="text-lg md:text-xl text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-8"
          >
            14 years of customs clearance, container transport, and warehousing
            across Europe — built for speed, compliance, and reliability.
          </motion.p>

          <motion.div
            variants={fadeUp}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
          >
            <Link
              to="/contact"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-900"
            >
              Get a Quote
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/20 bg-white/5 px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-400"
            >
              Our Services
            </Link>
          </motion.div>
        </motion.div>

        <motion.div
          variants={fadeRight}
          initial="hidden"
          animate="visible"
          className="relative hidden lg:block"
        >
          <div className="relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 shadow-xl">
            <EuropeRouteMap className="w-full h-48 text-primary-400/60 mb-6" />
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: 'Inland haulage', value: 'EU-wide' },
                { icon: MapPin, label: 'Port coverage', value: 'All major' },
                { icon: ShieldCheck, label: 'Compliance', value: '100% EU' },
              ].map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="rounded-xl border border-white/10 bg-navy-950/50 p-4 text-center"
                >
                  <Icon className="w-5 h-5 text-primary-400 mx-auto mb-2" />
                  <p className="text-xs text-slate-400">{label}</p>
                  <p className="text-sm font-semibold text-white mt-0.5">{value}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default HomeHero;
