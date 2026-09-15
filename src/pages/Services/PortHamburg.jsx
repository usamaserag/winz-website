import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function PortHamburg() {
  const { t } = useTranslation(['portHamburg', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title');
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/customs-clearance-port-of-hamburg`;

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
              Winz handles Hamburg clearance for <Link to="/import" className="text-primary-600 hover:underline">import clearance and release</Link> and <Link to="/export-customs-clearance" className="text-primary-600 hover:underline">EU export customs</Link> clients under one account alongside Antwerp and Rotterdam.
            </Trans>
          </p>
        </section>

        {/* ATLAS and DAKOSY Process */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('atlas.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('atlas.p1')}</p>
          <p className="text-slate-600 mb-4">{t('atlas.p2')}</p>
          <p className="text-slate-600 mb-4">{t('atlas.p3')}</p>
          <p className="text-slate-600 mb-4">{t('atlas.p4')}</p>
          
          <div className="mb-6">
            <p className="font-semibold text-navy-900 mb-3">{t('atlas.p5')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              {(t('atlas.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <p className="text-slate-600 mb-4">{t('atlas.outro1')}</p>
          <p className="text-slate-600">
            <Trans i18nKey="atlas.outro2" t={t}>
              For delivery window planning, see <Link to="/faq" className="text-primary-600 hover:underline">how long customs clearance takes Hamburg Belgium</Link>.
            </Trans>
          </p>
        </section>

        {/* Steps From Arrival to Release */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('steps.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('steps.intro')}</p>
          
          <ol className="list-decimal pl-6 space-y-2 text-slate-600 mb-6">
            {(t('steps.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ol>

          <p className="text-slate-600">{t('steps.outro')}</p>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Required Clearance Documents */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('documents.title')}</h2>
            <p className="text-slate-600 mb-4">{t('documents.intro')}</p>
            <p className="font-semibold text-navy-900 mb-3">{t('documents.p1')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('documents.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <div className="space-y-4 text-slate-600 mt-auto">
              <p>{t('documents.outro1')}</p>
              <p>{t('documents.outro2')}</p>
            </div>
          </section>

          {/* Customs Representation and Liability */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('representation.title')}</h2>
            <p className="text-slate-600 mb-4">{t('representation.p1')}</p>
            <p className="text-slate-600 mb-4">{t('representation.p2')}</p>
            <p className="text-slate-600 mt-auto">{t('representation.p3')}</p>
          </section>
        </div>

        {/* Hamburg Duty, VAT and HS Codes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('hsCodes.title')}</h2>
              <p className="text-slate-600 mb-4">{t('hsCodes.p1')}</p>
              <p className="text-slate-600 mb-4">{t('hsCodes.p2')}</p>
              <p className="text-slate-600 mb-4">{t('hsCodes.p3')}</p>
              <p className="text-slate-600 mt-auto">{t('hsCodes.p4')}</p>
            </div>
            
            <div className="flex flex-col">
              <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('dutyVAT.title')}</h2>
              <p className="text-slate-600 mb-4">{t('dutyVAT.p1')}</p>
              <p className="text-slate-600 mb-4">{t('dutyVAT.p2')}</p>
              <p className="text-slate-600 mb-4">{t('dutyVAT.p3')}</p>
              <p className="text-slate-600 mb-4">{t('dutyVAT.p4')}</p>
              <p className="text-slate-600 mb-4">{t('dutyVAT.p5')}</p>
              <p className="text-slate-600 mt-auto">
                <Trans i18nKey="dutyVAT.p6" t={t}>
                  Importers can review <Link to="/blog" className="text-primary-600 hover:underline">EU import regulations</Link> before choosing Hamburg clearance or T1 transit to Belgium.
                </Trans>
              </p>
            </div>
          </div>
        </section>

        {/* Hamburg Customs Inspections */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('inspections.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('inspections.p1')}</p>
          <p className="text-slate-600 mb-6">{t('inspections.p2')}</p>
          
          <div className="mb-6">
            <p className="font-semibold text-navy-900 mb-3">{t('inspections.p3')}</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-slate-600">
              {(t('inspections.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-primary-600 mr-2">•</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          
          <p className="text-slate-600 mb-4">{t('inspections.p4')}</p>
          <p className="text-slate-600">{t('inspections.p5')}</p>
        </section>

        {/* Hamburg-to-Belgium Customs Routes */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('routes.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('routes.intro')}</p>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('routes.german.title')}</h3>
              <p className="text-slate-600 mt-auto">{t('routes.german.p1')}</p>
            </div>

            <div className="flex flex-col">
              <h3 className="text-2xl font-bold text-navy-900 mb-4">{t('routes.t1.title')}</h3>
              <p className="text-slate-600 mb-4">
                <Trans i18nKey="routes.t1.p1" t={t}>
                  Winz supports <Link to="/transit" className="text-primary-600 hover:underline">transit Hamburg to Belgium NCTS</Link> for importers moving goods under customs supervision.
                </Trans>
              </p>
              <p className="text-slate-600 mt-auto">{t('routes.t1.p2')}</p>
            </div>

            <div className="flex flex-col">
              <p className="text-slate-600 mt-auto">{t('routes.centralised.p1')}</p>
            </div>
          </div>
        </section>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Incoterms and Customs Value */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('incoterms.title')}</h2>
            <p className="text-slate-600 mb-4">{t('incoterms.p1')}</p>
            <p className="text-slate-600 mb-4">{t('incoterms.p2')}</p>
            <p className="text-slate-600 mb-4">{t('incoterms.p3')}</p>
            <p className="text-slate-600 mb-4">{t('incoterms.p4')}</p>
            <p className="text-slate-600 mt-auto">{t('incoterms.p5')}</p>
          </section>

          {/* Three Ports, One Account */}
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 flex flex-col">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('threePorts.title')}</h2>
            <p className="text-slate-600 mb-4">{t('threePorts.p1')}</p>
            <p className="text-slate-600 mb-4">{t('threePorts.p2')}</p>
            <p className="text-slate-600 mt-auto">
              <Trans i18nKey="threePorts.p3" t={t}>
                For pricing context, see <Link to="/faq" className="text-primary-600 hover:underline">customs costs Hamburg</Link>.
              </Trans>
            </p>
          </section>
        </div>

        {/* Hamburg Terminals and Cargo */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('terminals.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('terminals.p1')}</p>
          
          <div className="mb-6">
            <p className="font-semibold text-navy-900 mb-3">{t('terminals.p2')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600">
              {(t('terminals.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </div>
          
          <div className="space-y-4 text-slate-600">
            <p>{t('terminals.p3')}</p>
            <p>{t('terminals.p4')}</p>
            <p>{t('terminals.p5')}</p>
            <p>{t('terminals.p6')}</p>
            <p>{t('terminals.p7')}</p>
            <p>{t('terminals.p8')}</p>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-navy-900 rounded-3xl text-white overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16 text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
            <p className="text-blue-100 mb-4">{t('cta.text')}</p>
            <p className="text-blue-200/80 mb-8">{t('cta.subtext')}</p>
            <Link to="/contact" className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-500/25">
              {t('cta.linkText')}{t('cta.outro')}
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
