import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function AmsterdamSchiphol() {
  const { t } = useTranslation(['schiphol', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title');
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/customs-clearance-amsterdam-schiphol`;

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
          <p>{t('intro.p1')}</p>
          <p>
            <Trans i18nKey="intro.p2" t={t}>
              Winz coordinates... <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link> services.
            </Trans>
          </p>
        </section>

        {/* Clearance Options at Schiphol */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('options.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('options.intro')}</p>
          <p className="text-slate-600 mb-8">{t('options.p1')}</p>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('options.dutch.title')}</h3>
              <p className="text-slate-600 mb-4">{t('options.dutch.p1')}</p>
              <p className="text-slate-600 mb-4">{t('options.dutch.p2')}</p>
              <p className="text-slate-600 mt-auto">{t('options.dutch.p3')}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('options.t1.title')}</h3>
              <p className="text-slate-600 mb-4">{t('options.t1.p1')}</p>
              <p className="text-slate-600 mb-4">{t('options.t1.p2')}</p>
              <p className="text-slate-600 mb-4">{t('options.t1.p3')}</p>
              <p className="text-slate-600 mt-auto">
                <Trans i18nKey="options.t1.p4" t={t}>
                  Businesses planning an <Link to="/import" className="text-primary-600 hover:underline">EU import customs</Link> filing may use this route...
                </Trans>
              </p>
            </div>
          </div>
        </section>

        {/* Schiphol Clearance Process */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('process.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('process.intro')}</p>
          
          <div className="mb-6">
            <p className="font-semibold text-navy-900 mb-3">{t('process.listTitle')}</p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-600">
              {(t('process.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ol>
          </div>
          
          <p className="text-slate-600 mb-4">{t('process.outro1')}</p>
          <p className="text-slate-600">{t('process.outro2')}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Documents and Shipment Data */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('documents.title')}</h2>
            <p className="text-slate-600 mb-6">{t('documents.p1')}</p>
            
            <p className="font-semibold text-navy-900 mb-3">{t('documents.list1Title')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('documents.list1', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <p className="text-slate-600 mb-4">{t('documents.p2')}</p>
            <p className="text-slate-600 mb-6">{t('documents.p3')}</p>

            <p className="font-semibold text-navy-900 mb-3">{t('documents.list2Title')}</p>
            <ul className="grid grid-cols-1 gap-2 text-slate-600 mb-6">
              {(t('documents.list2', { returnObjects: true }) || []).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <p className="text-slate-600 mt-auto">{t('documents.outro')}</p>
          </section>

          {/* ICS2 and Advanced Data */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('ics2.title')}</h2>
            <p className="text-slate-600 mb-4">{t('ics2.p1')}</p>
            <p className="text-slate-600 mb-4">{t('ics2.p2')}</p>
            <p className="text-slate-600 mb-4">{t('ics2.p3')}</p>
            <p className="text-slate-600 mb-4">{t('ics2.p4')}</p>
            <p className="text-slate-600 mt-auto">{t('ics2.p5')}</p>
          </section>
        </div>

        {/* Clearance Times at Schiphol */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('times.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('times.p1')}</p>
          <p className="text-slate-600 mb-6">{t('times.p2')}</p>
          
          <div className="mb-6">
            <p className="font-semibold text-navy-900 mb-3">{t('times.listTitle')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              {(t('times.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4 text-slate-600">
            <p>{t('times.outro1')}</p>
            <p>
              <Trans i18nKey="times.outro2" t={t}>
                Businesses comparing expected processing periods can review <Link to="/faq" className="text-primary-600 hover:underline">how long customs clearance takes Schiphol</Link>...
              </Trans>
            </p>
            <p>{t('times.outro3')}</p>
          </div>
        </section>

        {/* Schiphol or Brussels Airport Comparison */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('comparison.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('comparison.p1')}</p>
          <p className="text-slate-600 mb-8">{t('comparison.p2')}</p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Factor</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Amsterdam Schiphol</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Brussels Airport</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('comparison.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.factor}</td>
                    <td className="py-4 px-6 text-slate-600">{row.schiphol}</td>
                    <td className="py-4 px-6 text-slate-600">{row.brussels}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-slate-600">
            <p>{t('comparison.outro1')}</p>
            <p>{t('comparison.outro2')}</p>
            <p>
              <Trans i18nKey="comparison.outro3" t={t}>
                Winz also supports <Link to="/customs-clearance-brussels-airport" className="text-primary-600 hover:underline">air freight customs Brussels</Link>...
              </Trans>
            </p>
          </div>
        </section>

        {/* Cargo Types at Schiphol */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('cargoTypes.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('cargoTypes.intro')}</p>
          <p className="text-slate-600 mb-8">{t('cargoTypes.p1')}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.general.title')}</h3>
              <p className="text-slate-600 mb-4">{t('cargoTypes.general.p1')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.general.p2')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.general.p3')}</p>
              <p className="text-slate-600 mt-auto">{t('cargoTypes.general.p4')}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.perishable.title')}</h3>
              <p className="text-slate-600 mb-4">{t('cargoTypes.perishable.p1')}</p>
              <p className="text-slate-600 mt-auto">
                <Trans i18nKey="cargoTypes.perishable.p2" t={t}>
                  Full requirements for <Link to="/faq" className="text-primary-600 hover:underline">perishable goods air freight Schiphol</Link> should be checked before the airline accepts the cargo at origin.
                </Trans>
              </p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.asian.title')}</h3>
              <p className="text-slate-600 mb-4">{t('cargoTypes.asian.p1')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.asian.p2')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.asian.p3')}</p>
              <p className="text-slate-600 mt-auto">
                <Trans i18nKey="cargoTypes.asian.p4" t={t}>
                  Businesses using <Link to="/blog" className="text-primary-600 hover:underline">importing from Indonesia to EU via Schiphol</Link> procedures should prepare...
                </Trans>
              </p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Duties and Clearance Costs */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('dutyCosts.title')}</h2>
            <p className="text-slate-600 mb-8">{t('dutyCosts.p1')}</p>
            
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('dutyCosts.costsTitle')}</h2>
            <p className="text-slate-600 mb-4">{t('dutyCosts.c1')}</p>
            <p className="text-slate-600 mb-4">{t('dutyCosts.c2')}</p>
            <p className="text-slate-600 mb-4">{t('dutyCosts.c3')}</p>
            <p className="text-slate-600 mt-auto">
              <Trans i18nKey="dutyCosts.c4" t={t}>
                Businesses can review the main factors affecting <Link to="/faq" className="text-primary-600 hover:underline">customs clearance costs Schiphol Belgium</Link>...
              </Trans>
            </p>
          </section>

          {/* Winz Customs Support */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('support.title')}</h2>
            <p className="text-slate-600 mb-4">{t('support.p1')}</p>
            <p className="text-slate-600 mt-auto">{t('support.p2')}</p>
          </section>
        </div>

        {/* CTA */}
        <div className="bg-navy-900 rounded-3xl text-white overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{t('cta.linkText')}</h2>
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto leading-relaxed">
              {t('cta.text')}
              <strong className="text-white">Winz</strong>
              {t('cta.outro')}
            </p>
            <Link to="/contact" className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-500/25">
              Contact Winz
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
