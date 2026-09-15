import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function PortRotterdam() {
  const { t } = useTranslation(['portRotterdam', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title');
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/customs-clearance-rotterdam-port`;

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
          <p>{t('intro.p4')}</p>
          <p>
            <Trans i18nKey="intro.p5" t={t}>
              Winz coordinates... <Link to="/import" className="text-primary-600 hover:underline">import clearance and duty service</Link> and <Link to="/transit" className="text-primary-600 hover:underline">customs transit</Link>...
            </Trans>
          </p>
        </section>

        {/* DMS and Portbase Process */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('process.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('process.intro')}</p>
          
          <div className="mb-6">
            <h3 className="font-semibold text-navy-900 mb-3">{t('process.customsMay.title')}</h3>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              {(t('process.customsMay.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <p className="text-slate-600 mb-6">{t('process.portbase')}</p>

          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Stage</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Main Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('process.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.stage}</td>
                    <td className="py-4 px-6 text-slate-600">{row.action}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600">
            <Trans i18nKey="process.outro" t={t}>
              Customs release does not always... <Link to="/faq" className="text-primary-600 hover:underline">how long customs clearance takes Rotterdam</Link>.
            </Trans>
          </p>
        </section>

        {/* Rotterdam-to-Belgium Customs Routes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('routes.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('routes.intro')}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('routes.t1.title')}</h3>
              <p className="text-slate-600 mb-4">{t('routes.t1.p1')}</p>
              <p className="text-slate-600 mb-4">{t('routes.t1.p2')}</p>
              <p className="font-semibold text-navy-900 mb-3">{t('routes.t1.p3')}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                {(t('routes.t1.list', { returnObjects: true }) || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 mb-4">{t('routes.t1.p4')}</p>
              <p className="text-slate-600 mt-auto">{t('routes.t1.p5')}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('routes.direct.title')}</h3>
              <p className="text-slate-600 mb-4">{t('routes.direct.p1')}</p>
              <p className="text-slate-600 mb-4">{t('routes.direct.p2')}</p>
              <p className="text-slate-600 mt-auto">{t('routes.direct.p3')}</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Representation and VAT Planning */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('representation.title')}</h2>
            <p className="text-slate-600 mb-4">{t('representation.p1')}</p>
            <p className="text-slate-600 mb-4">{t('representation.p2')}</p>
            <p className="text-slate-600 mb-4">{t('representation.p3')}</p>
            <p className="font-semibold text-navy-900 mb-3">{t('representation.p4')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('representation.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">{t('representation.outro')}</p>
          </section>

          {/* Required Clearance Documents */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('documents.title')}</h2>
            <p className="text-slate-600 mb-4">{t('documents.intro')}</p>
            <ul className="grid grid-cols-2 gap-4 mb-6">
              {(t('documents.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span className="text-slate-600">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">{t('documents.outro')}</p>
          </section>
        </div>

        {/* Customs Value and Duty */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('duty.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('duty.intro')}</p>
          
          <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-6">
            {(t('duty.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <div className="space-y-4 text-slate-600">
            <p>{t('duty.outro1')}</p>
            <p>{t('duty.outro2')}</p>
            <p>
              <Trans i18nKey="duty.outro3" t={t}>
                Businesses needing a broader... <Link to="/faq" className="text-primary-600 hover:underline">customs clearance costs Rotterdam</Link>.
              </Trans>
            </p>
          </div>
        </section>

        {/* FCL and LCL Clearance */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('fclLcl.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('fclLcl.intro')}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('fclLcl.fcl.title')}</h3>
              <p className="text-slate-600 mb-4">{t('fclLcl.fcl.p1')}</p>
              <p className="text-slate-600 mb-4">{t('fclLcl.fcl.p2')}</p>
              <p className="text-slate-600 mb-4">{t('fclLcl.fcl.p3')}</p>
              <p className="text-slate-600 mb-4">
                <Trans i18nKey="fclLcl.fcl.p4" t={t}>
                  The customs file... <Link to="/fcl-customs-clearance" className="text-primary-600 hover:underline">FCL customs clearance Rotterdam Netherlands</Link>.
                </Trans>
              </p>
              <p className="text-slate-600 mt-auto">
                <Trans i18nKey="fclLcl.fcl.p5" t={t}>
                  For a comparison... <Link to="/blog" className="text-primary-600 hover:underline">FCL LCL comparison Rotterdam Belgium</Link>.
                </Trans>
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('fclLcl.lcl.title')}</h3>
              <p className="text-slate-600 mb-4">{t('fclLcl.lcl.p1')}</p>
              <p className="text-slate-600 mb-4">{t('fclLcl.lcl.p2')}</p>
              <p className="text-slate-600 mb-4">{t('fclLcl.lcl.p3')}</p>
              <p className="font-semibold text-navy-900 mb-3">{t('fclLcl.lcl.p4')}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {(t('fclLcl.lcl.list', { returnObjects: true }) || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 mt-auto">{t('fclLcl.lcl.outro')}</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Clearance Cost Factors */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('costs.title')}</h2>
            <p className="text-slate-600 mb-4">{t('costs.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('costs.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">
              <Trans i18nKey="costs.outro" t={t}>
                Import duty and VAT... <Link to="/faq" className="text-primary-600 hover:underline">import duty Rotterdam</Link>.
              </Trans>
            </p>
          </section>

          {/* Common Clearance Delays */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('delays.title')}</h2>
            <p className="text-slate-600 mb-4">{t('delays.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('delays.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="space-y-4 text-slate-600 mt-auto">
              <p>{t('delays.outro1')}</p>
              <p>{t('delays.outro2')}</p>
              <p>{t('delays.outro3')}</p>
            </div>
          </section>
        </div>

        {/* Rotterdam and Antwerp Support */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('support.title')}</h2>
          <div className="space-y-4 text-slate-600">
            <p>{t('support.p1')}</p>
            <p>{t('support.p2')}</p>
            <p>{t('support.p3')}</p>
          </div>
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
