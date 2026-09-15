import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function RoadFreight() {
  const { t } = useTranslation(['roadFreight', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title', { defaultValue: 'Road Freight Customs Clearance Belgium | Winz' });
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/road-freight-customs-clearance`;

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
              The CMR must also align... <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link>...
            </Trans>
          </p>
          <p>{t('intro.p2')}</p>
          <p>{t('intro.p3')}</p>
        </section>

        {/* Requirements */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('requirements.title')}</h2>
          <p className="text-lg text-slate-600 mb-4">{t('requirements.p1')}</p>
          <p className="text-lg text-slate-600 mb-8">{t('requirements.p2')}</p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Truck Movement</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Customs Treatment</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('requirements.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.movement}</td>
                    <td className="py-4 px-6 text-slate-600">{row.treatment}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 font-medium">
            <Trans i18nKey="requirements.postTable" t={t}>
              Review <Link to="/import" className="text-primary-600 hover:underline">customs declaration for imports Belgium</Link> before arranging a road shipment.
            </Trans>
          </p>
        </section>

        {/* Documents */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('documents.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('documents.intro')}</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-8">
            {(t('documents.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-slate-600 mb-4">
            <Trans i18nKey="documents.post1" t={t}>
              CMR and invoice layouts... <Link to="/import" className="text-primary-600 hover:underline">CMR document road freight</Link>.
            </Trans>
          </p>
          <p className="text-slate-600">{t('documents.post2')}</p>
        </section>

        {/* Process */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('process.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('process.intro')}</p>
          <ol className="list-decimal pl-6 space-y-4 text-slate-600 mb-8">
            {(t('process.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>
                <Trans i18nKey={`process.list.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ol>
          <p className="text-slate-600 italic">{t('process.outro')}</p>
        </section>

        {/* Delays */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('delays.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">
            <Trans i18nKey="delays.intro" t={t}>
              Most road freight delays begin... <Link to="/contact" className="text-primary-600 hover:underline">customs delays at Belgian land borders</Link>.
            </Trans>
          </p>
          <ul className="list-disc pl-6 space-y-4 text-slate-600 mb-8">
            {(t('delays.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>
                <Trans i18nKey={`delays.list.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ul>
          <p className="text-slate-600">{t('delays.outro')}</p>
        </section>

        {/* Sections: Transit & Export */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.transit.title')}</h2>
            <p className="text-slate-600">{t('sections.transit.text')}</p>
          </section>
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.export.title')}</h2>
            <p className="text-slate-600">
              <Trans i18nKey="sections.export.text" t={t}>
                Goods leaving... <Link to="/export" className="text-primary-600 hover:underline">EU export clearance</Link>...
              </Trans>
            </p>
          </section>
        </div>

        {/* Sections: Reefer & Costs */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.reefer.title')}</h2>
            <p className="text-slate-600">
              <Trans i18nKey="sections.reefer.text" t={t}>
                Reefer trucks... <Link to="/import" className="text-primary-600 hover:underline">reefer truck clearance Belgium</Link>...
              </Trans>
            </p>
          </section>
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.costs.title')}</h2>
            <p className="text-slate-600">
              <Trans i18nKey="sections.costs.text" t={t}>
                Road freight customs costs... <Link to="/import" className="text-primary-600 hover:underline">customs clearance costs road freight Belgium</Link>...
              </Trans>
            </p>
          </section>
        </div>

        {/* Why Choose Winz & CTA */}
        <div className="bg-navy-900 rounded-3xl text-white overflow-hidden shadow-xl">
          <div className="p-8 md:p-12 lg:p-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">{t('whyWinz.title')}</h2>
                <p className="text-blue-100 mb-8">{t('whyWinz.intro')}</p>
                <ul className="space-y-3 mb-8">
                  {(t('whyWinz.list', { returnObjects: true }) || []).map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-blue-50">
                      <svg className="w-5 h-5 text-primary-400 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                      {item}
                    </li>
                  ))}
                </ul>
                <p className="text-blue-200/80 text-sm">
                  <Trans i18nKey="whyWinz.outro" t={t}>
                    Winz supports... <Link to="/import" className="text-primary-300 font-semibold hover:underline">EU road cargo import regulations Belgium</Link>.
                  </Trans>
                </p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{t('cta.title')}</h3>
                <p className="text-blue-100 mb-6">{t('cta.text')}</p>
                <p className="text-blue-200/80 text-sm mb-8">{t('cta.subtext')}</p>
                <Link to="/contact" className="inline-block bg-primary-500 hover:bg-primary-600 text-white font-bold py-4 px-8 rounded-xl transition-all shadow-lg hover:shadow-primary-500/25">
                  {t('cta.button')}
                </Link>
              </div>
            </div>
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
