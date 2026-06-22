import { Link } from '../../components/routing';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ArrowRight, Package, HelpCircle, ShieldCheck } from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import PageHero from '../../components/logistics/PageHero';
import SectionBadge from '../../components/logistics/SectionBadge';
import ContactInfoCards from '../../components/contact/ContactInfoCards';
import ContactForm from '../../components/contact/ContactForm';
import ContactMap from '../../components/contact/ContactMap';
import { fadeUp } from '../../components/logistics/motionVariants';

const SUPPORT_POINTS = [
  { icon: Package, key: 'shipment' },
  { icon: ShieldCheck, key: 'compliance' },
  { icon: HelpCircle, key: 'support' },
];

const MINI_FAQ_KEYS = ['customs', 'quote', 'response'];

const Contact = () => {
  const { t } = useTranslation(['contact', 'common']);
  usePageTitle(t('contact:metaTitle'));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col"
    >
      <PageHero
        size="medium"
        badge={t('contact:hero.badge')}
        title={t('contact:hero.title')}
        highlight={t('contact:hero.highlight')}
        description={t('contact:hero.description')}
      />

      <section className="py-16 md:py-20 bg-slate-50 border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center max-w-2xl mx-auto mb-12"
          >
            <SectionBadge label={t('contact:info.sectionBadge')} />
            <h2 className="text-3xl font-bold text-navy-900 mb-3">
              {t('contact:info.heading')}
            </h2>
            <p className="text-slate-600">{t('contact:info.subheading')}</p>
          </motion.div>
          <ContactInfoCards />
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
            <div className="lg:col-span-2">
              <ContactForm />
            </div>

            <motion.aside
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
              className="space-y-6"
            >
              <div className="rounded-2xl border border-primary-200 bg-primary-50 p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-2">
                  {t('contact:sidebar.inquiryTitle')}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {t('contact:sidebar.inquiryText')}
                </p>
                <a
                  href={`tel:${t('contact:info.phoneValue').replace(/\s/g, '')}`}
                  className="text-sm font-semibold text-primary-600 hover:text-primary-700"
                >
                  {t('contact:sidebar.callNow')}
                </a>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
                <h3 className="text-lg font-bold text-navy-900 mb-4">
                  {t('contact:sidebar.supportTitle')}
                </h3>
                <ul className="space-y-4">
                  {SUPPORT_POINTS.map(({ icon: Icon, key }) => (
                    <li key={key} className="flex gap-3">
                      <div className="w-9 h-9 rounded-lg bg-white border border-slate-200 flex items-center justify-center shrink-0">
                        <Icon className="w-4 h-4 text-primary-600" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-navy-900">
                          {t(`contact:sidebar.support.${key}.title`)}
                        </p>
                        <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">
                          {t(`contact:sidebar.support.${key}.desc`)}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.aside>
          </div>
        </div>
      </section>

      {/* <section className="py-16 md:py-20 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ContactMap />
        </div>
      </section> */}

      <section className="py-16 md:py-20 bg-white border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mb-10"
          >
            <SectionBadge label={t('contact:faq.badge')} />
            <h2 className="text-2xl md:text-3xl font-bold text-navy-900 mb-3">
              {t('contact:faq.heading')}
            </h2>
            <p className="text-slate-600">{t('contact:faq.subheading')}</p>
          </motion.div>

          <div className="space-y-3">
            {MINI_FAQ_KEYS.map((key, i) => (
              <motion.div
                key={key}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeUp}
                transition={{ delay: i * 0.06 }}
                className="rounded-xl border border-slate-200 bg-slate-50 px-5 py-4"
              >
                <h3 className="text-sm font-semibold text-navy-900 mb-1">
                  {t(`contact:faq.items.${key}.q`)}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {t(`contact:faq.items.${key}.a`)}
                </p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            className="text-center mt-8"
          >
            <Link
              to="/faq"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors"
            >
              {t('contact:faq.viewAll')}
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
