import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function BrusselsAirport() {
  const { t } = useTranslation(['brusselsAirport', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title');
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/customs-clearance-brussels-airport`;

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
          <p>{t('intro.p2')}</p>
          <p>
            <Trans i18nKey="intro.p3" t={t}>
              Winz files PLDA... <Link to="/services" className="text-primary-600 hover:underline">air cargo clearance</Link> and <Link to="/contact" className="text-primary-600 hover:underline">clearing goods through Belgian customs</Link>...
            </Trans>
          </p>
          <p className="font-semibold text-navy-900">{t('intro.contact')}</p>
        </section>

        {/* Customs Systems at BRUcargo */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('systems.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('systems.p1')}</p>
          <p className="text-slate-600 mb-4">{t('systems.p2')}</p>
          <p className="text-slate-600 mb-4">{t('systems.p3')}</p>
          <p className="text-slate-600 mb-4">{t('systems.p4')}</p>
          <p className="text-slate-600 mb-4">{t('systems.p5')}</p>
          <p className="text-slate-600">
            <Trans i18nKey="systems.p6" t={t}>
              Complete data allows... <Link to="/fast-track-customs-clearance" className="text-primary-600 hover:underline">fast track air cargo clearance Belgium</Link>...
            </Trans>
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Required Air Cargo Documents */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('documents.title')}</h2>
            <p className="text-slate-600 mb-6">{t('documents.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('documents.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="space-y-4 text-slate-600 mt-auto">
              <p>{t('documents.outro1')}</p>
              <p>{t('documents.outro2')}</p>
              <p>{t('documents.outro3')}</p>
            </div>
          </section>

          {/* Duties and Import VAT */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('dutyVAT.title')}</h2>
            <p className="text-slate-600 mb-4">{t('dutyVAT.p1')}</p>
            <p className="text-slate-600 mb-4">{t('dutyVAT.p2')}</p>
            <p className="text-slate-600 mb-4">{t('dutyVAT.p3')}</p>
            <p className="text-slate-600 mb-4">{t('dutyVAT.p4')}</p>
            <p className="text-slate-600 mb-4">{t('dutyVAT.p5')}</p>
            <p className="text-slate-600 mt-auto">{t('dutyVAT.p6')}</p>
          </section>
        </div>

        {/* How BRUcargo Release Works */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('release.title')}</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <p className="text-slate-600 mb-4">{t('release.p1')}</p>
              <p className="text-slate-600 mb-4">{t('release.p2')}</p>
              <p className="text-slate-600 mb-4">{t('release.p3')}</p>
            </div>
            <div>
              <p className="font-semibold text-navy-900 mb-3">{t('release.availabilityTitle')}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
                {(t('release.availabilityList', { returnObjects: true }) || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
          <p className="text-slate-600 mb-4">{t('release.outro1')}</p>
          <p className="text-slate-600">{t('release.outro2')}</p>
        </section>

        {/* Customs Clearance Steps */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('steps.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('steps.intro')}</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900 w-16">Step</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Action</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('steps.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.step}</td>
                    <td className="py-4 px-6 text-slate-600">{row.action}</td>
                    <td className="py-4 px-6 text-slate-600">{row.result}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 mb-4">{t('steps.outro1')}</p>
          <p className="text-slate-600">{t('steps.outro2')}</p>
        </section>

        {/* Cargo Types: SPS, Dangerous, Pharma */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.sps.title')}</h3>
              <p className="text-slate-600 mb-4">{t('cargoTypes.sps.p1')}</p>
              <p className="text-slate-600 mb-2">{t('cargoTypes.sps.p2')}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                {(t('cargoTypes.sps.list', { returnObjects: true }) || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 mb-4">{t('cargoTypes.sps.p3')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.sps.p4')}</p>
              <p className="text-slate-600 mt-auto">{t('cargoTypes.sps.p5')}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.dangerous.title')}</h3>
              <p className="text-slate-600 mb-4">{t('cargoTypes.dangerous.p1')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.dangerous.p2')}</p>
              <p className="font-semibold text-navy-900 mb-2">{t('cargoTypes.dangerous.listTitle')}</p>
              <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                {(t('cargoTypes.dangerous.list', { returnObjects: true }) || []).map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
              <p className="text-slate-600 mb-4">{t('cargoTypes.dangerous.p3')}</p>
              <p className="text-slate-600 mt-auto">{t('cargoTypes.dangerous.p4')}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.pharma.title')}</h3>
              <p className="text-slate-600 mb-4">{t('cargoTypes.pharma.p1')}</p>
              <p className="text-slate-600 mb-4">{t('cargoTypes.pharma.p2')}</p>
              <p className="text-slate-600 mt-auto">{t('cargoTypes.pharma.p3')}</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Customs Warehousing Options */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('options.title')}</h2>
            <p className="text-slate-600 mb-4">{t('options.p1')}</p>
            <p className="text-slate-600 mb-4">{t('options.p2')}</p>
            <p className="text-slate-600 mb-4">{t('options.p3')}</p>
            <p className="text-slate-600 mb-4">{t('options.p4')}</p>
            <p className="text-slate-600 mb-4">{t('options.p5')}</p>
            <p className="text-slate-600 mt-auto">{t('options.p6')}</p>
          </section>

          {/* Brussels and Schiphol Routing */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('routing.title')}</h2>
            <p className="text-slate-600 mb-4">{t('routing.p1')}</p>
            <p className="text-slate-600 mb-4">{t('routing.p2')}</p>
            <p className="text-slate-600 mb-4">{t('routing.p3')}</p>
            <p className="text-slate-600 mb-4">{t('routing.p4')}</p>
            <p className="text-slate-600 mt-auto">{t('routing.p5')}</p>
          </section>
        </div>

        {/* Common Delay Causes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('delays.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('delays.intro')}</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6 max-w-3xl">
            {(t('delays.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-slate-600 mb-4">{t('delays.outro1')}</p>
          <p className="text-slate-600">{t('delays.outro2')}</p>
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
