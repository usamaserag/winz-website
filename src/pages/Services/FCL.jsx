import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function FCL() {
  const { t } = useTranslation(['fcl', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title', { defaultValue: 'Full Container Load Customs Clearance Belgium | Winz' });
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/fcl-customs-clearance`;

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
              See <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link> for Winz’s customs services.
            </Trans>
          </p>
          <p>{t('intro.p2')}</p>
          <p>{t('intro.p3')}</p>
          <p>{t('intro.p4')}</p>
        </section>

        {/* How FCL Clearance Works */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('howItWorks.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('howItWorks.intro')}</p>
          <ol className="list-decimal pl-6 space-y-4 text-slate-600 mb-6">
            {(t('howItWorks.steps', { returnObjects: true }) || []).map((step, i) => (
              <li key={i}>
                <Trans i18nKey={`howItWorks.steps.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ol>
          <p className="text-slate-600">{t('howItWorks.outro')}</p>
        </section>

        {/* Info Grid (Coverage, Importer Resp, Documents, Classification) */}
        <div className="grid md:grid-cols-2 gap-8">
          
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('coverage.title')}</h2>
            <p className="text-slate-600 mb-4">{t('coverage.intro')}</p>
            <p className="text-slate-600 mb-4">{t('coverage.p2')}</p>
            <p className="font-semibold text-navy-900 mb-3">{t('coverage.subtitle')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('coverage.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">{t('coverage.outro')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('importerResp.title')}</h2>
            <p className="text-slate-600 mb-4">{t('importerResp.text')}</p>
            <p className="text-slate-600 mb-4">{t('importerResp.p2')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('importerResp.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>
                  <Trans i18nKey={`importerResp.list.${i}`} t={t}>
                    <strong className="font-semibold text-navy-900">label</strong> text
                  </Trans>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">{t('importerResp.outro')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:col-span-2">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('documents.title')}</h2>
            <p className="text-slate-600 mb-6">{t('documents.intro')}</p>
            
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-y border-slate-200">
                    <th className="py-4 px-6 font-semibold text-navy-900">Document or Data</th>
                    <th className="py-4 px-6 font-semibold text-navy-900">Customs Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(t('documents.table', { returnObjects: true }) || []).map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-4 px-6 font-medium text-slate-900">{row.doc}</td>
                      <td className="py-4 px-6 text-slate-600">{row.purpose}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="space-y-4">
              {(t('documents.post', { returnObjects: true }) || []).map((item, i) => (
                <p key={i} className="text-slate-600">
                  <Trans i18nKey={`documents.post.${i}`} t={t}>
                    text <Link to="/services" className="text-primary-600 hover:underline">link</Link>
                  </Trans>
                </p>
              ))}
            </div>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:col-span-2">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('classification.title')}</h2>
            <p className="text-slate-600 mb-4">{t('classification.intro')}</p>
            <p className="font-semibold text-navy-900 mb-3">{t('classification.subtitle')}</p>
            
            <div className="grid sm:grid-cols-2 gap-4 mb-6">
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {(t('classification.list', { returnObjects: true }) || []).slice(0, 4).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <ul className="list-disc pl-6 space-y-2 text-slate-600">
                {(t('classification.list', { returnObjects: true }) || []).slice(4).map((item, i) => (
                  <li key={i + 4}>{item}</li>
                ))}
              </ul>
            </div>
            
            <p className="text-slate-600 mb-4">{t('classification.post')}</p>
            <p className="text-slate-600 italic">{t('classification.bti')}</p>
          </section>
        </div>

        {/* Antwerp Container Release */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('release.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('release.intro')}</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Release Condition</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">What It Confirms</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('release.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.condition}</td>
                    <td className="py-4 px-6 text-slate-600">{row.confirms}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 mb-4">{t('release.post1')}</p>
          <p className="text-slate-600 mb-8">
            <Trans i18nKey="release.post2" t={t}>
              PN/TS handles... <Link to="/road-freight-customs-clearance" className="text-primary-600 hover:underline">haulage from Antwerp</Link>...
            </Trans>
          </p>

          <p className="font-semibold text-navy-900 mb-4">{t('release.blockedTitle')}</p>
          <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-6">
            {(t('release.blockedList', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>
          <p className="text-slate-600 font-medium">
            <Trans i18nKey="release.outro" t={t}>
              Winz monitors... <Link to="/contact" className="text-primary-600 hover:underline">container release Belgium customs</Link>
            </Trans>
          </p>
        </section>

        {/* Duty and VAT */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('dutyVAT.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('dutyVAT.intro')}</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Duty Element</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Calculation Basis</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('dutyVAT.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.element}</td>
                    <td className="py-4 px-6 text-slate-600">{row.basis}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 mb-4">{t('dutyVAT.outro')}</p>
          <p className="text-slate-600 font-medium">
            <Trans i18nKey="dutyVAT.link" t={t}>
              The complete calculation... <Link to="/contact" className="text-primary-600 hover:underline">import duty FCL shipments</Link>.
            </Trans>
          </p>
        </section>
        
        {/* Incoterms */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('incoterms.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('incoterms.text')}</p>
          <div className="space-y-4 mb-6">
            {(t('incoterms.details', { returnObjects: true }) || []).map((item, i) => (
              <p key={i} className="text-slate-600">
                <Trans i18nKey={`incoterms.details.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </p>
            ))}
          </div>
          <p className="text-slate-600 font-medium">{t('incoterms.outro')}</p>
        </section>

        {/* Info Grid (Reefer, Rotterdam, How Winz Supports) */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.reefer.title')}</h2>
            <p className="text-slate-600 mb-4">{t('sections.reefer.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('sections.reefer.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">
              <Trans i18nKey="sections.reefer.outro" t={t}>
                text... <Link to="/contact" className="text-primary-600 hover:underline">link</Link>
              </Trans>
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.rotterdam.title')}</h2>
            <p className="text-slate-600 mb-4">{t('sections.rotterdam.text')}</p>
            <p className="font-semibold text-navy-900 mb-3">{t('sections.rotterdam.subtitle')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('sections.rotterdam.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">{t('sections.rotterdam.outro')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:col-span-2">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.howWinzSupports.title')}</h2>
            <p className="text-slate-600 mb-4">{t('sections.howWinzSupports.text')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('sections.howWinzSupports.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600">{t('sections.howWinzSupports.outro')}</p>
          </section>
        </div>

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
