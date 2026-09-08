import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Clock, MapPin, Truck, ShieldCheck, Globe, UserCheck } from 'lucide-react';
import { fadeUp } from '../logistics/motionVariants';

const BrandSignals = () => {
  const { t } = useTranslation('commercial');

  const signals = [
    { icon: Clock, label: t('brandSignals.expertise') },
    { icon: MapPin, label: t('brandSignals.portCoverage') },
    { icon: Truck, label: t('brandSignals.inlandHaulage') },
    { icon: ShieldCheck, label: t('brandSignals.compliance') },
    { icon: Globe, label: t('brandSignals.countries') },
    { icon: UserCheck, label: t('brandSignals.customs') },
  ];

  return (
    <section className="bg-white py-12 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {signals.map((signal, index) => {
            const Icon = signal.icon;
            return (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: index * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                <div className="w-12 h-12 rounded-full bg-slate-50 flex items-center justify-center text-primary-500 mb-3 group-hover:bg-primary-50 transition-colors">
                  <Icon className="w-6 h-6" />
                </div>
                <span className="text-sm font-semibold text-navy-900 leading-snug">
                  {signal.label}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrandSignals;
