import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { MapPin, ExternalLink } from 'lucide-react';
import EuropeRouteMap from '../logistics/EuropeRouteMap';
import { fadeUp } from '../logistics/motionVariants';

const MAP_EMBED_URL =
  'https://www.openstreetmap.org/export/embed.html?bbox=4.01%2C50.95%2C4.08%2C51.00&layer=mapnik&marker=51.067%2C4.04';

const MAP_LINK =
  'https://www.google.com/maps/search/?api=1&query=Gentsesteenweg+102,+9240+Zele,+Belgium';

const ContactMap = () => {
  const { t } = useTranslation('contact');

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeUp}
      className="relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-50"
      aria-labelledby="contact-map-heading"
    >
      <EuropeRouteMap className="absolute inset-0 w-full h-full text-primary-400/20 opacity-50 pointer-events-none" />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-3">
        <div className="p-6 md:p-8 lg:col-span-1 flex flex-col justify-center border-b lg:border-b-0 lg:border-r border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <MapPin className="w-5 h-5 text-primary-500" aria-hidden="true" />
            <span className="text-sm font-semibold uppercase tracking-wide text-slate-600">
              {t('map.badge')}
            </span>
          </div>
          <h2 id="contact-map-heading" className="text-xl font-bold text-slate-900 mb-3">
            {t('map.title')}
          </h2>
          <p className="text-slate-600 text-sm leading-relaxed mb-4">
            {t('info.addressValue')}
          </p>
          <a
            href={MAP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
          >
            {t('map.directions')}
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>

        <div className="lg:col-span-2 min-h-[280px] md:min-h-[320px] bg-slate-100">
          <iframe
            title={t('map.iframeTitle')}
            src={MAP_EMBED_URL}
            className="w-full h-full min-h-[280px] md:min-h-[320px] border-0 grayscale-[20%] contrast-[1.05]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
      </div>
    </motion.section>
  );
};

export default ContactMap;
