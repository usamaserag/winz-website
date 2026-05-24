import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { fadeUp, staggerContainer } from '../logistics/motionVariants';

const CONTACT_ITEMS = [
  { key: 'email', icon: Mail, href: (v) => `mailto:${v}` },
  { key: 'phone', icon: Phone, href: (v) => `tel:${v.replace(/\s/g, '')}` },
  { key: 'address', icon: MapPin },
  { key: 'hours', icon: Clock },
];

const ContactInfoCards = () => {
  const { t } = useTranslation('contact');

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
    >
      {CONTACT_ITEMS.map(({ key, icon: Icon, href }) => {
        const value = t(`info.${key}Value`);
        const cardClass =
          'h-full rounded-xl border border-slate-200 bg-white p-6 shadow-sm hover:border-primary-200 hover:shadow-md transition-all block';

        const inner = (
          <>
            <div className="w-12 h-12 rounded-xl bg-primary-50 border border-primary-100 flex items-center justify-center mb-4">
              <Icon className="w-6 h-6 text-primary-600" aria-hidden="true" />
            </div>
            <h3 className="text-sm font-semibold text-navy-900 mb-2">
              {t(`info.${key}Label`)}
            </h3>
            <p
              className={`text-sm text-slate-600 leading-relaxed whitespace-pre-line ${key === 'phone' ? 'dir-ltr' : ''}`}
            >
              {value}
            </p>
          </>
        );

        if (href) {
          return (
            <motion.a
              key={key}
              variants={fadeUp}
              href={href(value)}
              className={`${cardClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-500`}
            >
              {inner}
            </motion.a>
          );
        }

        return (
          <motion.article key={key} variants={fadeUp} className={cardClass}>
            {inner}
          </motion.article>
        );
      })}
    </motion.div>
  );
};

export default ContactInfoCards;
