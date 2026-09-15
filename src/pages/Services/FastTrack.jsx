import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function FastTrack() {
  const { t } = useTranslation(['fastTrack', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title', { defaultValue: 'Fast Track Customs Clearance Belgium — Urgent Shipments | Winz' });
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/fast-track-customs-clearance`;

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
              For air and road freight... <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link>...
            </Trans>
          </p>
          <p>
            <Trans i18nKey="intro.p2" t={t}>
              Winz supports... <Link to="/import" className="text-primary-600 hover:underline">Belgium import clearance service</Link>...
            </Trans>
          </p>
          <p className="font-bold text-navy-900 mt-6">{t('intro.contact')}</p>
        </section>

        {/* Pre-Lodgement Works */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('preLodgement.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('preLodgement.text')}</p>
          <p className="text-lg text-slate-600 mb-4">
            <Trans i18nKey="preLodgement.p2" t={t}>
              Winz prepares Antwerp... <Link to="/air-freight-customs-clearance" className="text-primary-600 hover:underline">air cargo clearance Belgium</Link>...
            </Trans>
          </p>
          <p className="text-lg text-slate-600 mb-6">{t('preLodgement.p3')}</p>
          <p className="text-slate-600 italic">
            <Trans i18nKey="preLodgement.outro" t={t}>
              For port-specific guidance, see <Link to="/customs-clearance-port-of-antwerp" className="text-primary-600 hover:underline">Antwerp port pre-clearance procedures</Link>.
            </Trans>
          </p>
        </section>

        {/* Shipment Types Covered */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('shipmentTypes.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('shipmentTypes.intro')}</p>
          <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-8">
            {(t('shipmentTypes.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>
                <Trans i18nKey={`shipmentTypes.list.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ul>
          <p className="text-slate-600 font-medium">{t('shipmentTypes.outro')}</p>
        </section>

        {/* Fast Track vs Standard Clearance */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('comparison.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('comparison.intro')}</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Clearance Situation</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Expected Clearance Impact</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('comparison.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.situation}</td>
                    <td className="py-4 px-6 text-slate-600">{row.impact}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="text-slate-600 mb-4">{t('comparison.postTable')}</p>
          <p className="text-slate-600 mb-6">{t('comparison.costs')}</p>

          <ul className="space-y-2">
            {(t('comparison.links', { returnObjects: true }) || []).map((item, i) => (
              <li key={i} className="text-slate-600">
                <Trans i18nKey={`comparison.links.${i}`} t={t}>
                  text <Link to="/import" className="text-primary-600 hover:underline">link</Link>
                </Trans>
              </li>
            ))}
          </ul>
        </section>

        {/* What Must Be Ready */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('whatMustBeReady.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('whatMustBeReady.intro')}</p>
          <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-6">
            {(t('whatMustBeReady.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>
                <Trans i18nKey={`whatMustBeReady.list.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ul>
          <p className="text-slate-600 mb-4">{t('whatMustBeReady.outro')}</p>
          <p className="text-slate-600 italic">
            <Trans i18nKey="whatMustBeReady.link" t={t}>
              For common risk points... <Link to="/contact" className="text-primary-600 hover:underline">link</Link>
            </Trans>
          </p>
        </section>

        {/* Info Grid (Who Qualifies, When It Fails, CBAM, AEO) */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.whoQualifies.title')}</h2>
            <p className="text-slate-600">{t('sections.whoQualifies.text')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.whenItFails.title')}</h2>
            <p className="text-slate-600">{t('sections.whenItFails.text')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.cbam.title')}</h2>
            <p className="text-slate-600">
              <Trans i18nKey="sections.cbam.text" t={t}>
                text... <Link to="/import" className="text-primary-600 hover:underline">link</Link>
              </Trans>
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.aeo.title')}</h2>
            <p className="text-slate-600">{t('sections.aeo.text')}</p>
          </section>
        </div>

        {/* How Winz Coordinates */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('howWinzCoordinates.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('howWinzCoordinates.intro')}</p>
          <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-6">
            {(t('howWinzCoordinates.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>
                <Trans i18nKey={`howWinzCoordinates.list.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ul>
          <p className="text-slate-600 font-medium">{t('howWinzCoordinates.outro')}</p>
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
