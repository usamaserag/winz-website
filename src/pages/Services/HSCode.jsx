import { useTranslation, Trans } from 'react-i18next';
import { SEOMeta } from '../../components/common/SEOMeta';
import PageHeroShell from '../../components/logistics/PageHeroShell';
import { getSiteOrigin } from '../../lib/site';
import { useLocale } from '../../hooks/useLocale';
import { Link } from '../../components/routing';

export default function HSCode() {
  const { t } = useTranslation(['hsCode', 'common']);
  const locale = useLocale();
  
  const title = t('meta.title', { defaultValue: 'HS Code Classification Belgium | Winz' });
  const description = t('meta.description');
  const canonicalUrl = `${getSiteOrigin()}/${locale}/hs-code-classification`;

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
              For the full scope... <Link to="/services" className="text-primary-600 hover:underline">customs clearance Belgium</Link>.
            </Trans>
          </p>
          <p>{t('intro.p2')}</p>
          <p>{t('intro.p3')}</p>
          <p>
            <Trans i18nKey="intro.p4" t={t}>
              Winz determines... <Link to="/import" className="text-primary-600 hover:underline">EU import clearance</Link>...
            </Trans>
          </p>
        </section>

        {/* Structure */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('structure.title')}</h2>
          <p className="text-lg text-slate-600 mb-8">{t('structure.intro')}</p>
          
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Code Level</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Used For</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Belgium Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('structure.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.level}</td>
                    <td className="py-4 px-6 text-slate-600">{row.usedFor}</td>
                    <td className="py-4 px-6 text-slate-600">{row.requirement}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="space-y-4 mb-6">
            {(t('structure.definitions', { returnObjects: true }) || []).map((def, i) => (
              <p key={i} className="text-slate-600">
                <Trans i18nKey={`structure.definitions.${i}`} t={t}>
                  <strong className="font-bold text-navy-900">Code</strong> text <Link to="/import" className="text-primary-600 hover:underline">Link</Link>
                </Trans>
              </p>
            ))}
          </div>

          <p className="text-slate-600 font-medium italic">{t('structure.outro')}</p>
        </section>

        {/* Duty Rate & Determination */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('dutyRate.title')}</h2>
            <p className="text-slate-600 mb-6">{t('dutyRate.text')}</p>
            <ul className="space-y-2">
              {(t('dutyRate.links', { returnObjects: true }) || []).map((item, i) => (
                <li key={i} className="text-slate-600">
                  <Trans i18nKey={`dutyRate.links.${i}`} t={t}>
                    text <Link to="/import" className="text-primary-600 hover:underline">link</Link>
                  </Trans>
                </li>
              ))}
            </ul>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('determination.title')}</h2>
            <p className="text-slate-600 mb-4">{t('determination.intro')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('determination.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>
                  <Trans i18nKey={`determination.list.${i}`} t={t}>
                    <strong className="font-semibold text-navy-900">label</strong> text
                  </Trans>
                </li>
              ))}
            </ul>
            <p className="text-slate-600 italic">{t('determination.outro')}</p>
          </section>
        </div>

        {/* Rules for Interpretation */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-4">{t('rules.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('rules.intro')}</p>
          <p className="font-semibold text-navy-900 mb-4">{t('rules.subtitle')}</p>
          <ol className="list-decimal pl-6 space-y-3 text-slate-600 mb-6">
            {(t('rules.list', { returnObjects: true }) || []).map((item, i) => (
              <li key={i}>
                <Trans i18nKey={`rules.list.${i}`} t={t}>
                  <strong className="font-semibold text-navy-900">label</strong> text
                </Trans>
              </li>
            ))}
          </ol>
          <p className="text-slate-600">{t('rules.outro')}</p>
        </section>

        {/* Examples Table */}
        <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-3xl font-bold text-navy-900 mb-6">{t('examples.title')}</h2>
          <p className="text-lg text-slate-600 mb-6">{t('examples.intro')}</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-y border-slate-200">
                  <th className="py-4 px-6 font-semibold text-navy-900">Product Type</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Possible CN Area</th>
                  <th className="py-4 px-6 font-semibold text-navy-900">Classification Risk</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {(t('examples.table', { returnObjects: true }) || []).map((row, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-4 px-6 font-medium text-slate-900">{row.type}</td>
                    <td className="py-4 px-6 text-slate-600">{row.area}</td>
                    <td className="py-4 px-6 text-slate-600">{row.risk}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-slate-600 italic">{t('examples.outro')}</p>
        </section>

        {/* Info Grid (Misclassification, CBAM, BTI, How Winz Classifies) */}
        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.misclassification.title')}</h2>
            <p className="text-slate-600">
              <Trans i18nKey="sections.misclassification.text" t={t}>
                text... <Link to="/contact" className="text-primary-600 hover:underline">link</Link>
              </Trans>
            </p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.cbam.title')}</h2>
            <p className="text-slate-600">{t('sections.cbam.text')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.bti.title')}</h2>
            <p className="text-slate-600 mb-4">{t('sections.bti.text')}</p>
            <p className="font-semibold text-navy-900 mb-3">{t('sections.bti.subtitle')}</p>
            <ul className="list-disc pl-6 space-y-2 text-slate-600 mb-6">
              {(t('sections.bti.list', { returnObjects: true }) || []).map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p className="text-slate-600 italic">{t('sections.bti.outro')}</p>
          </section>

          <section className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
            <h2 className="text-2xl font-bold text-navy-900 mb-4">{t('sections.howWinzClassifies.title')}</h2>
            <p className="text-slate-600 mb-6">
              <Trans i18nKey="sections.howWinzClassifies.text" t={t}>
                text... <Link to="/services" className="text-primary-600 hover:underline">link</Link>
              </Trans>
            </p>
            <ul className="space-y-3">
              {(t('sections.howWinzClassifies.links', { returnObjects: true }) || []).map((item, i) => (
                <li key={i} className="text-slate-600 text-sm">
                  <Trans i18nKey={`sections.howWinzClassifies.links.${i}`} t={t}>
                    text <Link to="/import" className="text-primary-600 hover:underline">link</Link>
                  </Trans>
                </li>
              ))}
            </ul>
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
