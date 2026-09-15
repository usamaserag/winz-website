import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function PortAntwerp() {
  const { t } = useTranslation(['portAntwerp', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title');
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/customs-clearance-port-of-antwerp`;

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
          <p>
            <Trans i18nKey="intro.p4" t={t}>
              Winz supports... <Link to="/import" className="text-primary-600 hover:underline">EU import declaration service</Link> and <Link to="/transit" className="text-primary-600 hover:underline">NCTS transit clearance</Link>...
            </Trans>
          </p>
        </section>

        {/* How Antwerp Clearance Works */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('howItWorks.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('howItWorks.intro')}</p>
          <ol className="list-decimal pl-6 space-y-4 text-slate-600 mb-6">
            {(t('howItWorks.steps', { returnObjects: true }) || []).map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="text-slate-600">
            <Trans i18nKey="howItWorks.outro" t={t}>
              An accepted declaration... <Link to="/services" className="text-primary-600 hover:underline">Port of Antwerp customs procedures PLDA</Link>.
            </Trans>
          </p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Antwerp Customs Systems */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:col-span-2">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('systems.title')}</h2>
            <p className="text-slate-600 mb-6">{t('systems.intro')}</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('systems.idms.title')}</h3>
                <p className="text-slate-600">{t('systems.idms.text')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('systems.aes.title')}</h3>
                <p className="text-slate-600">{t('systems.aes.text')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('systems.ncts.title')}</h3>
                <p className="text-slate-600">{t('systems.ncts.text')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('systems.pnts.title')}</h3>
                <p className="text-slate-600">{t('systems.pnts.text')}</p>
              </div>
              <div className="md:col-span-2">
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('systems.irp.title')}</h3>
                <p className="text-slate-600">{t('systems.irp.text')}</p>
              </div>
            </div>
          </section>

          {/* Cargo Types Winz Clears */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:col-span-2">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('cargoTypes.title')}</h2>
            <p className="text-slate-600 mb-6">{t('cargoTypes.intro')}</p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('cargoTypes.fcl.title')}</h3>
                <p className="text-slate-600">
                  <Trans i18nKey="cargoTypes.fcl.text" t={t}>
                    A Full Container Load... <Link to="/fcl-customs-clearance" className="text-primary-600 hover:underline">FCL customs clearance Antwerp</Link>.
                  </Trans>
                </p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('cargoTypes.lcl.title')}</h3>
                <p className="text-slate-600">{t('cargoTypes.lcl.text')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('cargoTypes.exportTransit.title')}</h3>
                <p className="text-slate-600">{t('cargoTypes.exportTransit.text')}</p>
              </div>
              <div>
                <h3 className="text-xl font-bold text-navy-900 mb-2">{t('cargoTypes.reeferProject.title')}</h3>
                <p className="text-slate-600">{t('cargoTypes.reeferProject.text')}</p>
              </div>
            </div>
          </section>

          {/* Documents Required */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('requirements.documents.title')}</h2>
            <p className="text-slate-600 mb-4">{t('requirements.documents.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('requirements.documents.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 mt-auto">{t('requirements.documents.outro')}</p>
          </section>

          {/* Representation and Customs Charges */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('requirements.representation.title')}</h2>
            <p className="text-slate-600">{t('requirements.representation.text')}</p>
          </section>
        </div>

        {/* Common Causes of Delay */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('delays.causes.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('delays.causes.intro')}</p>
          <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
            {(t('delays.causes.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i} className="flex items-start">
                <span className="text-primary-600 mr-2">•</span>
                <span className="text-slate-600">{item}</span>
              </li>
            ))}
          </ul>
          <p className="text-slate-600">{t('delays.causes.outro')}</p>
        </section>

        {/* Indicative Clearance Times */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('times.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('times.intro')}</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Clearance situation</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Indicative outcome</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('times.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.situation}</td>
                    <td className="py-4 px-6 text-slate-600">{row.outcome}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 text-slate-600">
            <p>{t('times.outro1')}</p>
            <p>
              <Trans i18nKey="times.outro2" t={t}>
                Importers with... <Link to="/faq" className="text-primary-600 hover:underline">how long customs clearance takes at Antwerp</Link>... <Link to="/faq" className="text-primary-600 hover:underline">customs delays Port of Antwerp</Link>.
              </Trans>
            </p>
            <p>
              <Trans i18nKey="times.outro3" t={t}>
                For the container... <Link to="/services" className="text-primary-600 hover:underline">container release Port of Antwerp</Link>.
              </Trans>
            </p>
          </div>
        </section>
        
        {/* Antwerp Terminal Coverage & ICS2 */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('coverage.title')}</h2>
            <p className="text-slate-600 mb-4">{t('coverage.p1')}</p>
            <p className="text-slate-600 mb-4">{t('coverage.p2')}</p>
            <p className="text-slate-600 mt-auto">
              <Trans i18nKey="coverage.p3" t={t}>
                After customs... <Link to="/transport" className="text-primary-600 hover:underline">port collection haulage</Link>... <Link to="/blog" className="text-primary-600 hover:underline">EU customs updates 2026 Antwerp</Link>.
              </Trans>
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('delays.ics2.title')}</h2>
            <p className="text-slate-600">{t('delays.ics2.text')}</p>
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
