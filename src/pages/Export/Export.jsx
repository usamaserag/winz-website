import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  PackageOpen, CheckCircle2, AlertTriangle, ListChecks, ArrowUpToLine
} from 'lucide-react';
import usePageTitle from '../../hooks/usePageTitle';
import LogisticsGridPattern from '../../components/logistics/LogisticsGridPattern';
import LogisticsStatsCard from '../../components/logistics/LogisticsStatsCard';
import SectionBadge from '../../components/logistics/SectionBadge';
import { fadeUp, staggerContainer } from '../../components/logistics/motionVariants';

const Export = () => {
  const { t } = useTranslation('export');
  usePageTitle(t('meta.title'));

  const stages = t('process.stages', { returnObjects: true });
  const documents = t('documents.items', { returnObjects: true });
  const delays = t('sections.delays.items', { returnObjects: true });
  const costFactors = t('sections.cost_factors.items', { returnObjects: true });
  const benefits = t('benefits.items', { returnObjects: true });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35 }}
      className="flex flex-col min-h-screen bg-slate-50 overflow-x-hidden"
    >
      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-white border-b border-slate-200">
        <LogisticsGridPattern variant="light" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="max-w-2xl">
              <motion.div variants={fadeUp} className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-50 text-primary-700 font-medium text-sm mb-6 border border-primary-100">
                <ArrowUpToLine size={16} />
                <span>{t('hero.badge')}</span>
              </motion.div>
              <motion.h1 variants={fadeUp} className="text-4xl lg:text-5xl font-bold text-navy-900 tracking-tight leading-[1.15] mb-6">
                {t('hero.title')}{' '}
                <span className="text-primary-600">{t('hero.highlight')}</span>
              </motion.h1>
              <motion.p variants={fadeUp} className="text-xl text-slate-600 mb-6 leading-relaxed">
                {t('hero.description')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-slate-500 mb-6 leading-relaxed">
                {t('hero.intro1')}
              </motion.p>
              <motion.p variants={fadeUp} className="text-lg text-slate-500 mb-8 leading-relaxed">
                {t('hero.intro2')}
              </motion.p>
            </motion.div>
            <div className="hidden lg:block">
              <LogisticsStatsCard
                icon={PackageOpen}
                headline={t('hero.stats.headline')}
                subline={t('hero.stats.subline')}
                footerLabel={t('hero.stats.footerLabel')}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-navy-950 text-white relative">
        <LogisticsGridPattern variant="dark" className="opacity-40" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center max-w-4xl mx-auto mb-16">
            <SectionBadge label={t('process.badge')} variant="dark" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('process.title')}</h2>
            <p className="text-slate-400 text-lg mb-8">{t('process.description')}</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {Array.isArray(stages) && stages.map((stage, index) => (
              <motion.div
                key={index}
                variants={fadeUp}
                className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-colors"
              >
                <h3 className="font-bold text-lg mb-2 text-primary-400">{stage.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed">{stage.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Documents Table */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="text-center mb-16">
            <SectionBadge label={t('documents.badge')} />
            <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('documents.title')}</h2>
            <p className="text-slate-600 text-lg max-w-3xl mx-auto mb-8">{t('documents.description')}</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-100 border-b border-slate-200">
                    <th className="py-4 px-6 font-semibold text-navy-900">{t('documents.headers.0')}</th>
                    <th className="py-4 px-6 font-semibold text-navy-900">{t('documents.headers.1')}</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.isArray(documents) && documents.map((doc, index) => (
                    <tr key={index} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 text-navy-800 font-medium">{doc.doc}</td>
                      <td className="py-4 px-6 text-slate-600">{doc.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200 text-sm text-slate-500">
              <p><strong>Note:</strong> {t('documents.note')}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Detail Sections Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.document_checks.title')}</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t('sections.document_checks.p1')}</p>
                <p>{t('sections.document_checks.p2')}</p>
                <p>{t('sections.document_checks.p3')}</p>
                <p className="font-medium text-navy-800">{t('sections.document_checks.p4')}</p>
              </div>
            </motion.div>
            
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.direct_indirect.title')}</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t('sections.direct_indirect.p1')}</p>
                <p>{t('sections.direct_indirect.p2')}</p>
                <p>{t('sections.direct_indirect.p3')}</p>
                <p className="text-amber-700 font-medium bg-amber-50 p-3 rounded-lg border border-amber-200">{t('sections.direct_indirect.p4')}</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.definitions.title')}</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t('sections.definitions.p1')}</p>
                <p>{t('sections.definitions.p2')}</p>
                <p>{t('sections.definitions.p3')}</p>
                <p>{t('sections.definitions.p4')}</p>
                <p className="font-medium text-navy-800">{t('sections.definitions.p5')}</p>
              </div>
            </motion.div>

            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.exporter_purposes.title')}</h3>
              <div className="space-y-4 text-slate-600 leading-relaxed">
                <p>{t('sections.exporter_purposes.p1')}</p>
                <p>{t('sections.exporter_purposes.p2')}</p>
                <p>{t('sections.exporter_purposes.p3')}</p>
                <p>{t('sections.exporter_purposes.p4')}</p>
                <p className="font-medium text-navy-800">{t('sections.exporter_purposes.p5')}</p>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Delays & Costs Section */}
      <section className="py-24 bg-slate-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            
            {/* Common Delays */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <AlertTriangle className="text-amber-500 w-6 h-6" />
                {t('sections.delays.title')}
              </h3>
              <p className="text-slate-600 mb-4">{t('sections.delays.p1')}</p>
              <p className="text-navy-900 font-medium mb-4">{t('sections.delays.listIntro')}</p>
              <ul className="space-y-3">
                {Array.isArray(delays) && delays.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Cost Factors */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
              <h3 className="text-2xl font-bold text-navy-900 mb-4 flex items-center gap-2">
                <ListChecks className="text-primary-500 w-6 h-6" />
                {t('sections.cost_factors.title')}
              </h3>
              <p className="text-slate-600 mb-6">{t('sections.cost_factors.p1')}</p>
              <ul className="space-y-3 mb-6">
                {Array.isArray(costFactors) && costFactors.map((item, index) => (
                  <li key={index} className="flex items-start gap-3 bg-white p-3 rounded border border-slate-200 shadow-sm">
                    <CheckCircle2 className="w-5 h-5 text-primary-500 shrink-0 mt-0.5" />
                    <span className="text-slate-700 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-navy-800 font-medium bg-primary-50 p-4 rounded-lg border border-primary-100">
                {t('sections.cost_factors.p2')}
              </p>
            </motion.div>

          </div>
        </div>
      </section>

      {/* Why Choose Winz List */}
      <section className="py-24 bg-white">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeUp}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <SectionBadge label={t('benefits.badge')} />
            <h2 className="text-3xl font-bold text-navy-900 mb-4">{t('benefits.title')}</h2>
            <p className="text-slate-600 text-lg max-w-2xl mx-auto mb-4">{t('benefits.description')}</p>
            <p className="text-navy-800 font-medium">{t('benefits.intro')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto mb-8">
            {Array.isArray(benefits) &&
              benefits.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-4 rounded-lg bg-slate-50 border border-slate-200">
                  <CheckCircle2 className="w-5 h-5 text-primary-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{item}</span>
                </div>
              ))}
          </div>
          <p className="text-center text-slate-600 italic max-w-2xl mx-auto">{t('benefits.footer')}</p>
        </motion.div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-navy-900 text-white text-center">
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp} className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-slate-300 text-lg mb-8">{t('cta.description')}</p>
          
          <p className="text-white font-medium mb-10 text-xl max-w-3xl mx-auto">{t('cta.contact')}</p>

          <a href="/contact" className="inline-block bg-primary-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-primary-500 transition-colors shadow-lg hover:shadow-xl">
            Request Quote
          </a>
        </motion.div>
      </section>
    </motion.div>
  );
};

export default Export;
