import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function AirFreight() {
  const { t } = useTranslation(['airFreight', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title', { defaultValue: 'Air Freight Customs Clearance Belgium | Winz' });
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/air-freight-customs-clearance`;

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
              Imports are normally processed through IDMS... <Link to="/import" className="text-primary-600 hover:underline">EU import declaration service</Link> ... <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link>.
            </Trans>
          </p>
          <p>{t('intro.p2')}</p>
        </section>

        {/* How Air Cargo Clears Customs */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('howItClears.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('howItClears.intro')}</p>
          <div className="grid gap-6 md:grid-cols-2">
            {['ics2', 'idms', 'control', 'release'].map((key) => (
              <div key={key} className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                <h3 className="text-xl font-bold text-navy-900 mb-3">{t(`howItClears.${key}.title`)}</h3>
                <p className="text-slate-600">{t(`howItClears.${key}.text`)}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Documents */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('documents.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('documents.intro')}</p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Document</th>
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
          <p className="text-slate-600 mb-4">
            <Trans i18nKey="documents.postTable" t={t}>
              All documents must show... <Link to="/import" className="text-primary-600 hover:underline">customs documents air freight Belgium</Link>.
            </Trans>
          </p>
          <p className="text-slate-600 font-medium">{t('documents.brusselsSupport')}</p>
        </section>

        {/* What We Need */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('whatWeNeed.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('whatWeNeed.intro')}</p>
          <p className="font-semibold text-navy-900 mb-4">{t('whatWeNeed.subtitle')}</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
            {(t('whatWeNeed.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-slate-600">{t('whatWeNeed.outro')}</p>
        </section>

        {/* Duties & Representation */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('duties.title')}</h2>
            <p className="text-slate-600">{t('duties.text')}</p>
          </section>
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('representation.title')}</h2>
            <p className="text-slate-600">{t('representation.text')}</p>
          </section>
        </div>

        {/* Airport Coverage */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('airports.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('airports.intro')}</p>
          
          <div className="space-y-8">
            <div className="border-l-4 border-primary-500 pl-6">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{t('airports.brussels.title')}</h3>
              <p className="text-slate-600">
                <Trans i18nKey="airports.brussels.text" t={t}>
                  Winz prepares import and <Link to="/export" className="text-primary-600 hover:underline">export declaration Belgium</Link> for air shipments...
                </Trans>
              </p>
            </div>
            <div className="border-l-4 border-blue-500 pl-6">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{t('airports.liege.title')}</h3>
              <p className="text-slate-600">{t('airports.liege.text')}</p>
            </div>
            <div className="border-l-4 border-teal-500 pl-6">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{t('airports.schiphol.title')}</h3>
              <p className="text-slate-600">
                <Trans i18nKey="airports.schiphol.text" t={t}>
                  Shipments via <Link to="/customs-clearance-amsterdam-schiphol" className="text-primary-600 hover:underline">customs clearance Amsterdam Schiphol</Link> use Dutch customs systems...
                </Trans>
              </p>
            </div>
            <div className="border-l-4 border-rose-500 pl-6">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{t('airports.perishable.title')}</h3>
              <p className="text-slate-600">
                <Trans i18nKey="airports.perishable.text" t={t}>
                  <strong className="font-semibold text-navy-900">Perishable goods air freight Belgium</strong> needs early coordination...
                </Trans>
              </p>
            </div>
            <div className="border-l-4 border-amber-500 pl-6">
              <h3 className="text-xl font-bold text-navy-900 mb-2">{t('airports.dangerous.title')}</h3>
              <p className="text-slate-600">
                <Trans i18nKey="airports.dangerous.text" t={t}>
                  Batteries... <strong className="font-semibold text-navy-900">Dangerous goods air freight IATA Belgium</strong> classification...
                </Trans>
              </p>
            </div>
          </div>
        </section>

        {/* Export & Delays */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('export.title')}</h2>
          <p className="text-slate-600 mb-12">{t('export.text')}</p>

          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('delays.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">
            <Trans i18nKey="delays.intro" t={t}>
              Many airport clearance problems begin... <Link to="/fast-track-customs-clearance" className="text-primary-600 hover:underline">priority customs clearance Belgium</Link> should be pre-lodged...
            </Trans>
          </p>
          <p className="font-semibold text-navy-900 mb-4">{t('delays.subtitle')}</p>
          <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
            {(t('delays.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <p className="text-slate-600 italic">
            <Trans i18nKey="delays.outro" t={t}>
              Winz reviews... Importers who need to understand <strong className="font-semibold text-navy-900">how long air freight customs takes</strong> should factor in...
            </Trans>
          </p>
        </section>

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
                <p className="text-primary-300 font-semibold mb-2">{t('whyWinz.outro1')}</p>
                <p className="text-blue-200/80 text-sm">{t('whyWinz.outro2')}</p>
              </div>
              <div className="bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-sm text-center">
                <h3 className="text-2xl font-bold text-white mb-4">{t('cta.title')}</h3>
                <p className="text-blue-100 mb-6">{t('cta.text')}</p>
                <p className="text-blue-200/80 text-sm mb-8">{t('cta.services')}</p>
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
