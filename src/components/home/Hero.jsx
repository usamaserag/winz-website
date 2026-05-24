import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck, Truck } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import LogisticsGridPattern from '../logistics/LogisticsGridPattern';
import { fadeUp, staggerContainer } from '../logistics/motionVariants';

const trustPoints = [
  { icon: ShieldCheck, label: 'EU customs compliant' },
  { icon: Truck, label: 'Pan-European network' },
];

const Hero = () => {
  usePageTitle('');

  return (
  <section className="relative min-h-[95vh] flex items-center overflow-hidden bg-gradient-to-br from-navy-950 via-navy-900 to-navy-800">
    <LogisticsGridPattern variant="dark" />

    <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-28">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-3xl"
      >
        <motion.span
          variants={fadeUp}
          className="inline-block py-1.5 px-4 rounded-full bg-primary-500/15 text-primary-200 border border-primary-400/25 text-xs font-semibold tracking-widest mb-6 uppercase"
        >
          Winz Logistics
        </motion.span>

        <motion.h1
          variants={fadeUp}
          className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1] mb-6"
        >
          Professional logistics for{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-300 to-primary-500">
            European trade
          </span>
        </motion.h1>

        <motion.p
          variants={fadeUp}
          className="text-lg md:text-xl text-slate-300 leading-relaxed mb-8 max-w-2xl"
        >
          Customs clearance, inland transport, and warehousing — delivered with
          the speed and reliability your supply chain demands.
        </motion.p>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-lg bg-primary-500 px-6 py-3 text-sm font-semibold text-white hover:bg-primary-600 transition-colors"
          >
            Get Started
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            to="/services"
            className="inline-flex items-center gap-2 rounded-lg border border-white/20 px-6 py-3 text-sm font-semibold text-white hover:bg-white/10 transition-colors"
          >
            View Services
          </Link>
        </motion.div>

        <motion.div variants={fadeUp} className="flex flex-wrap gap-6">
          {trustPoints.map(({ icon: Icon, label }) => (
            <div key={label} className="flex items-center gap-2 text-sm text-slate-300">
              <Icon className="w-4 h-4 text-primary-400" />
              {label}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </motion.div>
  </section>
  );
};

export default Hero;
