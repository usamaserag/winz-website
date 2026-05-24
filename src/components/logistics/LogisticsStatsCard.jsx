import { motion } from 'framer-motion';
import { fadeUp } from './motionVariants';

/**
 * Static hero-side card for service pages (replaces floating/rotating decor).
 */
const LogisticsStatsCard = ({
  icon: Icon,
  headline,
  subline,
  className = '',
}) => (
  <motion.div
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.55, delay: 0.15 }}
    className={`relative ${className}`}
  >
    <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/50">
      <div className="absolute -top-px left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary-400 to-transparent" />
      <div className="w-16 h-16 rounded-xl bg-primary-50 flex items-center justify-center mb-5 border border-primary-100">
        <Icon className="w-8 h-8 text-primary-600" />
      </div>
      <p className="text-3xl font-bold text-navy-900 mb-1">{headline}</p>
      <p className="text-slate-600 font-medium">{subline}</p>
      <div className="mt-6 pt-6 border-t border-slate-100">
        <div className="flex gap-2">
          {[72, 88, 64].map((w, i) => (
            <div
              key={i}
              className="h-1.5 rounded-full bg-primary-200 flex-1 overflow-hidden"
            >
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${w}%` }}
                transition={{ duration: 0.8, delay: 0.4 + i * 0.1 }}
                className="h-full rounded-full bg-primary-500"
              />
            </div>
          ))}
        </div>
        <p className="text-xs text-slate-500 mt-2">Shipment flow efficiency</p>
      </div>
    </div>
  </motion.div>
);

export default LogisticsStatsCard;
