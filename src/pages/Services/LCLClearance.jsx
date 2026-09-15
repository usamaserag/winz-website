import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function LCLClearance() {
  const { t } = useTranslation(['lcl', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title', { defaultValue: 'LCL Customs Clearance Belgium | Winz' });
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/lcl-customs-clearance`;

  // Dynamic FAQ Schema Generation
  const questions = t('faq.questions', { returnObjects: true }) || [];
  const faqSchema = questions.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": questions.map(q => ({
      "@type": "Question",
      "name": q.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": q.a
      }
    }))
  } : null;

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <SEOMeta meta={{
        title,
        description,
        keywords: t('meta.keywords'),
        canonical: canonicalUrl,
        ogTitle: title,
        ogDescription: description,
        ogType: 'article',
        faqSchema
      }} />

      <PageHeroShell 
        title={t('hero.title')}
        description={t('hero.subtitle')}
        size="large"
      />
      
      <main className="flex-1 w-full relative z-10 py-16 lg:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Intro */}
        <section className="prose prose-slate prose-lg max-w-none bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <p>
            <Trans i18nKey="intro.p1" t={t}>
              See <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link> for the full scope of Winz customs services.
            </Trans>
          </p>
          <p>{t('intro.p2')}</p>
          <p>{t('intro.p3')}</p>
          <p>
            <Trans i18nKey="intro.p4" t={t}>
              Winz supports importers, exporters, freight forwarders, and logistics companies with <Link to="/services" className="text-primary-600 hover:underline">customs declaration for imports</Link>, document review, IDMS declaration preparation, CN classification, duty calculations, customs controls, and cargo release coordination.
            </Trans>
          </p>
        </section>

        {/* How LCL Clearance Works */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('howItWorks.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('howItWorks.intro')}</p>
          <p className="text-lg text-slate-600 mb-4">{t('howItWorks.p2')}</p>
          <p className="text-lg text-slate-600 mb-4">{t('howItWorks.p3')}</p>
          <p className="text-lg text-slate-600 mb-6">{t('howItWorks.p4')}</p>
          
          <h3 className="text-xl font-bold text-navy-900 mb-4">{t('howItWorks.processTitle')}</h3>
          <ol className="list-decimal pl-6 space-y-4 text-slate-600 mb-6">
            {(t('howItWorks.steps', { returnObjects: true }) || []).map((step, i) => (
              <li key={i}>
                <Trans i18nKey={`howItWorks.steps.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ol>
        </section>

        {/* Info Grid (Roles, Documents) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('roles.title')}</h2>
            <p className="text-slate-600 mb-4">{t('roles.text')}</p>
            <p className="text-slate-600 mb-4">{t('roles.p2')}</p>
            <p className="text-slate-600 mt-auto">{t('roles.outro')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('documents.title')}</h2>
            <p className="text-slate-600 mb-4">{t('documents.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('documents.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>
                  <Trans i18nKey={`documents.list.${i}`} t={t}>
                    <strong className="font-semibold text-navy-900">label</strong> text <Link to="/services" className="text-primary-600 hover:underline">link</Link>
                  </Trans>
                </li>
              ))}
            </ul>
            <div className="space-y-4 mt-auto">
              {(t('documents.post', { returnObjects: true }) || []).map((item, i) => (
                <p key={i} className="text-slate-600">{item}</p>
              ))}
            </div>
          </section>

          {/* Filing & Arrival */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('filing.title')}</h2>
            <p className="text-slate-600 mb-4">{t('filing.text')}</p>
            <p className="text-slate-600 mb-4">{t('filing.p2')}</p>
            <p className="text-slate-600 mt-auto">{t('filing.outro')}</p>
          </section>

          {/* CFS Deconsolidation */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('cfs.title')}</h2>
            <p className="text-slate-600 mb-4">{t('cfs.text')}</p>
            <p className="text-slate-600 mb-4">{t('cfs.p2')}</p>
            <p className="text-slate-600 mb-6">
              <Trans i18nKey="cfs.p3" t={t}>
                text <Link to="/services" className="text-primary-600 hover:underline">link</Link>
              </Trans>
            </p>
            <p className="font-semibold text-navy-900 mb-3">{t('cfs.eventsTitle')}</p>
            <ul className="list-decimal pl-6 space-y-2 text-slate-600 mb-6">
              {(t('cfs.events', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mb-4">{t('cfs.outro')}</p>
            <p className="text-slate-600 font-medium mt-auto">
              <Trans i18nKey="cfs.link" t={t}>
                For a full comparison... <Link to="/fcl-customs-clearance" className="text-primary-600 hover:underline">FCL versus LCL EU imports</Link>
              </Trans>
            </p>
          </section>
        </div>

        {/* Duty and VAT */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('costs.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('costs.intro')}</p>
          <p className="text-lg text-slate-600 mb-4">{t('costs.p2')}</p>
          <p className="text-lg text-slate-600 mb-6">{t('costs.p3')}</p>
          
          <h3 className="text-xl font-bold text-navy-900 mb-4">{t('costs.listTitle')}</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
            {(t('costs.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>

          <div className="space-y-4 mb-6">
            {(t('costs.post', { returnObjects: true }) || []).map((item, i) => (
              <p key={i} className="text-slate-600">{item}</p>
            ))}
          </div>

          <p className="text-slate-600 font-medium">
            <Trans i18nKey="costs.outro" t={t}>
              Full cost breakdown: <Link to="/contact" className="text-primary-600 hover:underline">LCL customs clearance costs</Link> — Duty methodology: <Link to="/contact" className="text-primary-600 hover:underline">import duty per consignee LCL</Link>.
            </Trans>
          </p>
        </section>

        {/* CN Codes and Compliance Risks */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('cnCodes.title')}</h2>
            <p className="text-slate-600 mb-6">{t('cnCodes.text')}</p>
            
            <p className="font-semibold text-navy-900 mb-3">{t('cnCodes.listTitle')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('cnCodes.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <div className="space-y-4 mt-auto">
              {(t('cnCodes.post', { returnObjects: true }) || []).map((item, i) => (
                <p key={i} className="text-slate-600">{item}</p>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('ics2.title')}</h2>
            <p className="text-slate-600 mb-4">{t('ics2.text')}</p>
            <p className="text-slate-600 mb-4">{t('ics2.p2')}</p>
            <p className="text-slate-600 mt-auto">{t('ics2.outro')}</p>
          </section>
        </div>

        {/* How Winz Handles LCL */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('howWinzHandles.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('howWinzHandles.text')}</p>
          
          <h3 className="text-xl font-bold text-navy-900 mb-4">{t('howWinzHandles.listTitle')}</h3>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
            {(t('howWinzHandles.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          
          <p className="text-slate-600 mb-4">
            <Trans i18nKey="howWinzHandles.outro" t={t}>
              Winz can coordinate customs release information with the importer's appointed carrier. After customs release is confirmed, <Link to="/contact" className="text-primary-600 hover:underline">container delivery Belgium</Link> moves the individual consignment to its final destination.
            </Trans>
          </p>
          <p className="text-slate-600 font-medium">{t('howWinzHandles.postOutro')}</p>
        </section>

        {/* CTA */}
        <div className="bg-navy-900 rounded-3xl text-white overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-blue-100 mb-4">{t('cta.text')}</p>
            <p className="text-blue-200/80 mb-8">{t('cta.subtext')}</p>
            <Link to="/contact" className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-500/25">
              {t('cta.button')}
            </Link>
          </div>
        </div>

        {/* FAQs */}
        {questions.length > 0 && (
          <section className="py-8">
            <h2 className="text-3xl font-bold text-navy-900 mb-8 text-center">{t('faq.title')}</h2>
            <div className="space-y-4 max-w-3xl mx-auto">
              {questions.map((q, i) => (
                <div key={i} className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                  <h3 className="text-lg font-bold text-navy-900 mb-3">{q.q}</h3>
                  <p className="text-slate-600 leading-relaxed">{q.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
}
